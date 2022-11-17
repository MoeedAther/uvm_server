import { userTransactionModel, venderTransactionModel, userModel, venderModel } from "../app.js"

class transactionController {
    static Transaction = async (req, res) => {
        try {
            const today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time=new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
            const { productbarcode, productname, productcategory, productprice, productquantity, totalamount, userid, venderid } = req.body // object destructuring

            const doc1 = new userTransactionModel({
                uproductbarcode: productbarcode,
                uproductname: productname,
                uproductcategory: productcategory,
                uunitprice: productprice,
                uunitspurchased: productquantity,
                upurchasetime: date+" "+time,
                utotalamount: totalamount
            })

            const doc2 = new venderTransactionModel({
                vproductbarcode: productbarcode,
                vproductname: productname,
                vproductcategory: productcategory,
                vunitprice: productprice,
                vunitspurchased: productquantity,
                vpurchasetime: date+" "+time,
                vtotalamount: totalamount
            })

            const result1 = await doc1.save()
            const result2 = await doc2.save()

            const result3 = await userModel.findOne({ _id: userid })
            const result4 = await venderModel.findOne({ _id: venderid })

            var ubalanceupdate = parseInt(result3.ubalance);
            var vbalanceupdate = parseInt(result4.vbalance);

            var inttotalamount = parseInt(totalamount);

            ubalanceupdate = ubalanceupdate - inttotalamount
            vbalanceupdate = vbalanceupdate + inttotalamount

            const result6 = await userModel.findByIdAndUpdate(userid, { ubalance: ubalanceupdate }, { returnDocument: 'after' })
            const result7 = await venderModel.findByIdAndUpdate(venderid, { vbalance: vbalanceupdate }, { returnDocument: 'after' })

            res.status(201).send({ response: "Transaction Successfull" }) //status(201) changes states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }


}
export default transactionController