import express from 'express'
import { applyForJob, getUserApplications, getUserData, updateUserResume } from '../controller/userController.js'
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const router = express.Router()
//get user data
router.get('/user' ,getUserData)
//apply for a job
router.post('/apply',applyForJob)
//get applied jobs application
router.get('/applications',getUserApplications)
//update the user resume and rest of the details will be handled by clerk
router.post('/update-resume', upload.single("resume"), updateUserResume)

export default router