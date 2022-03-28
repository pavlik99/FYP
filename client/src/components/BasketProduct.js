import React from 'react'
import { Card, Button, Form, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const BasketProduct = ({
  item,
  addProduct,
  dispatch,
  removeProductFromBasketHandler,
}) => {
  return (
    <>
      <Card className='my-3  rounded' style={{ width: '18rem' }}>
        <Link to={`/product/${item.product}`}>
          <Card.Img
            src={item.image}
            className='rounded-top'
            variant='top'
            rounded
          />
        </Link>
        <Card.Body>
          <Card.Title as='div' className='pl-2'>
            {' '}
            {item.title}
          </Card.Title>
          <Card.Text as='div'> £{item.price}</Card.Text>

          <Row className='pr-2 py-3'>
            <Col>
              <Form.Control
                as='select'
                value={item.quantity}
                onChange={(e) =>
                  dispatch(addProduct(item.product, Number(e.target.value)))
                }
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Button
                variant='dark'
                onClick={() => removeProductFromBasketHandler(item.product)}
              >
                <i class='fa-solid fa-user-xmark'></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default BasketProduct
