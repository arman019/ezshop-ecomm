import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap"
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const ProductScreen = ({ match }) => {
  const dispatch =useDispatch();

  const productDetails=useSelector((state)=>state.productDetails)
  const {loading,error,product}=productDetails
  
console.log('productDetails error' ,error)

    useEffect(() => {
      dispatch(listProductDetails(match.params.id))
    }, [dispatch,match])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Home
        </Link>
        {loading ? (<Loader />): 
        error ?(<Message variant='danger'>{error}</Message> ):
        (<Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush" >
              <ListGroup.Item>
                <h4>{product.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} review`} />
              </ListGroup.Item>
  
              <ListGroup.Item>
                Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong> Description:</strong> &nbsp; {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
  
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
  
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                                      </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>) }
      
    </>
  )
}

export default ProductScreen
