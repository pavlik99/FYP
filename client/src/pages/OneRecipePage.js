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
  Button,
} from 'react-bootstrap'
// REDUX ACTIONS
import { fetchRecipeAction, likeRecipeAction } from '../actions/recipeActions'
import { LIKE_RECIPE_RESTART } from '../constants/recipeTypes'

//import ProductsRecommnedation from '../components/ProductsRecommnedation'

const OneRecipePage = (props) => {
  const recipeId = props.match.params.id

  const dispatch = useDispatch()

  const oneRecipe = useSelector((state) => state.oneRecipe)
  const { recipe } = oneRecipe

  const likeRecipe = useSelector((state) => state.likeRecipe)
  const { liked } = likeRecipe

  useEffect(() => {
    if (liked) {
      dispatch({ type: LIKE_RECIPE_RESTART })
    }
    dispatch(fetchRecipeAction(recipeId))
  }, [dispatch, recipeId, liked])

  const likeRecipeHandler = (e) => {
    e.preventDefault()
    dispatch(likeRecipeAction(recipeId))
  }

  return (
    <>
      <Row>
        <Row>
          <Image
            className='rounded'
            src={recipe.image}
            height={500}
            width={900}
          />
        </Row>
        <Row>
          <h1>{recipe.title}</h1>
        </Row>
        <Row>{recipe.description}</Row>
        <Row>{recipe.body}</Row>
        <Row>{recipe.ingredients}</Row>
        <Row>
          <Col> Did you enjoy the recipe!</Col>
          <Col>
            <Button onClick={likeRecipeHandler}>
              <i class='fa-regular fa-heart'></i>
            </Button>
            {recipe.likes}
          </Col>
        </Row>
      </Row>
      <Row>
        ADD PRODUCTS ACCORINF TO WHETEHR THE RECIPY IS VEGAN OR VEGETERIAN OR
        KETO
      </Row>
    </>
  )
}

export default OneRecipePage
