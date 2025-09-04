import Company from "../models/Company.js"
import bcrypt from "bcrypt"//this is used to encrypt the user password
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js"
import Job from "../models/job.js"
// import { jobsApplied } from "../../client/src/assets/assets.js"
import jobApplication from "../models/jobApplication.js"

//register a new company
export const registerNewCompany = async (req, res) => {
    const { name, email, password } = req.body

    //to pass the form data we will usre multer pkg
    const imgFile = req.file
    //in case of missing details 
    if (!name || !email || !password || !imgFile) {
        return res.json({ success: false, message: "Missing Details" })
    }
    try {
        //check if the company exists already
        const companyExists = await Company.findOne({ email })
        if (companyExists) {
            return res.json({ success: false, message: "This company already exists" })
        }
        const salt = await bcrypt.genSalt(10)//will perform 10 rounds of processing to generate random strings
        const hashedPass = await bcrypt.hash(password, salt)//hashes the plain password which we will store in the database
        const imageUpload = await cloudinary.uploader.upload(imgFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashedPass,
            image: imageUpload.secure_url
        })
        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//for company login

export const CompanyLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, company.password);
        if (isMatch) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


//grtting company data

export const getCompanyData = (req, res) => {
    try {
        const company = req.company
        res.json({ success: true, company })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//post a new job

export const postNewJob = async (req, res) => {
    const { title, description, location, salary, category, level } = req.body
    const companyId = req.company._id
    console.log(companyId, { title, description, location, salary, category, level })
    try {
        const newJob = new Job({
            title, description, location, salary,
            companyId,
            date: Date.now(),
            level,
            category,

        })
        await newJob.save()
        res.json({ success: true, newJob })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const getCompanyJobsApplicant = async (req, res) => {
    try {
        const companyId = req.company._id
        const applications = await jobApplication.find({companyId})
        .populate('userId','name image resume')
        .populate('jobId','title location category level salary')
        .exec()
        res.json({success:true, applications})
    } catch (error) {
        res.json({success: false, message: error.message})
    }

}
//get companies posted jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id
        const jobs = await Job.find({ companyId })
        //need to add number of applicants info in the data
        const jobsData = await Promise.all(jobs.map(async(job)=>{
            const applicants = await jobApplication.find({jobId: job._id});
            return {...job.toObject(), applicants: applicants.length}

        }))
        res.json({ success: true, jobsData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//change job application status

export const ChangeJobApplicationStatus = async(req, res) => {
    try {
        const {id, status} = req.body
        await jobApplication.findOneAndUpdate({_id:id}, {status})
        res.json({success: true, message: "Status Changed successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
}

// change job visibility

export const changeVisibility = async (req, res) => {
    try {
        //if we click to the visibility checkBox then it should toggle and the data should be updated in the db
        const { id } = req.body
        const companyId = req.company._id
        const job = await Job.findById(id)
        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }
        await job.save()
        res.json({ success: true, job })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}