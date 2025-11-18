import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js";

import { checkRole } from "../middlewares/checkUser.js";
import { addAssetItem, deleteAssetItem, editAssetItem,  getAssetItems } from "../controllers/assetItemController.js";

export const assetItemRouter=express.Router();
//add
assetItemRouter.post("/add",verifyUser,checkRole(["super admin","admin"]),addAssetItem)

//update (params)  ( this is in postman http://localhost:8080/api/v1/asset-model/edit/68ef724e42c29e828e7e6c1c)
assetItemRouter.put("/edit/:id", verifyUser, checkRole(["super admin", "admin"]), editAssetItem)

//delete (queries) (this is in postman http://localhost:8080/api/v1/asset-model/delete?id=68ef724e42c29e828e7e6c1c)
assetItemRouter.delete("/delete", verifyUser, checkRole(["super admin", "admin"]), deleteAssetItem)

//get all
assetItemRouter.get("/all",verifyUser,getAssetItems)

