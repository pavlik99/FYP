import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, Container, Button } from 'react-bootstrap'
// REDUX ACTIONS
import { fetchRecipeAction, likeRecipeAction } from '../actions/recipeActions'
import { LIKE_RECIPE_RESTART } from '../constants/recipeTypes'

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
      <Container fluid>
        <Row className='py-4'>
          <Row>
            <Col>
              <Image
                className='img'
                src={recipe.image}
                height={400}
                width={700}
              />
            </Col>

            <Col>
              {' '}
              <Row>
                {' '}
                <h1 className='uppercase'>{recipe.title}</h1>
              </Row>
              <Row className='pt-3 pl-2 recipeFont'> {recipe.description}</Row>
              <Row className='pt-3'> Add Icons</Row>
            </Col>
          </Row>

          <Row className='pt-3 recipeFont'>{recipe.body}</Row>
          <Row className='pt-3 recipeFont'>{recipe.body2}</Row>
          {recipe.isRecipe && (
            <Row className='pt-4 recipeFont'>
              {' '}
              Ingredients: {recipe.ingredients}
            </Row>
          )}

          <Row className='pt-3'>
            {recipe.isRecipe && (
              <div className='cursiveFont'> Did you enjoy the recipe?</div>
            )}

            {recipe.isArticle && (
              <div className='cursiveFont'> Did you enjoy the article?</div>
            )}
            {recipe.isNews && (
              <div className='cursiveFont'> Did you enjoy the article?</div>
            )}
          </Row>
          <Row className='pt-3 numberFont'>
            <Col>
              {liked ? (
                <Button
                  variant='outline-danger'
                  onClick={likeRecipeHandler}
                  size={'sm'}
                >
                  <i class='fa-regular fa-heart'></i>
                </Button>
              ) : (
                <Button
                  variant='outline-danger'
                  onClick={likeRecipeHandler}
                  size={'sm'}
                >
                  <i class='fa-regular fa-heart'></i>
                </Button>
              )}

              {'   '}
              <>{recipe.likes}</>
            </Col>
          </Row>
        </Row>

        <Row md={3}>
          <>
            <Image
              className='img2'
              src={recipe.image}
              height={300}
              width={300}
            />
          </>
          <>
            <Image
              className='img2'
              src={recipe.image2}
              height={300}
              width={300}
            />
          </>
          <>
            <Image
              className='img2'
              src={recipe.image2}
              height={300}
              width={300}
            />
          </>
        </Row>
      </Container>
    </>
  )
}

export default OneRecipePage
