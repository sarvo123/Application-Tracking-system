import express from "express";
import protectRoute from "../middleware/auth.Middleware.js";
import upload from "../middleware/upload.Middleware.js";

const router = express.Router();

// routes ...
router.post('/apply' , protectRoute ,upload.single('resume'), applyJob);
router.get('/' , protectRoute ,getApplications);
router.put('/:id/review' , protectRoute , reviewApplication);
router.put('/:id/shortlist' , protectRoute , shortlistCandidate);

export default router ;