import {productsModel, productsCategoryModel} from "../app.js"

class productsController{
    static addProducts=async(req,res)=>
    {
        try {
            const {productbarcode, productname, productcategory, unitprice, productquantity, productdescription}= req.body // object destructuring
            const doc = new productsModel({
                pbarcode: productbarcode,
                pname: productname,
                pcategory: productcategory,
                pprice: unitprice,
                pquantity: productquantity,
                pdescription: productdescription,
            })
            await doc.save()
            res.status(201).send({response:"product added successfully"}) //status(201) changes states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }

    static addProductCategory=async(req,res)=>
    {
        try {
            const {productcategoryname}= req.body // object destructuring
            const doc = new productsCategoryModel({
                pcategoryname: productcategoryname
            })
            await doc.save()
            res.status(201).send({response:"category added successfully"}) //status(201) changes states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }

    static removeProductCategory=async(req,res)=>
    {
        try {
            const {productcategoryname}= req.body // object destructuring
            const result=await productsModel.deleteOne({pcategoryname:productcategoryname});
            console.log(result)
            res.status(201).send({response:"category removed successfully"}) //status(201) changes states module from 200 to 201
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
            const result=await productsModel.findOne({pbarcode:productbarcode})
            res.send({products:result})
    
        } catch (error) {
            console.log(error)
        }
    }
}
export default productsController