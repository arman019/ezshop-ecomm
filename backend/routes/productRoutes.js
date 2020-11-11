import express from 'express';
import asyncHandler from'express-async-handler'
const router = express.Router();
import Product from '../models/productModel.js';




router.get('/',asyncHandler(async (req, res) => {
    const products = await Product.find({})
   res.json(products)
    
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    console.log(product)
    if(product){
        res.status(200).json(product)
    }else{
        res.status(404)
        throw new Error('Product not Found')
    }
}));

export default router;