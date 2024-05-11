import express from "express";
const router = express.Router();
import { createJobPost } from "../controller/job.js";
import { getJobDetailsById } from "../controller/job.js";
import { verifyToken } from "../middlewares/verifyAuth.js";
import { updateJobDetailsById } from "../controller/job.js";
import { getAllJobs } from "../controller/job.js";


router.post("/create",verifyToken,createJobPost)
router.get("/job-details/:jobId/:userId",getJobDetailsById);
router.put("/update/:jobId", verifyToken,updateJobDetailsById);
router.get("/all/:userId",getAllJobs);



export default router;