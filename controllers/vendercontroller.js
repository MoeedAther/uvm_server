import {venderModel} from "../app.js"

class venderController{
    static createVender=async(req,res)=>
    {
        try {
            const {firstname,lastname, phonenumber, email, password}= req.body // object destructuring
            const doc = new venderModel({
                vfirstname:firstname,
                vlastname:lastname,
                vemail:email,
                vphonenumber:phonenumber,
                vpassword:password
            })
            const result = await doc.save()
            res.status(201).send({auth:"vender created"}) //status(201) changes states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }

    static authVender=async(req,res)=>{
        try {
            console.log(req.body)
            const {email, password}=req.body
            console.log(req.body)
            const result=await venderModel.findOne({vemail:email})
            console.log(result)
            if(result.vemail==email && result.vpassword==password)
            {
                res.send({auth:"auth success"})
            }
            else{
                res.send({auth:"auth failed"})
            }
        } catch (error) {
            console.log(error)
        }

    }
}
export default venderController