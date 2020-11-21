import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'



const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log(redirect)

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history,redirect,userInfo])

    const submithandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
        <FormContainer >
            {error && (<Message variant='danger'>{error}</Message>)}
            {loading && (<Loader />)}
            <h1 className="my-3">Sign in</h1>
            <Form onSubmit={submithandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        placeholder='Enter your mail Id'
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant="primary">
                    Sign in
                </Button>
            </Form>

            <Row className="py-3" >
                <Col>
                    Not Registered yet? {'  '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen

