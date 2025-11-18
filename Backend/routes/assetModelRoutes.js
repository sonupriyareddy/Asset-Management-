import express from "express"
import { verifyUser } from "../middlewares/verifyUser.js";
import {  addAssetModel, deleteAssetModel, editAssetModel, getAssetModels, getAssetModelsWithItems, getItemsOfTheModel } from "../controllers/assetModelController.js";
import { checkRole } from "../middlewares/checkUser.js";

export const assetModelRouter=express.Router();
//add
assetModelRouter.post("/add",verifyUser,checkRole(["super admin","admin"]),addAssetModel)


//update (params)  ( this is in postman http://localhost:8080/api/v1/asset-model/edit/68ef724e42c29e828e7e6c1c)
assetModelRouter.put("/edit/:id", verifyUser, checkRole(["super admin", "admin"]), editAssetModel)

//delete (queries) (this is in postman http://localhost:8080/api/v1/asset-model/delete?id=68ef724e42c29e828e7e6c1c)
assetModelRouter.delete("/delete", verifyUser, checkRole(["super admin", "admin"]), deleteAssetModel)

//get all
assetModelRouter.get("/all",verifyUser,getAssetModels)

//get all with items
assetModelRouter.get("/all/items",verifyUser,getAssetModelsWithItems)


//get asset model with items
assetModelRouter.get("/:id",verifyUser,getItemsOfTheModel)