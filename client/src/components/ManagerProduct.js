import React from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const ManagerProduct = ({ item, deleteProductHandler }) => {
  return (
    <>
      <Card className='my-3  rounded' style={{ width: '18rem' }}>
        <Link to={`/product/${item._id}`}>
          <Card.Img
            className='rounded-top'
            height={250}
            width={300}
            rounded
            variant='top'
            src={item.productImage}
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
              <Button
                variant='outline-dark'
                onClick={() => deleteProductHandler(item._id)}
              >
                <i className='fa-regular fa-trash-can'> </i> DELETE
              </Button>
            </Col>
            <Col>
              <Link to={`/manager/product/${item._id}/update`}>
                <Button variant='outline-dark'>
                  <i className='fa-solid fa-sliders'> </i> EDIT
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default ManagerProduct
