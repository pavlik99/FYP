import React from 'react'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Form,
  Button,
  FloatingLabel,
  Col,
  Row,
  Container,
} from 'react-bootstrap'

import { setDeliveryAdress } from '../actions/basketActions'
const OrderPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const basket = useSelector((state) => state.basket)
  const { deliveryAdress } = basket

  const [deliveryAdress1, setDeliveryAdress1] = useState(
    deliveryAdress.deliveryAdress1
  )
  const [deliveryAddress2, setDeliveryAdress2] = useState(
    deliveryAdress.deliveryAddress2
  )
  const [town, setTown] = useState(deliveryAdress.town)
  const [county, setCounty] = useState(deliveryAdress.county)
  const [zipCode, setZipCode] = useState(deliveryAdress.zipCode)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      setDeliveryAdress({
        deliveryAdress1,
        deliveryAddress2,
        town,
        county,
        zipCode,
      })
    )
  }
  return (
    <div>
      <Row>
        <Col>
          <Container className='pt-4'>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='DeliveryAddress'>
                <FloatingLabel
                  controlId='deliveryAdress'
                  label='Delivery Address'
                  className='mb-3'
                >
                  <Form.Control
                    type='deliveryAdress'
                    placeholder='Enter Adress'
                    value={deliveryAdress1}
                    onChange={(e) => setDeliveryAdress1(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className='mb-3' controlId='DeliveryAddress2'>
                <FloatingLabel
                  controlId='deliveryAdress2'
                  label='Delivery Address 2 (Optional)'
                  className='mb-3'
                >
                  <Form.Control
                    type='deliveryAdress2'
                    placeholder='Enter Adress 2'
                    value={deliveryAddress2}
                    onChange={(e) => setDeliveryAdress2(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridCity'>
                  <FloatingLabel controlId='town' label='Town' className='mb-3'>
                    <Form.Control
                      type='town'
                      placeholder='Enter Town'
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridCounty'>
                  <FloatingLabel
                    controlId='county'
                    label='County'
                    className='mb-3'
                  >
                    <Form.Control
                      type='county'
                      placeholder='Enter County'
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridZip'>
                  <FloatingLabel
                    controlId='postCode'
                    label='Post Code'
                    className='mb-3'
                  >
                    <Form.Control
                      type='postCode'
                      placeholder='Enter Post Code'
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>

              <Button variant='outline-secondary' type='submit'>
                CHECKOUT
              </Button>
            </Form>
          </Container>
        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}

export default OrderPage
