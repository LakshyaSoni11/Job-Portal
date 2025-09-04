import express from "express";
import {
  applyForJob,
  getUserApplications,
  getUserData,
  updateUserResume,
} from "../controller/userController.js";
import multer from "multer";

// ✅ Use memory storage (required for serverless like Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// get user data
router.get("/user", getUserData);

// apply for a job
router.post("/apply", applyForJob);

// get applied jobs
router.get("/applications", getUserApplications);

// update the user resume (handled by Clerk for auth)
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
