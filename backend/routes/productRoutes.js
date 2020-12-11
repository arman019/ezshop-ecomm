import express from 'express';
import {getAllproducts,getProductById,deleteProductById} from '../controller/productController.js'
import { protect, adminAuth } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', getAllproducts)

router.get('/:id',getProductById);

router.delete('/:id', protect,adminAuth,deleteProductById);

export default router;