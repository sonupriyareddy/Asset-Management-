import express from "express";
// import { verifyUser } from "../middlewares/verifyUser.js";
import { checkRole } from "../middlewares/checkUser.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { addAssignedAsset, getAllAssignedAsset } from "../controllers/assignedAssetController.js";
const assignedAssetRouter=express.Router()
assignedAssetRouter.get("/",(req,res)=>{
    res.send("hello")
})
assignedAssetRouter.post("/add",verifyUser,checkRole(["super admin", "admin"]),addAssignedAsset)
assignedAssetRouter.get("/getAllAssignedAsset",verifyUser,checkRole(["super admin", "admin"]),getAllAssignedAsset)
export default assignedAssetRouter