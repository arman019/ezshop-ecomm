import asyncHandler from'express-async-handler'
import Product from '../models/productModel.js';

export const getAllproducts = asyncHandler(async (req,res)=>{
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}
   
    const products = await Product.find({...keyword})
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


//motive create anew review  
// route PUT api/products/:id/reviews
//Private usable 

export const createProductReview = asyncHandler(async (req, res) => {
    const {
        rating,
        comment
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(401)
            throw new Error('Product already reviewed')
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0)/ product.reviews.length
        await product.save()
        res.status(201).json({message: 'review added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})