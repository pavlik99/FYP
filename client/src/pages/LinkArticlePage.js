import React from 'react'
import { useEffect } from 'react'
import { Row, Col, Button, Container, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// Components
import RecipeCard from '../components/RecipeCard'
//Redux Actions
import { fetchRecipesAction } from '../actions/recipeActions'

const LinkArticlePage = () => {
  const allRecipes = useSelector((state) => state.allRecipes)
  const { recipes } = allRecipes
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecipesAction())
  }, [dispatch])

  return (
    <>
      <Container fluid>
        <Row className='py-4'>
          <Col></Col>
          <Col>
            {' '}
            <Link className='link' to={'/link/recipes'}>
              <i className='fas fa-utensils'></i> RECIPES
            </Link>
          </Col>

          <Col>
            <Link className='link' to={'/recipes'}>
              <i class='fa-solid fa-arrow-pointer'></i> RETURN
            </Link>
          </Col>
          <Col>
            {' '}
            <Link className='link' to={'/link/news'}>
              <i class='fa-solid fa-newspaper'></i> NEWS
            </Link>
          </Col>
          <Col></Col>
        </Row>
        <Row className='pt-3'>
          {recipes.map((recipe) => (
            <>
              {recipe.isArticle && (
                <>
                  {' '}
                  <Col lg={4} sm={12} xl={3} md={4} key={recipe._id}>
                    {' '}
                    <RecipeCard recipe={recipe} />{' '}
                  </Col>{' '}
                </>
              )}
            </>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default LinkArticlePage
