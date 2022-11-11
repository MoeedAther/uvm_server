import express from 'express'
import userController from '../controllers/usercontroller.js';
import venderController from '../controllers/vendercontroller.js';


const router=express.Router();

router.post('/register/user', userController.createUser)
router.post('/auth/user', userController.authUser)
router.post('/register/vender', venderController.createVender)
router.post('/auth/vender', venderController.authVender)

export default router