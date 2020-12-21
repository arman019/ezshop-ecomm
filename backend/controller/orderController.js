import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'


// motive Create new order
// routes POST /api/orders
// route mode Private
//gettting from frontend PlaceOrderScreen
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalProducts,
        totalPrice,
    } = req.body


    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            totalProducts,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// motive Get order sing Id
// routes Get /api/orders/:id
// route mode Private
//showing to  order page in frontend 
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        res.status(200)
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// motive  order paying update
// routes Put /api/orders/:id/pay
// route mode Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()

        res.status(201)
        res.json(updatedOrder)
    }

    else {
        res.status(404)
        throw new Error('Updated order cannot be done')
    }

})

// motive  getting orders of single customer
// routes Put /api/orders/myorders
// route mode Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    if (orders) {
        res.status(200)
        res.json(orders)
    }
    else {
        res.status(404)
        throw new Error('Orders user error')
    }
})

// motive  getting all orders
// routes Put /api/orders
// route mode Private for Admin usage
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user','id name')
    if (orders) {
        res.status(200)
        res.json(orders)
    }
    else {
        res.status(404)
        throw new Error('Orders user error')
    }
})




export { addOrderItems, getMyOrders }