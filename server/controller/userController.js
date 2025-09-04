import Job from "../models/job.js";
import jobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

// ✅ get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await jobApplication.findOne({ jobId, userId });
    if (isAlreadyApplied) {
      return res.status(400).json({ success: false, message: "User already applied" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await jobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ get user’s applied jobs
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const applications = await jobApplication
      .find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location level salary")
      .exec();

    if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: "No job application found" });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ update user resume
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (resumeFile) {
      try {
        const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
          resource_type: "auto", // handles pdf/docx too
        });

        userData.resume = resumeUpload.secure_url;
        console.log("Resume uploaded:", resumeUpload.secure_url);
      } catch (e) {
        console.error("Cloudinary upload error:", e);
        return res.status(500).json({ success: false, message: "Resume upload failed" });
      }
    }

    await userData.save();
    return res.json({
      success: true,
      message: "Resume updated successfully",
      resume: userData.resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
