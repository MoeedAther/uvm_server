import { userTransactionModel, userModel } from "../app.js"

class transactionController {
    static Transaction = async (req, res) => {

        const today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString();

        try {
            const { transaction, userbarcode, total } = req.body
            const result1 = await userModel.findOne({ ubarcode: userbarcode })
            if (result1.ubarcode === userbarcode) {
                transaction.map(async (objs) => {
                    console.log(objs)

                    const doc1 = new userTransactionModel({
                        uproductbarcode: objs.products.pbarcode,
                        uproductname: objs.products.pname,
                        uproductcategory: objs.products.pcategory,
                        uunitprice: objs.products.pprice,
                        uunitspurchased: "Null",
                        upurchasetime: date + " " + time,
                        upurchaseday: date,
                        utotalamount: total
                    })

                     await doc1.save()
                    //  await doc2.save()

                    // const result2 = await venderModel.findOne({ vemail: vender_email })

                    const ubalanceInt = parseInt(result1.ubalance);
                    // const vbalanceInt = parseInt(result2.vbalance);

                    const inttotalamount = parseInt(total);

                    const ubalanceupdate = ubalanceInt - inttotalamount
                    // const vbalanceupdate = vbalanceInt + inttotalamount

                    await userModel.findByIdAndUpdate(result1._id, { ubalance: ubalanceupdate }, { returnDocument: 'after' })
                    // await venderModel.findByIdAndUpdate(result2._id, { vbalance: vbalanceupdate }, { returnDocument: 'after' })

                    res.send({response:"Purchase Successfull"})
                })


            } else {
                res.send({response:"User Doesnot Exist"})
            }
            // console.log(req.body)
            // const today = new Date();
            // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            // const time=new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
            // const { productbarcode, productname, productcategory, productprice, productquantity, totalamount, userid, venderid } = req.body // object destructuring

            // const doc1 = new userTransactionModel({
            //     uproductbarcode: productbarcode,
            //     uproductname: productname,
            //     uproductcategory: productcategory,
            //     uunitprice: productprice,
            //     uunitspurchased: productquantity,
            //     upurchasetime: date+" "+time,
            //     utotalamount: totalamount
            // })

            // const doc2 = new venderTransactionModel({
            //     vproductbarcode: productbarcode,
            //     vproductname: productname,
            //     vproductcategory: productcategory,
            //     vunitprice: productprice,
            //     vunitspurchased: productquantity,
            //     vpurchasetime: date+" "+time,
            //     vtotalamount: totalamount
            // })

            // const result1 = await doc1.save()
            // const result2 = await doc2.save()

            // const result3 = await userModel.findOne({ _id: userid })
            // const result4 = await venderModel.findOne({ _id: venderid })

            // var ubalanceupdate = parseInt(result3.ubalance);
            // var vbalanceupdate = parseInt(result4.vbalance);

            // var inttotalamount = parseInt(totalamount);

            // ubalanceupdate = ubalanceupdate - inttotalamount
            // vbalanceupdate = vbalanceupdate + inttotalamount

            // const result6 = await userModel.findByIdAndUpdate(userid, { ubalance: ubalanceupdate }, { returnDocument: 'after' })
            // const result7 = await venderModel.findByIdAndUpdate(venderid, { vbalance: vbalanceupdate }, { returnDocument: 'after' })

            // res.status(201).send({ response: "Transaction Successfull" }) //status(201) changes states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }

    static getUserTransactionInfo=async(req,res)=>{
        try {
            const result=await userTransactionModel.find()
            res.send({transactions: result})
        
        } catch (error) {
            console.log(error)
        }
    }

    static getVenderTransactionInfo=async(req,res)=>{
        try {
            const result=await venderTransactionModel.find()
            res.send({transactions: result})
        
        } catch (error) {
            console.log(error)
        }
    }

}
export default transactionController