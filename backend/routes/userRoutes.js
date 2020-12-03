import express from 'express';
import {authUser,getUserProfile,registerUser,updateUserProfile,getAllUsers} from '../controller/userController.js'
import {protect,adminAuth} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/',registerUser)
router.get('/',protect,adminAuth,getAllUsers)
router.post('/login',authUser)
router.get('/profile',protect,getUserProfile)
router.put('/profile',protect,updateUserProfile)





export default router;