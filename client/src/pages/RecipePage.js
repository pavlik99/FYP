import React from 'react'
import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/RecipeCard'
import { fetchRecipesAction } from '../actions/recipeActions'

const RecipePage = () => {
  const allRecipes = useSelector((state) => state.allRecipes)
  const { recipes } = allRecipes
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipesAction())
  }, [dispatch])

  return (
    <>
      <Row className='pt-3'>
        {recipes.map((recipe) => (
          <Col lg={4} sm={12} xl={3} md={6} key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default RecipePage
