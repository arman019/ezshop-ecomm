import express from 'express'
const router = express.Router()
import { addOrderItems ,getOrderById,updateOrderToPaid} from '../controller/orderController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.get('/:id/pay', protect, updateOrderToPaid)

export default router