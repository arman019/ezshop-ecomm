import asyncHandler from'express-async-handler'
import Product from '../models/productModel.js';

export const getAllproducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products)
})

//motive Get product by id
// route api/products/:id
//public

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


//motive Delete a  product 
// route DELETE api/products/:id
//Private usable for Admin

export const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    //console.log(product)
    if (product) {
        await product.remove()
        res.status(200).json({message:"Product removed "})
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})



