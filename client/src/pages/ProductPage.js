import React from 'react'
import { useEffect, useState } from 'react'

import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Container,
} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import Reviews from '../components/Reviews'
import PopOver from '../components/PopOver'
import Loading from '../components/Loading'
import ModalBasket from '../components/ModalBasket'
import ProductAccordion from '../components/ProductAccordion'
//import ProductsRecommnedation from '../components/ProductsRecommnedation'

import { fetchProduct } from '../actions/productActions'

import { useHistory } from 'react-router-dom'
// const product = products.find(p => p._id ===  props.match.params.id )
//{match}
//props.match
const ProductPage = (props) => {
  // {match} instead props
  let history = useHistory() //aaaaaaaaaaaaaaaaaaaaaaaaa section 6 video 1
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const oneProduct = useSelector((state) => state.oneProduct)
  const { loading, product, success, error } = oneProduct

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id)) //match.params.id
  }, [dispatch, props.match.params.id]) //maybe delete "props.match.params.id"

  const addToBasketHandler = () => {
    //Handler
    history.push(`/basket/${props.match.params.id}?quantity=${quantity}`)
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : success ? (
        <Container className='py-2'>
          <Row>
            <Col md={6}>
              {' '}
              <Image
                className='rounded'
                src={product.productImage}
                fluid
              />{' '}
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  {' '}
                  <h4>{product.title}</h4>{' '}
                </ListGroupItem>
                <ListGroupItem>
                  <Reviews
                    value={product.review}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: £{product.price}</ListGroupItem>
                <ListGroupItem>
                  <PopOver product={product} />
                </ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
                <ListGroupItem>
                  <Row className='py-3'>
                    <ModalBasket
                      show={show}
                      setShow={setShow}
                      handleClose={handleClose}
                      handleShow={handleShow}
                      product={product}
                      setQuantity={setQuantity}
                      quantity={quantity}
                      addToBasketHandler={addToBasketHandler}
                    />

                    <Col className='pt-4'>
                      {product.countInStock > 0 ? (
                        <i className='fa-solid fa-circle-check fa-lg'>
                          {' '}
                          Available
                        </i>
                      ) : (
                        <i className='fa-solid fa-circle-xmark fa-lg'>
                          {' '}
                          Not Available{' '}
                        </i>
                      )}
                    </Col>
                  </Row>
                  <Row className='pt-5'>
                    <Col>
                      <text className='px-3'>Share</text>
                      <i className='fa-brands fa-twitter px-1'> </i>
                      <i className='fa-brands fa-facebook px-1'> </i>
                      <i className='fa-brands fa-pinterest px-1'> </i>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

          <Row className='py-4'>
            <ProductAccordion product={product} />
          </Row>
          <Row>
            {/* {products.map(product => (
        <Col lg={4} sm={12} xl={3} md={6}   >
        <ProductsRecommnedation product={product} />
        </Col>
    ))} RECCOMEDED PRODUCTS ACCORIFNG TO TAG HAVE TO GO HERE */}
          </Row>
        </Container>
      ) : (
        error
      )}
    </div>
  )
}

export default ProductPage
