import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

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

    console.log('totalProducts in backend',totalProducts)

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

export { addOrderItems }