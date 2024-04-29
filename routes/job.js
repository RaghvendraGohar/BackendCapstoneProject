import express from "express";
const router = express.Router();
import { createJobPost } from "../controller/job.js";
import { getJobDetailsById } from "../controller/job.js";

router.post("/create",createJobPost)
router.get("/job-details/:jobId",getJobDetailsById);


export default router;