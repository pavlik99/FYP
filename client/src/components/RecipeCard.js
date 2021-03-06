import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const RecipeCard = ({ recipe }) => {
  return (
    <>
      <Card rounded className='rcorners1'>
        <Link to={`/recipe/${recipe._id}`}>
          <Card.Img
            variant='top'
            src={recipe.image}
            height={200}
            width={200}
            rounded
          />
        </Link>
        <Card.Body>
          <Card.Title className='uppercase'>{recipe.title}</Card.Title>
          <Card.Text className='recipeCardFont'>
            {recipe.description.substring(0, 200)} ...
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>{recipe.createdAt.substring(0, 10)}</Col>
            <Col xs lg='2'></Col>
            <Col>
              <i class='fa-solid fa-heart'></i> {recipe.likes}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}

export default RecipeCard
