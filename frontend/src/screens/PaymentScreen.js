import React, { useState } from 'react'
import { Form, Button,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethods } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress) {
        history.pus('/shipping')
    }
    const [paymentmethod, setPaymentMethods] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethods(paymentmethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h3 className="py-3">Payment Method </h3>
            <Form onSubmit={submitHandler}>
                <Form.Group >
                    
                    <Form.Label as='legend'> </Form.Label>
                    <Col>                                           
                        <Form.Check 
                        type='radio'
                        name='paymentmethod'
                        id='Paypal'
                        label='PayPal or Credit Card'
                        value='PayPal'
                        checked
                        onChange={(e)=> setPaymentMethods(e.target.value)}
                        >
                        </Form.Check>
                        </Col>                
                    
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
        </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen