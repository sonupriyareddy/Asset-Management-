import AssetItem from "../models/AssetItem.js";
import AssignedAsset from "../models/AssignedAsset.js";
import User from "../models/User.js";

// export const addAssignedAsset = async (req, res) => {
//     try {
//         if (req.body) {
//             const { assetItem, assignedTo } = req.body;
//             let assignedBy = req.user._id; //admin or superadmin id
//             console.log(assignedBy);
//             if (!assetItem && !assignedTo) {
//                 res.status(400).send({ message: "please provide data for all fields" });
//             } else {
//                 const isItem = await AssetItem.findById(assetItem);
//                 const isUser = await User.findById(assignedTo);

//                 if (isItem && isUser) {
//                     if (isItem.status == "available") {


//                         const assetDetails = new AssignedAsset({ ...req.body });
//                         await assetDetails.save();
//                         isItem.status = "assigned";
//                         await isItem.save();
//                         return res.status(201).send({ message: "asset Created" });
//                     }
//                     else {
//                         return res.status(400).send({ message: "Item is not available" });
//                     }
//                 }
//             }
//         } else {
//             res.status(400).send({ message: "data is mandetory" });
//         }
//     } catch (error) {
//         return res.status(500).send({
//             message: "Something went worng",
//             error: error.message,
//         });
//     }
// };

export const addAssignedAsset = async (req, res) => {
    try {
        if (req.body) {
            let assignedBy = req.user._id //admin/superadmin id
            const { assignedTo, assetItem } = req.body
            if (assignedTo && assetItem) { //check required
                let isItem = await AssetItem.findById(assetItem) //find the asset item
                if (isItem && isItem.status == "available") {
                    let isUser = await User.findById(assignedTo) //find the user
                    if (isUser && isUser.status == "active") {
                        const assignedAsset = new AssignedAsset({ ...req.body, assignedBy }) //make instance
                        await assignedAsset.save() //create assigned asset
                        isItem.status = "assigned"
                        await isItem.save() //update the asset item
                        return res.status(201).send({ message: "Asset Assigned to user sucessfully" })

                    } else {
                        return res.status(400).send({ error: "User is not valid or inactive" })

                    }
                } else {
                    return res.status(400).send({ error: "Asset is not presents or available" })

                }

            } else {
                return res.status(400).send({ error: "Provide required fields" })

            }
        } else {
            return res.status(400).send({ error: "Body can not be empty" })

        }
    } catch (error) {
        return res.status(400).send({ error: "server error" })
    }
}

export const getAllAssignedAsset=async(req,res)=>{
    try {
        const allAssignedAsset=await AssignedAsset.find().populate("assetItem")
        return res.status(200).send({allAsset })
    } catch (error) {
        return res.status(500).send({ error: "something went wrong",message:error.message })
    }
}