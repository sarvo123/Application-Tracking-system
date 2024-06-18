import express from 'express';
import protectRoute from '../middleware/auth.Middleware.js';
import { createJobPost , getJobPosts , approveJobPost , assignRecruiters } from '../controllers/jobPost.Controller.js';


const router = express.Router();

// routes ...
router.post('/' , protectRoute , createJobPost);
router.get('/', protectRoute , getJobPosts);
router.put('/:id/approve' ,protectRoute , approveJobPost )
router.put('/:id/assign-recruiters',protectRoute , assignRecruiters);

export default router ; 