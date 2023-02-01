import { userModel } from "../app.js"

class userInfoController{
    static userInfo=async(req,res)=>{
        try {
            const {email}=req.body
            console.log(email)
            const result=await userModel.findOne({uemail:email})
            console.log(result.ubalance)
                res.send({balance:result.ubalance})
        } catch (error) {
            console.log(error)
        }
    }
}
export default userInfoController