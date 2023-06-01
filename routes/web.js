import express from 'express'
import userController from '../controllers/usercontroller.js';
import productsController from '../controllers/productscontroller.js';
import transactionController from '../controllers/transactioncontroller.js';
import depositController from '../controllers/depositcontroller.js';
import userInfoController from '../controllers/userinfocontroller.js';
import { withdraw } from '../controllers/withdrawdeposit.js';
import adminController from "../controllers/adminController.js";

const router=express.Router();

//User Registeration
router.post('/register/user', userController.createUser)

//User Login
router.post('/auth/user', userController.authUser)

// forget password
router.post('/forget-password', userController.forgetPassword)

// otp check and update password
router.post('/otp-check', userController.OtpCheck)



//Products Addition
router.post('/addproducts', productsController.addProducts)

//Products List
router.get('/products', productsController.getProductInfo)

//Initial Transaction Product Information
router.post('/producttransaction', productsController.getProductTransactionInfo)

//Add Product Category 
router.post('/addproductcategory', productsController.addProductCategory)

// Delete Product Category
router.post('/removeproductcategory',productsController.removeProductCategory)

//Final Transaction
router.post('/transaction', transactionController.Transaction)

//User Account Deposit
router.post('/deposit',depositController.Deposit)




//User Data
router.post('/userinfo',userInfoController.userInfo)

//User Transaction Data
router.get('/usertransactions', transactionController.getUserTransactionInfo)

//Check Token
router.post('/token', userController.checkToken)

// Withdraw deposit
router.post('/withdraw', withdraw);

// Registered user info
router.get("/admininfo", adminController.adminInfo);

export default router