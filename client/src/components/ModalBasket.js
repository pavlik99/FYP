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
        variant='outline-dark'
        onClick={handleShow}
        className='btn-block'
        size='lg'
        type='button'
        disabled={product.countInStock === 0}
      >
        ADD TO BASKET
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>SELECT QUANTITY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            {product.countInStock > 0 && (
              <Col>
                <Row>
                  <Form.Select
                    as='select'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    autoFocus
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
          <Button variant='outline-secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={addToBasketHandler}
            variant='outline-dark'
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
