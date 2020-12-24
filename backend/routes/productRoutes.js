import express from 'express';
import {
    getAllproducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct,
    createProductReview,
    } from '../controller/productController.js'
import { protect, adminAuth } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', getAllproducts)

router.post('/', protect,adminAuth,createProduct)

router.get('/:id',getProductById);

router.put('/:id', protect, adminAuth, updateProduct);

router.post('/:id/reviews', protect, createProductReview)

router.delete('/:id', protect,adminAuth,deleteProductById);

export default router;