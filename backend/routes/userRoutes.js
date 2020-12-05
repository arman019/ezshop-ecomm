import express from 'express';
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    getUserById,
    updateUserByAdmin} from '../controller/userController.js'
import {protect,adminAuth} from '../middlewares/authMiddleware.js'

const router = express.Router();


router.post('/',registerUser)
router.get('/',protect,adminAuth,getAllUsers)
router.post('/login',authUser)

router.get('/profile',protect,getUserProfile)
router.get('/:id',protect,getUserById)
router.put('/profile',protect,updateUserProfile)
router.put('/:id',protect,updateUserByAdmin)
router.delete('/:id',protect,adminAuth,deleteUser)





export default router;