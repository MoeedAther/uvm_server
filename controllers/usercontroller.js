import { userModel } from "../app.js"

class userController{
    static createUser=async(req,res)=>
    {
        try {
            // First Barcode Identifier
            const identifier1="#"

            // Second Barcode Identifier
            const identifier2="="

            // Generating random three digit company code
            const max1=999
            const min1=100
            const range1=max1-min1+1
            const decimal_num1=Math.random() * range1
            const companycode=Math.floor(decimal_num1) + min1

            //Generating two digit rotation code
            const max2=99
            const min2=10
            const range2=max2-min2+1
            const decimal_num2=Math.random() * range2
            const rotation_code=Math.floor(decimal_num2) + min2

            //Generating two digit encryption index
            const max3=20
            const min3=10
            const range3=max3-min3+1
            const decimal_num3=Math.random() * range3
            const encryption_index=Math.floor(decimal_num3) + min3 

            //Request Body
            console.log(req.body)
            const {firstname, lastname,countrycode, email, phonenumber, password}= req.body// object destructuring

            //Generating User ID from phone number
            const replacement="0"
            if(phonenumber.length==10)
            {
                var userbarcodeID=phonenumber;
            }
            else if(phonenumber.length>10)
            {
                var userbarcodeID=phonenumber.substring(0,10);
            }
            else if(phonenumber.length==9)
            {
                var userbarcodeID=phonenumber+replacement
            }
            else if(phonenumber.length==8)
            {
                var userbarcodeID=phonenumber+replacement+replacement
            }
            else if(phonenumber.length==7)
            {
                var userbarcodeID=phonenumber+replacement+replacement+replacement
            }
            else if(phonenumber.length==6)
            {
                var userbarcodeID=phonenumber+replacement+replacement+replacement+replacement
            }
            else if(phonenumber.length==5)
            {
                var userbarcodeID=phonenumber+replacement+replacement+replacement+replacement+replacement
            }
            else if(phonenumber.length==4)
            {
                var userbarcodeID=phonenumber+replacement+replacement+replacement+replacement+replacement+replacement
            }
            else
            {
                console.log("phonenumber invalid")
                var userbarcodeID="0000000000"
            }

            // Generating Barcode
            const userbarcode1=identifier1+countrycode+companycode+rotation_code+encryption_index
            const userbarcode2=identifier2+userbarcodeID
            const userbarcode=userbarcode1+userbarcode2


            const doc = new userModel({
                ufirstname:firstname,
                ulastname:lastname,
                uemail:email,
                ucountrycode:countrycode,
                uphonenumber:phonenumber,
                upassword:password,
                ubarcode: userbarcode,
                ubalance:"2000"
            })
            const result = await doc.save()
            res.status(201).send(result) //status(201) chnages states module from 200 to 201
        } catch (error) {
            console.log(error)
        }
    }

    static authUser=async(req,res)=>{
        try {
            const {email, password}=req.body
            console.log(req.body)
            const result=await userModel.findOne({uemail:email})
            console.log(result)
            if(result.uemail==email && result.upassword==password)
            {
                //Response Prifile User Information VAR
                const user_info={
                    rfullname:result.ufirstname+" "+result.ulastname,
                    rphonenumber:result.uphonenumber,
                    remail:result.uemail,
                    raccountbalance:result.ubalance
                }

                // Response User Barcode VAR
                const barcode1=result.ubarcode.substring(0,11)
                const barcode2=result.ubarcode.substring(11,22)

                //Auth Response
                res.send({auth:"auth success", firstbarcode:barcode1, secondbarcode:barcode2, userinfo:user_info})
            }
            else{
                res.send({auth:"auth failed"})
            }
        } catch (error) {
            console.log(error)
        }
    }

}
export default userController