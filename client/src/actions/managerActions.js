import axios from 'axios'
import {
  MANAGER_DELETE_PRODUCT,
  MANAGER_DELETE_PRODUCT_START,
  MANAGER_DELETE_PRODUCT_ERROR,
  MANAGER_NEW_PRODUCT,
  MANAGER_NEW_PRODUCT_RESTART,
  MANAGER_NEW_PRODUCT_START,
  MANAGER_NEW_PRODUCT_ERROR,
  MANAGER_UPDATE_PRODUCT,
  MANAGER_UPDATE_PRODUCT_START,
  MANAGER_UPDATE_PRODUCT_ERROR,
  GET_ALL_ORDERS_MANAGER,
  GET_ALL_ORDERS_MANAGER_ERROR,
  GET_ALL_ORDERS_MANAGER_START,
} from '../constants/managerTypes'

export const managerDeleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MANAGER_DELETE_PRODUCT_START })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({ type: MANAGER_DELETE_PRODUCT })
  } catch (error) {
    dispatch({
      type: MANAGER_DELETE_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

export const managerNewProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MANAGER_NEW_PRODUCT_START })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { newProduct } = await axios.post(`/api/products`, {}, config)

    dispatch({ type: MANAGER_NEW_PRODUCT, payload: newProduct })
  } catch (error) {
    dispatch({
      type: MANAGER_NEW_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

export const managerUpdateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: MANAGER_UPDATE_PRODUCT_START })
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
      `/api/products/${product._id}`,
      product,
      headers
    )

    dispatch({ type: MANAGER_UPDATE_PRODUCT, payload: updateData })
  } catch (error) {
    dispatch({
      type: MANAGER_UPDATE_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

export const managerGetAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_MANAGER_START })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({ type: GET_ALL_ORDERS_MANAGER, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_MANAGER_ERROR,
      payload: error.response,
    })
  }
}
