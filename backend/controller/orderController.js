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
export  const getOrderById = asyncHandler(async (req, res) => {
   
    const order = await  Order.findById(req.params.id).populate('user','name email')

    if(order){
       // console.log('order ',order)
        res.status(200)
       // res.json({order}) // if we 2nd bracket to a json object it will surely fail so dont 

       res.json(order) 
}
    else{
        res.status(404)
        throw new Error('Order not found')
    }    
    
})


// motive  order paying update
// routes Put /api/orders/:id/pay
// route mode Private

export  const updateOrderToPaid = asyncHandler(async (req, res) => {
   
    const order = await  Order.findById(req.params.id)
    console.log('req.body in updateOrderToPaid ', req.body)
    if(order){      
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()

        res.status(201)
        res.json(updatedOrder)
    }

    else{
        res.status(404)
        throw new Error('Updated order cannot be done')
    }    
    
})


export { addOrderItems }