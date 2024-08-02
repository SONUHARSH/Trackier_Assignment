
import { Router } from "express";
import { Userregister, Userlogin } from "../controllers/userController.js";



const router = Router();

//register and login user

router.route("/register").post(Userregister);
router.route("/login").post(Userlogin);


export default router

