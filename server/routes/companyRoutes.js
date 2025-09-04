import express from "express"
import { ChangeJobApplicationStatus, changeVisibility, CompanyLogin, getCompanyData, getCompanyJobsApplicant, getCompanyPostedJobs, postNewJob, registerNewCompany } from "../controller/registrations.js"
import upload from "../config/multer.js"
import { ProtectRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

//register a company
//multer is a file storing package which handles the file storing here it will store tje file name image on submitting the form 
router.post('/register', upload.single('image'),registerNewCompany)

//company login
router.post('/login',CompanyLogin)

//get companies data
//protect route function first verifies the jwt token and then only pass control to this router otherwise it wont be able to move fwd is unauthorized
router.get('/company',ProtectRoute,getCompanyData)

//get applicant'sdata
router.get('/applicants',ProtectRoute,getCompanyJobsApplicant)

//post a job
router.post('/post-job',ProtectRoute,postNewJob)

//get companies job list
router.get('/list-jobs',ProtectRoute,getCompanyPostedJobs)

//change job status
router.post('/change-status',ProtectRoute,ChangeJobApplicationStatus)

//change visibility
router.post('/change-visibility', ProtectRoute, changeVisibility)

export default router