import express from "express";
import { addUser, changePassword, updateUser } from "../controllers/userController.js";
import { verifyUser } from "../middlewares/verifyUser.js";



const userRouter=express.Router()
//demo
userRouter.get("/",(req,res)=>res.send({message:"user router is working"}))

//add
userRouter.post("/add",addUser)
//update
userRouter.put("/update",verifyUser,updateUser)
//update password using current password (put or patch)
userRouter.patch("/updatePassword",verifyUser,changePassword)

export default userRouter