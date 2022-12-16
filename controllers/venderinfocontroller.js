import { venderModel } from "../app.js"

class venderInfoController{
    static venderInfo=async(req,res)=>{
        try {
            const {vender_email}=req.body
            const result=await venderModel.findOne({vemail:vender_email})
                res.send({balance:result.vbalance})
        } catch (error) {
            console.log(error)
        }
    }
}
export default venderInfoController