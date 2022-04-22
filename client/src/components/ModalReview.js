import React from 'react'
import { Modal, Button, Col, Form, Row } from 'react-bootstrap'
import Reviews from './Reviews'

const ModalReview = ({
  showReview,
  setShowReview,
  handleCloseReview,
  handleShowReview,
  rated,
  rating,
  setRating,
  ratingHandler,
  value,
  text,
}) => {
  return (
    <div>
      <Button
        variant='light'
        onClick={handleShowReview}
        className='btn-block'
        size='sm'
        type='button'
        disabled={rated}
      >
        <Reviews value={value} text={text} />
      </Button>

      <Modal
        show={showReview}
        onHide={handleCloseReview}
        backdrop='static'
        keyboard={false}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value=''>Select...</option>
                <option value='1'>1</option>
                <option value='2'>2 - Fair</option>
                <option value='3'>3 - Good</option>
                <option value='4'>4 - Very Good</option>
                <option value='5'>5 - Excellent</option>
              </Form.Select>
            </>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleCloseReview}>
            Close
          </Button>
          <Button
            onClick={ratingHandler}
            variant='outline-dark'
            size='md'
            className='btn-block'
            type='button'
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalReview
