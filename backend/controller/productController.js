import asyncHandler from'express-async-handler'
import Product from '../models/productModel.js';

export const getAllproducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products)
})


export const getProductById = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id)
    //console.log(product)
    if(product){   
        res.status(200).json(product)
    }else{
        res.status(404)
        throw new Error('Product not Found')
    }
})

