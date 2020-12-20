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

//motive Create a sample  product 
// route POST api/products
//Private usable for Admin

export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//motive upload a  product 
// route PUT api/products/:id
//Private usable for Admin

export const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})