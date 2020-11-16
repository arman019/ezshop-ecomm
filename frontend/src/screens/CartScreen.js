import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({ match, location, history }) => {

   const productId = match.params.id
   const qty = location.search ? Number(location.search.split('=')[1]) : 1
   const dispatch = useDispatch()
   const cart = useSelector((state) => state.cart)
   const { cartItems } = cart

   useEffect(() => {
      if (productId) {
         dispatch(addToCart(productId, qty))
      }
   }, [dispatch, productId, qty])

   const removeFromCartHandler = (id) => {
     dispatch(removeFromCart(id))
   }

   const checkOutHandler = () => {
      history.push('/login? redirect=shipping')
   }

   return (
      <Row>
         <Col md={8}>
            <h3>SHOPPING CART</h3>
            {cartItems.length === 0 ? (<Message> Your cart is empty &nbsp; <Link to="/">Go back to home</Link> </Message>) :
               (<ListGroup variant='flush'>
                  {cartItems.map((item) => (
                     <ListGroup.Item key={item.product}>
                        <Row>
                           <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                           </Col>

                           <Col md={3}>
                              <Link to={`/prdouct/${item.product}`}>{item.name}</Link>
                           </Col>

                           <Col md={2}>${item.price}</Col>
                           <Col md={2}>
                              <Form.Control as='select'
                                 value={item.qty}
                                 onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                 {[...Array(item.countInStock).keys()].map((numOfPrdt) => (
                                    <option key={numOfPrdt + 1} value={numOfPrdt + 1}>
                                       {numOfPrdt + 1}
                                    </option>
                                 ))}
                              </Form.Control>
                           </Col>
                           <Col md={2}>
                              <Button type="button" varient='light'
                                 onClick={() => removeFromCartHandler(item.product)}>
                                 <i className="fas fa-trash-alt" />
                              </Button>
                           </Col>

                        </Row>
                     </ListGroup.Item>
                  ))}
               </ListGroup>)
            }
         </Col>
         <Col md={4}>
            <Card>
               <ListGroup variant="flush">
                  <ListGroup.Item>
                     <h2 style={{ marginLeft: '0.5rem' }}>Total {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h4 style={{ marginLeft: '0.5rem' }}>
                        Total cost $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} </h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Button type='button' variant="dark"
                        className="btn-block"
                        onClick={() => checkOutHandler()}
                        disabled={cartItems.length === 0}
                     >
                        Checkout
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>

      </Row>
   )
}
export default CartScreen
