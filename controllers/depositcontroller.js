import {userModel, depositModel} from "../app.js"

import stripe from 'stripe';

const payment = stripe('sk_test_51MhUtzIJnUpCjJrBzzbmCC1NlfO2MHkkvKTPMTLj4McHQ9DxCPBYXSTu1ZbfOvsCJvHKYCgcA9gp1F4OQHagHTTV00M63i8SAA');

class depositController {
    static Deposit = async (req, res) => {
        try {

            const today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var datemonth = today.getFullYear() + '-' + (today.getMonth() + 1)
            var year = today.getFullYear()
            var month=(today.getMonth() + 1)


            const {email,deposit,payment_method_id} = req.body // object destructuring

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

            //Stripe Part
            const paymentMethod = await payment.paymentMethods.retrieve(payment_method_id);

                const customer = await payment.customers.create({ email: paymentMethod.billing_details.email });
                const paymentIntent = await payment.paymentIntents.create({
                    payment_method: payment_method_id,
                    amount: deposit, // 10 dollars
                    currency: 'usd',
                    customer: customer.id,
                    confirmation_method: 'manual',
                    confirm: true,
                });

            res.status(201).send({ response: "Deposit Successfull" }) //status(201) changes states module from 200 to 201

        } catch (error) {
            console.log(error)
        }
    }

}
export default depositController