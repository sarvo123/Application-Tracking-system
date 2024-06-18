import express from "express";
import { signupUser , loginUser , logoutUser , getUserProfile} from "../controllers/user.Controller.js";
import protectRoute from "../middleware/auth.Middleware.js";

const router = express.Router();

router.post('/signup' , signupUser);
router.post('/login',loginUser);
router.post('/logout' , logoutUser);
router.get('/profile', protectRoute , getUserProfile);

export default router ; 
