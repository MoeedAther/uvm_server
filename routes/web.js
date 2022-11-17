import express from 'express'
import userController from '../controllers/usercontroller.js';
import venderController from '../controllers/vendercontroller.js'
import productsController from '../controllers/productscontroller.js';
import transactionController from '../controllers/transactioncontroller.js';

const router=express.Router();

//User Registeration
router.post('/register/user', userController.createUser)

//User Login
router.post('/auth/user', userController.authUser)

//Vender Registeration
router.post('/register/vender', venderController.createVender)

//Vender Login
router.post('/auth/vender', venderController.authVender)

//Products Addition
router.post('/addproducts', productsController.addProducts)

//Products List
router.get('/products', productsController.getProductInfo)

//Initial Transaction Product Information
router.post('/producttransaction', productsController.getProductTransactionInfo)

//Final Transaction
router.post('/transaction', transactionController.Transaction)


export default router