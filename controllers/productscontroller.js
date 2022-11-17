import {productsModel} from "../app.js"

class productsController{
    static addProducts=async(req,res)=>
    {
        try {
            const {productbarcode, productname,productcategory, unitprice, productquantity, productdescription}= req.body // object destructuring
            const doc = new productsModel({
                pbarcode: productbarcode,
                pname: productname,
                pcategory: productcategory,
                pprice: unitprice,
                pquantity: productquantity,
                pdescription: productdescription,
            })
            const result = await doc.save()
            console.log(req.body)
            res.status(201).send({response:"product added successfully"}) //status(201) changes states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }

    static getProductInfo=async(req,res)=>{
        try {
            const result=await productsModel.find()
            res.send({products: result})
            console.log(result)
        
        } catch (error) {
            console.log(error)
        }
    }

    static getProductTransactionInfo=async(req,res)=>{
        try {
            const {productbarcode}=req.body
            console.log(req.body)
            const result=await productsModel.findOne({pbarcode:productbarcode})
            res.send({products:result})
    
        } catch (error) {
            console.log(error)
        }
    }
}
export default productsController