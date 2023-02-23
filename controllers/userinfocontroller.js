import { userModel, userTransactionModel, productsModel , depositModel} from "../app.js"

class userInfoController {
    static userInfo = async (req, res) => {
        try {
            const currentDate = new Date();
            const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
            const datemonth = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1)
            const Year = currentDate.getFullYear()
            const month=(currentDate.getMonth() + 1)

            const { email } = req.body
            const result1 = await userModel.findOne({ uemail: email })
            
            const result2 = await userTransactionModel.find({  $and:[{useremail: email}, {upurchaseday: date}] })

            const result3 = await userTransactionModel.find({ $and:[{useremail: email}, {umonthandyear: datemonth}] })

            //...............................................Finding monthly spending in current year.......................................................................

            const rjanruary = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 1}] })
            const rfebruary = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 2}] })
            const rmarch = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 3}] })
            const rapril = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 4}] })
            const rmay = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 5}] })
            const rjune = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 6}] })
            const rjuly = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 7}] })
            const raugust = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 8}] })
            const rseptember = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 9}] })
            const roctober = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 10}] })
            const rnovember = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 11}] })
            const rdecember = await userTransactionModel.find({ $and:[{useremail: email}, {uyear: Year}, {umonth: 12}] })


            let jan=0
            rjanruary.map((obj)=>{
                jan=jan+parseInt(obj.utotalamount)
            })

            let feb=0
            rfebruary.map((obj)=>{
                feb=feb+parseInt(obj.utotalamount)
            })

            let mar=0
            rmarch.map((obj)=>{
                mar=mar+parseInt(obj.utotalamount)
            })

            let apr=0
            rapril.map((obj)=>{
                apr=apr+parseInt(obj.utotalamount)
            })

            let may=0
            rmay.map((obj)=>{
                may=may+parseInt(obj.utotalamount)
            })

            let june=0
            rjune.map((obj)=>{
                june=june+parseInt(obj.utotalamount)
            })

            let jul=0
            rjuly.map((obj)=>{
                jul=jul+parseInt(obj.utotalamount)
            })

            let aug=0
            raugust.map((obj)=>{
                aug=aug+parseInt(obj.utotalamount)
            })

            let sep=0
            rseptember.map((obj)=>{
                sep=sep+parseInt(obj.utotalamount)
            })

            let oct=0
            roctober.map((obj)=>{
                oct=oct+parseInt(obj.utotalamount)
            })

            let nov=0
            rnovember.map((obj)=>{
                nov=nov+parseInt(obj.utotalamount)
            })

            let dec=0
            rdecember.map((obj)=>{
                dec=dec+parseInt(obj.utotalamount)
            })

            const yearlySpending=[jan,feb, mar, apr, may, june, jul, aug, sep, oct, nov, dec]

           //..............................................................................................................................................................


            //...............................................Finding monthly deposits in current year.......................................................................

            const djanruary = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 1}] })
            const dfebruary = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 2}] })
            const dmarch = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 3}] })
            const dapril = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 4}] })
            const dmay = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 5}] })
            const djune = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 6}] })
            const djuly = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 7}] })
            const daugust = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 8}] })
            const dseptember = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 9}] })
            const doctober = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 10}] })
            const dnovember = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 11}] })
            const ddecember = await depositModel.find({ $and:[{useremail: email}, {udeposityear: Year}, {udepositmonth: 12}] })


            let djan=0
            djanruary.map((obj)=>{
                djan=djan+parseInt(obj.udepositamount)
            })

            let dfeb=0
            dfebruary.map((obj)=>{
                dfeb=dfeb+parseInt(obj.udepositamount)
            })

            let dmar=0
            dmarch.map((obj)=>{
                dmar=dmar+parseInt(obj.udepositamount)
            })

            let dapr=0
            dapril.map((obj)=>{
                dapr=dapr+parseInt(obj.udepositamount)
            })

            let dMay=0
            dmay.map((obj)=>{
                dMay=dMay+parseInt(obj.udepositamount)
            })

            let dJune=0
            djune.map((obj)=>{
                dJune=dJune+parseInt(obj.udepositamount)
            })

            let djul=0
            djuly.map((obj)=>{
                djul=djul+parseInt(obj.udepositamount)
            })

            let daug=0
            daugust.map((obj)=>{
                daug=daug+parseInt(obj.udepositamount)
            })

            let dsep=0
            dseptember.map((obj)=>{
                dsep=dsep+parseInt(obj.udepositamount)
            })

            let doct=0
            doctober.map((obj)=>{
                doct=doct+parseInt(obj.udepositamount)
            })

            let dnov=0
            dnovember.map((obj)=>{
                dnov=dnov+parseInt(obj.udepositamount)
            })

            let ddec=0
            ddecember.map((obj)=>{
                ddec=ddec+parseInt(obj.udepositamount)
            })

            const yearlydeposits=[djan,dfeb, dmar, dapr, dMay, dJune, djul, daug, dsep, doct, dnov, ddec]

           //..............................................................................................................................................................

           
            const result4= await productsModel.find()

            console.log(result4)

            let todayspendings=0
            result2.map((obj)=>{
                todayspendings=todayspendings+parseInt(obj.utotalamount) 
            })

            let monthlyspendings=0
            result3.map((obj)=>{
                monthlyspendings=monthlyspendings+parseInt(obj.utotalamount)
            })

            let totalproducts=0
            result4.map((obj)=>{
                totalproducts=totalproducts+1
            })




            let biscuits=0
            let snacks=0
            let softdrinks=0
            let juices=0

            result3.map((obj)=>{
                if(obj.uproductcategory=="Biscuits")
                {
                    biscuits=biscuits+parseInt(obj.utotalamount)
                }else if(obj.uproductcategory=="Juices")
                {
                    juices=juices+parseInt(obj.utotalamount)
                }else if(obj.uproductcategory=="Snacks")
                {
                    snacks=snacks+parseInt(obj.utotalamount)
                }else if(obj.uproductcategory=="Soft drinks")
                {
                    softdrinks=softdrinks+parseInt(obj.utotalamount)
                }
            })

            const categoriesarr=[biscuits,snacks,softdrinks,juices]
            
            res.send({ balance: result1.ubalance, todayspendings:todayspendings, thismonthspendings:monthlyspendings, totalvproducts: totalproducts, categories:categoriesarr, yearlyspendings:yearlySpending, yearlydeposits:yearlydeposits})
        } catch (error) {
            console.log(error)
        }
    }
}
export default userInfoController