

export function checkRole(roles){
    return(req,res,next)=>{
        try {
            const {user}=req
            const isAuthorized=roles.includes(user.role)
            if(isAuthorized){
                next()
            }else{
                return res.status(401).send({message:"Access Denied"})
            }
        } catch (error) {
             return res.status(501).send({message:"Server error",error:error.message})
        }
    }
}