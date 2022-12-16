import {userModel} from "../app.js"

class depositController {
    static Deposit = async (req, res) => {
        try {
            const {email,deposit} = req.body // object destructuring

            console.log(email,deposit)

            const result1 = await userModel.findOne({ uemail: email })

            const ubalanceint = parseInt(result1.ubalance);

            const udepositint = parseInt(deposit);

           const ubalanceupdate = ubalanceint + udepositint

            const result2 = await userModel.findOneAndUpdate({uemail:email}, { ubalance: ubalanceupdate })

            res.status(201).send({ response: "Deposit Successfull" }) //status(201) changes states module from 200 to 201

        } catch (error) {
            console.log(error)
        }
    }

}
export default depositController