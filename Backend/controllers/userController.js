import User from "../models/User.js"
import { comparePassword, createHash } from "../utils/bcrypt.js"

export async function addUser(req, res) {
    try {
        //body data
        if (!req.body) {
            return res.status(400).send({ message: "data should not be empty" })
        }
        const { name, email, mobile } = req.body
        if (name && email && mobile) {
            const isUser = await User.findOne({ email })
            if (isUser) {
                return res.status(400).send({ message: "user already exist" })
            } else {
                //add
                const hashedPassword = createHash("mypassword@#$!")
                const userDetails = new User({ ...req.body, password: hashedPassword })
                await userDetails.save() //we can use create also
                return res.status(201).send({ message: "User created" })
            }
        }
        else {
            return res.status(400).send({ message: "provide all required fields" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })

    }
}
// export const updateUser = async (req, res) => {
//     try {
//         let { id } = req.payload;   // assuming JWT payload has _id
       

//         // Check if user exists
//         let isExist = await User.findById(id);
//         if (!isExist) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Update user
//         let updatedUser = await User.findByIdAndUpdate(
//             id,
//             { $set: { ...req.body } },
//             { new: true } // returns updated document
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Updated successfully",
//             data: updatedUser
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// };

export const updateUser=async(req,res)=>{
    try {
        const user=req.user //coming from verify user middleware
        if(!req.body){
            return res.status(400).send({message:"No data Provided"})
        } else{
            const {mobile,name}=req.body
            user.name=name?name:user.name
             user.mobile=mobile?mobile:user.mobile
             await user.save() //it will save till the changes
             return res.status(200).send({message:"User data updated"})
        }
    } catch (error) {
        return res.status(500).send({
            message:"Something went wrong",
            error:error.message
        })
    }
}
export const changePassword=async(req,res)=>{
    try {
        let user=req.user //or {user}=req
        if(!req.body){
            return res.status(400).send({message:"No data Provided"})
        } else{
            const {currentPassword,newPassword}=req.body
            if(currentPassword && newPassword){
                const isMatched=comparePassword(currentPassword,user.password)
                if(isMatched){
                    //hash new password
                    const hashedPassword=createHash(newPassword)
                    user.password=hashedPassword //update the use password
                    await user.save()
                    return res.status(200).send({message:"Password updated sucessfully"})

                }else{
                    return res.status(400).send({message:"Password is incorrect"})
                }

            }else{
                 return res.status(400).send({message:"Provide all the fields"})
            }
           
             
        }
        
    } catch (error) {
        return res.status(500).send({
            message:"Something went wrong",
            error:error.message
        })
        
    }

}