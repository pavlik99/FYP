import React from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const UserRecipeCard = ({ item, deleteRecipeHandler }) => {
  return (
    <>
      <Card className='my-3  rounded' style={{ width: '18rem' }}>
        <Link to={`/recipe/${item._id}`}>
          <Card.Img src={item.image} className='rounded-top' variant='top' />
        </Link>
        <Card.Body>
          <Card.Title as='div' className='pl-2'>
            {' '}
            {item.title}
          </Card.Title>

          <Row className='pr-2 py-3'>
            <Col>
              <Button
                variant='outline-dark'
                onClick={() => deleteRecipeHandler(item._id)}
              >
                <i className='fa-regular fa-trash-can'> </i> DELETE
              </Button>
            </Col>
            <Col>
              <Link to={`/update/${item._id}`}>
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

export default UserRecipeCard
