import express from "express";
import loginUser, { authStatus, userLogout }  from "../controllers/authController.js";
import { verifyUser } from "../middlewares/verifyUser.js";


const authRouter=express.Router()

//login
authRouter.post("/login",loginUser)
//check user
authRouter.get("/status",verifyUser,authStatus)
//delete
authRouter.get("/logout",userLogout)


export default authRouter