import express from 'express'
const router = express.Router()
import { addOrderItems ,getOrderById,updateOrderToPaid,getMyOrders,getOrders} from '../controller/orderController.js'
import { protect,adminAuth } from '../middlewares/authMiddleware.js'

router.post('/', protect, addOrderItems)
router.get('/', protect, adminAuth,getOrders)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)



export default router