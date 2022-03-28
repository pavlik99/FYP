import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  Card,
  Form,
  Button,
  ListGroup,
  Container,
  ListGroupItem,
} from 'react-bootstrap'
import BasketProduct from '../components/BasketProduct'
import { addProduct, removeProduct } from '../actions/basketActions'
import { useHistory, useLocation } from 'react-router-dom'

//{match}
const BasketPage = (props) => {
  let history = useHistory()
  let location = useLocation()
  const productId = props.match.params.id

  const basket = useSelector((state) => state.basket)
  const { basketProducts } = basket
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  useEffect(() => {
    if (productId) {
      dispatch(addProduct(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  const removeProductFromBasketHandler = (id) => {
    dispatch(removeProduct(id))
  }
  const PurchaseHandler = () => {
    history.push('/login?redirect=checkout')
  }
  return (
    <>
      <Container>
        <h2 className='pt-2'>
          <i class='fa-solid fa-basket-shopping'></i> Your Basket
        </h2>
        <Row>
          {basketProducts.map((item) => (
            <Col lg={4} sm={12} xl={3} md={6}>
              <BasketProduct
                item={item}
                addProduct={addProduct}
                dispatch={dispatch}
                removeProductFromBasketHandler={removeProductFromBasketHandler}
              />
            </Col>
          ))}
        </Row>
        <Col md={4}>
          <>
            <ListGroup horizontal>
              <ListGroupItem>
                <h2>
                  Subtotal: {/* ( */}
                  {/* {basketProducts.reduce(
                    (acc, currentItem) => acc + currentItem.quantity,
                    0
                  )}
                  ) items */}
                </h2>
                £{' '}
                {basketProducts
                  .reduce(
                    (acc, currentItem) =>
                      acc + currentItem.quantity * currentItem.price,
                    0
                  )
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem className='pt-4'>
                <Button variant='dark' type='button' onClick={PurchaseHandler}>
                  <i class='fa-regular fa-credit-card'></i> CHECKOUT
                </Button>
              </ListGroupItem>
            </ListGroup>
          </>
        </Col>
      </Container>
    </>
  )
}

export default BasketPage
