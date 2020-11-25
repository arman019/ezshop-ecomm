import React, { useState } from 'react'
import { Form, Button, Card, List, ListGroup, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }

    cart.totalProudcts =Number(addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.qty, 0)
      ))

      cart.totalPrice=Number(addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price* item.qty, 0))
      )

    const placeOrderHandler = (e) => {
        //
    }

    return (
        <>
            <CheckOutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>&nbsp;
                            {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Payment:</strong>&nbsp; {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {cart.cartItems.length === 0 ?
                                (<Message>Cart is Empty</Message>) :
                                (<ListGroup variant='flush'>

                                    {cart.cartItems.map((item, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.qty} x ${item.price} = ${(item.price * item.qty).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>)
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4} >
                    <Card>
                        <ListGroup varaint='flush'>
                            <ListGroup.Item>
                                <h2>Order Details </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> <strong>Total Items</strong></Col>
                                    <Col className='mr-5'>{cart.totalProudcts}</Col>

                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Row>
                                    <Col> <strong>Total Price</strong></Col>
                                    <Col className='mr-5'>${cart.totalPrice}</Col>

                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className=' btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

            </Row>

        </>
    )
}

export default PlaceOrderScreen
