import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js";
import { addAsset } from "../controllers/assetController.js";

export const assetRouter=express.Router();
assetRouter.post("/add",verifyUser,addAsset)