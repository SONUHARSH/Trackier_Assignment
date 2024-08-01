
import { Router } from "express";
import { Userregister, Userlogin, getSessionDetails } from "../controllers/userCotroller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/register").post(Userregister);
router.route("/login").post(Userlogin);


export default router

