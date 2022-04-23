import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Row, Col, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UserRecipeCard from '../components/UserRecipeCard'
// Redux Actions
import { getAccountInfo } from '../actions/authActions'

import {
  createRecipeAction,
  deleteRecipeAction,
  getAllUserRecipesAction,
} from '../actions/recipeActions'

const UserRecipesPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const getUserRecipes = useSelector((state) => state.getUserRecipes)
  const { recipes, success } = getUserRecipes

  const newRecipe = useSelector((state) => state.newRecipe)
  const { created, recipe } = newRecipe

  const deleteRecipe = useSelector((state) => state.deleteRecipe)
  const { deleted } = deleteRecipe

  const accountInfo = useSelector((state) => state.accountInfo)
  const { loading, account, error } = accountInfo

  const newRecipeHandler = () => {
    dispatch(createRecipeAction())
  }

  const deleteRecipetHandler = (id) => {
    dispatch(deleteRecipeAction(id))
    history.push('/myrecipes')
  }

  // useEffect(() => {
  //   if (!accountData) {
  //     history.push('/signin')
  //   } else {
  //     if (!accountData.forename) {
  //       dispatch(getAccountInfo('myrecipes'))
  //       dispatch(getAllUserRecipesAction())
  //     }
  //   }
  // }, [dispatch, history, accountData, deleted, created])

  useEffect(() => {
    // dispatch({ type: MANAGER_NEW_PRODUCT_RESTART })
    if (!accountData) {
      history.push('/signin')
    } else {
      if (accountData) {
        dispatch(getAccountInfo('allorders'))
        dispatch(getAllUserRecipesAction())
      }
    }
    // if (created) {
    //   history.push(`/manager/product/${product._id}/update`)
    // } else {
    //   dispatch(fetchProducts)
    // }
  }, [dispatch, history, accountData, deleted, created])

  return (
    <>
      <Container className='pt-4' fluid>
        <Row>
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
            {recipes.map((ritem) => (
              <Col lg={4} sm={12} xl={3} md={6} key={ritem._id}>
                <UserRecipeCard
                  item={ritem}
                  deleteRecipetHandler={deleteRecipetHandler}
                />
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
    </>
  )
}

export default UserRecipesPage
