import {userModel, depositModel} from "../app.js"

class depositController {
    static Deposit = async (req, res) => {
        try {

            const today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var datemonth = today.getFullYear() + '-' + (today.getMonth() + 1)
            var year = today.getFullYear()
            var month=(today.getMonth() + 1)


            const {email,deposit} = req.body // object destructuring

            const result1 = await userModel.findOne({ uemail: email })

            const ubalanceint = parseInt(result1.ubalance); 

            const udepositint = parseInt(deposit);

            const ubalanceupdate = ubalanceint + udepositint

            await userModel.findOneAndUpdate({uemail:email}, { ubalance: ubalanceupdate })

            // Saving deposit records

            const doc = new depositModel({
                useremail:email, // trim basically removes end spaces from value being stored
                udepositamount:deposit,
                udeposityear:year,
                udepositmonth:month,
            })

            await doc.save()

            res.status(201).send({ response: "Deposit Successfull" }) //status(201) changes states module from 200 to 201

        } catch (error) {
            console.log(error)
        }
    }

}
export default depositController