import assetModel from "../models/Asset.js"

export const addAsset=async(req,res)=>{
    if(req.body==undefined){
        return res.status(400).send({message:"data is mandetory"})
    }
    const user=req.user
    if(user.role=="super admin"|| user.role=="admin"){
       const {name,category}=req.body
       if(name && category){
        try {
            const asset=await assetModel.create(req.body);
             return res.status(201).send({message:"asset created successfully",id:asset._id})
        } catch (error) {
             return res.status(500).send({message:"server side error",error:error.message})
            
        }
       }
       else{
         return res.status(400).send({message:"data is mandetory"})
       }
    }else{
         return res.status(400).send({message:"you are un Authorised"})
    }

}