import React from 'react'
import { Modal, Button, Col, Form, Row } from 'react-bootstrap'

const ModalBasket = ({
  show,
  setShow,
  handleClose,
  handleShow,
  product,
  setQuantity,
  quantity,
  addToBasketHandler,
}) => {
  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
        className='btn-block'
        size='lg'
        type='button'
        disabled={product.countInStock === 0}
      >
        ADD TO BASKET
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            {product.countInStock > 0 && (
              <Col>
                {/* <Row>Quantity </Row> */}
                <Row>
                  <Form.Select
                    as='select'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Row>
              </Col>
            )}
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={addToBasketHandler}
            variant='primary'
            size='md'
            className='btn-block'
            type='button'
            disabled={product.countInStock === 0}
          >
            ADD TO BASKET
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalBasket
