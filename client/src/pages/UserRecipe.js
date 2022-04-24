import React from 'react'
import { useState, useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  Alert,
  ListGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { getAccountInfo } from '../actions/authActions'
import {
  createRecipeAction,
  deleteRecipeAction,
  getAllUserRecipesAction,
} from '../actions/recipeActions'
import UserRecipeCard from '../components/UserRecipeCard'
const UserRecipe = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const accountInfo = useSelector((state) => state.accountInfo)
  const { loading, account } = accountInfo

  const newRecipe = useSelector((state) => state.newRecipe)
  const { created, recipe } = newRecipe

  const deleteRecipe = useSelector((state) => state.deleteRecipe)
  const { deleted } = deleteRecipe

  const getUserRecipes = useSelector((state) => state.getUserRecipes)
  const { recipes } = getUserRecipes

  const deleteRecipeHandler = (id) => {
    dispatch(deleteRecipeAction(id))
    history.push('/profiles/myrecipes')
  }

  const newRecipeHandler = () => {
    dispatch(createRecipeAction())
  }

  useEffect(() => {
    if (!accountData) {
      history.push('/signin')
    } else {
      if (!account.forename) {
        dispatch(getAllUserRecipesAction())
      }
    }
  }, [dispatch, history, accountData, deleted, created, account])

  return (
    <>
      {loading && <Loading />}

      <Col>
        <Button
          className='my-3'
          variant='outline-dark'
          onClick={newRecipeHandler}
        >
          {' '}
          <i class='fa-regular fa-square-plus'></i> RECIPE
        </Button>
      </Col>
      <Row>
        {recipes.map((item) => (
          <Col lg={4} sm={12} xl={3} md={6} key={item._id}>
            <UserRecipeCard
              item={item}
              deleteRecipeHandler={deleteRecipeHandler}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default UserRecipe
