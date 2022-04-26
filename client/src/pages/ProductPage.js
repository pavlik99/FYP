import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Container,
} from 'react-bootstrap'

import PopOver from '../components/PopOver'
import Loading from '../components/Loading'
import ModalBasket from '../components/ModalBasket'
import ProductAccordion from '../components/ProductAccordion'
import ModalReview from '../components/ModalReview'
import ProductsRecommnedation from '../components/ProductsRecommnedation'

// REDUX ACTIONS
import {
  fetchProduct,
  fetchProducts,
  rateProductAction,
} from '../actions/productActions'
import { RATE_PRODUCT_RESTART } from '../constants/productTypes'

const ProductPage = (props) => {
  const productId = props.match.params.id
  let history = useHistory()
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [showReview, setShowReview] = useState(false)
  const handleCloseReview = () => setShowReview(false)
  const handleShowReview = () => setShowReview(true)

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin //delete if still not using this one

  const oneProduct = useSelector((state) => state.oneProduct)
  const { loading, product, success, error } = oneProduct

  const allProducts = useSelector((state) => state.allProducts)
  const { products } = allProducts

  const rateProduct = useSelector((state) => state.rateProduct)
  const { rated } = rateProduct

  useEffect(() => {
    if (rated) {
      setRating(0)
      dispatch({ type: RATE_PRODUCT_RESTART })
    }
    dispatch(fetchProduct(props.match.params.id))
    dispatch(fetchProducts())
  }, [dispatch, props.match.params.id, rated])

  const addToBasketHandler = () => {
    history.push(`/basket/${props.match.params.id}?quantity=${quantity}`)
  }

  const ratingHandler = (e) => {
    e.preventDefault()
    dispatch(rateProductAction(productId, { rating }))
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : success ? (
        <Container className='py-3'>
          <Row>
            <Col md={6}>
              {' '}
              <Image
                className='productPageImage'
                rounded
                src={product.productImage}
              />{' '}
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroupItem className='uppercase '>
                  {' '}
                  <h4>{product.title}</h4>{' '}
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <ModalReview
                        showReview={showReview}
                        setShowReview={setShowReview}
                        handleCloseReview={handleCloseReview}
                        handleShowReview={handleShowReview}
                        rated={rated}
                        rating={rating}
                        setRating={setRating}
                        ratingHandler={ratingHandler}
                        value={product.rating} //review
                        text={`${product.numReviews} reviews`}
                      />
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className='productFont'>
                  Price: £{product.price}
                </ListGroupItem>
                <ListGroupItem>
                  <PopOver product={product} />
                </ListGroupItem>
                <ListGroupItem className='productFont'>
                  {product.description}
                </ListGroupItem>
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
                        <i className='fa-solid fa-circle-check fa-lg'> </i>
                      ) : (
                        <i className='fa-solid fa-circle-xmark fa-lg'> </i>
                      )}
                      {product.countInStock > 0
                        ? ' Available'
                        : ' Not Available'}
                    </Col>
                    <Col className='pt-4'>
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
          <Row></Row>

          <Row className='py-4'>
            <ProductAccordion className='productFont' product={product} />
          </Row>
          <Row>
            {(product.isVegan || product.isVegeterian) && (
              <h4 className='productFont uppercase'> Explore more products</h4>
            )}

            {(product.isVegan || product.isVegeterian) && (
              <>
                {' '}
                {products.map((product) => (
                  <>
                    {product.isVegan && (
                      <>
                        <Col lg={4} sm={12} xl={3} md={6}>
                          <ProductsRecommnedation product={product} />
                        </Col>{' '}
                      </>
                    )}
                  </>
                ))}{' '}
              </>
            )}
          </Row>
        </Container>
      ) : (
        error
      )}
    </div>
  )
}

export default ProductPage
