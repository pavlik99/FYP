import axios from 'axios'
import {
  FETCH_ALL_RECIPES_START,
  FETCH_ALL_RECIPES_ERROR,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_RECIPE_START,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_ERROR,
  LIKE_RECIPE_ERROR,
  LIKE_RECIPE_RESTART,
  LIKE_RECIPE_START,
  LIKE_RECIPE_SUCCESS,
  CREATE_RECIPE,
  CREATE_RECIPE_ERROR,
  CREATE_RECIPE_RESTART,
  CREATE_RECIPE_START,
  UPDATE_RECIPE,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE_RESTART,
  UPDATE_RECIPE_START,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR,
  DELETE_RECIPE_START,
  GET_USER_RECIPES,
  GET_USER_RECIPES_CLEAR,
  GET_USER_RECIPES_ERROR,
  GET_USER_RECIPES_START,
} from '../constants/recipeTypes'

// FETCH ALL RECIPES
export const fetchRecipesAction = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_RECIPES_START })

    const { data } = await axios.get('/api/recipes')

    dispatch({ type: FETCH_ALL_RECIPES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_ALL_RECIPES_ERROR, payload: error.response })
  }
}

// FETCH ONE RECIPE BY ID
export const fetchRecipeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RECIPE_START })

    const { data } = await axios.get(`/api/recipes/${id}`)

    dispatch({ type: FETCH_RECIPE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_RECIPE_ERROR,
      payload: error.response,
    })
  }
}

// GET ALL USER RECIPES
export const getAllUserRecipesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_RECIPES_START,
    })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.get('/api/recipes/myrecipes', config)

    dispatch({
      type: GET_USER_RECIPES,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: GET_USER_RECIPES_ERROR, payload: error.response })
  }
}

// LIKE RECIPE
export const likeRecipeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_RECIPE_START })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.patch(`/api/recipes/${id}/like`, config)

    dispatch({ type: LIKE_RECIPE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: LIKE_RECIPE_ERROR,
      payload: error.response,
    })
  }
}

// DELETE A RECIPE
export const deleteRecipeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_RECIPE_START })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.delete(`/api/recipes/${id}`, config)

    dispatch({ type: DELETE_RECIPE })
  } catch (error) {
    dispatch({
      type: DELETE_RECIPE_ERROR,
      payload: error.response,
    })
  }
}

// CREATE A NEW RECIPE
export const createRecipeAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_RECIPE_START })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { newRecipe } = await axios.post(`/api/recipes`, {}, config)

    dispatch({ type: CREATE_RECIPE, payload: newRecipe })
  } catch (error) {
    dispatch({
      type: CREATE_RECIPE_ERROR,
      payload: error.response,
    })
  }
}

// UPDATE A RECIPE
export const updateRecipeAction =
  (id, recipe) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_RECIPE_START })
      const {
        authSignin: { accountData },
      } = getState()

      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accountData.token}`,
        },
      }

      const { updateData } = await axios.put(
        `/api/recipes/${id}`,
        recipe,
        headers
      )

      dispatch({ type: UPDATE_RECIPE, payload: updateData })
    } catch (error) {
      dispatch({
        type: UPDATE_RECIPE_ERROR,
        payload: error.response,
      })
    }
  }
