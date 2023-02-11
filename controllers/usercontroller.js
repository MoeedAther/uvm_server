import { userModel } from "../app.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


class userController {
    static createUser = async (req, res) => {
        try {
            // First Barcode Identifier
            const identifier1 = "#"

            // Second Barcode Identifier
            const identifier2 = "="

            // Generating random three digit company code
            const max1 = 999
            const min1 = 100
            const range1 = max1 - min1 + 1
            const decimal_num1 = Math.random() * range1
            const companycode = Math.floor(decimal_num1) + min1

            //Generating two digit rotation code
            const max2 = 99
            const min2 = 10
            const range2 = max2 - min2 + 1
            const decimal_num2 = Math.random() * range2
            const rotation_code = Math.floor(decimal_num2) + min2

            //Generating two digit encryption index
            const max3 = 20
            const min3 = 10
            const range3 = max3 - min3 + 1
            const decimal_num3 = Math.random() * range3
            const encryption_index = Math.floor(decimal_num3) + min3

            //Request Body
            console.log(req.body)
            let { firstname, lastname, countrycode, email, phonenumber, password } = req.body// object destructuring

            //Generating User ID from phone number
            const replacement = "0"
            if (phonenumber.length == 10) {
                var userbarcodeID = phonenumber;
            }
            else if (phonenumber.length > 10) {
                var userbarcodeID = phonenumber.substring(0, 10);
            }
            else if (phonenumber.length == 9) {
                var userbarcodeID = phonenumber + replacement
            }
            else if (phonenumber.length == 8) {
                var userbarcodeID = phonenumber + replacement + replacement
            }
            else if (phonenumber.length == 7) {
                var userbarcodeID = phonenumber + replacement + replacement + replacement
            }
            else if (phonenumber.length == 6) {
                var userbarcodeID = phonenumber + replacement + replacement + replacement + replacement
            }
            else if (phonenumber.length == 5) {
                var userbarcodeID = phonenumber + replacement + replacement + replacement + replacement + replacement
            }
            else if (phonenumber.length == 4) {
                var userbarcodeID = phonenumber + replacement + replacement + replacement + replacement + replacement + replacement
            }
            else {
                console.log("phonenumber invalid")
                var userbarcodeID = "0000000000"
            }

            // Generating Barcode
            const userbarcode1 = identifier1 + countrycode + companycode + rotation_code + encryption_index


            //User Password encryption
            const securePassword = async (pass) => {

                const passwordHash = await bcrypt.hash(pass, 10)
                return passwordHash
            }

            const secureBarcode = async (bar) => {

                const barcodeHash = await bcrypt.hash(bar, 10)
                return barcodeHash
            }


            securePassword(password).then(async (phash) => {

                secureBarcode(userbarcodeID).then(async (bhash) => {

                    //Cobining user barcode
                    const userbarcode2 = identifier2 + bhash
                    const userbarcode = userbarcode1 + userbarcode2

                    const doc = new userModel({
                        ufirstname: firstname,
                        ulastname: lastname,
                        uemail: email,
                        ucountrycode: countrycode,
                        uphonenumber: phonenumber,
                        upassword: phash,
                        ubarcode: userbarcode,
                        ubalance: "0"
                    })
                    const result = await doc.save()
                    res.status(201).send(result) //status(201) chnages states module from 200 to 201

                })

            })

        } catch (error) {
            console.log(error)
        }
    }

    static authUser = async (req, res) => {
        try {
            const { email, password } = req.body
            console.log(req.body)
            const result = await userModel.findOne({ uemail: email })
            console.log(result)

            //Generating JWT Tocken
            const payload = {
                firstname: result.ufirstname,
                lastname: result.ulastname,
                email: result.uemail
            }
            const secret = "y88hhhwudhuddikwjj9dwu993u7837784r3hdjwwddnjojkxmxklqiqhiu7374r63748990;.;pri4kk3p2;l;ke2oite3[lp3221;p9u2309"
            const token = jwt.sign(payload, secret)
            console.log(token)

            //Password Compare
            bcrypt.compare(password, result.upassword, function (err, isMatch) {

                if (result.uemail === email && isMatch) {
                    //Response Prifile User Information VAR
                    const user_info = {
                        rfullname: result.ufirstname + " " + result.ulastname,
                        rphonenumber: result.uphonenumber,
                        remail: result.uemail,
                        raccountbalance: result.ubalance,
                        rtoken: token
                    }

                    // Response User Barcode VAR
                    const barcode1 = result.ubarcode.substring(0, 10)
                    const barcode2 = result.ubarcode.substring(10, 71)

                    //Auth Response
                    res.send({ auth: "auth success", firstbarcode: barcode1, secondbarcode: barcode2, userinfo: user_info })
                }
                else {
                    res.send({ auth: "auth failed" })
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    static checkToken = async (req, res) => {
        try {
            const { token } = req.body
            console.log(token)
            //Verify JWT
            const secret = "y88hhhwudhuddikwjj9dwu993u7837784r3hdjwwddnjojkxmxklqiqhiu7374r63748990;.;pri4kk3p2;l;ke2oite3[lp3221;p9u2309"
            const tk = jwt.verify(token, secret)
            console.log(tk)
            const result = await userModel.findOne({ uemail:tk.email })
            if(tk.email==result.uemail)
            {
                console.log("successful")
                res.send({message:"Verification Successful"})
                
            }else{
                console.log("Verification Successful")
                res.send({message:"Verify Unsuccessful"})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

}
export default userController