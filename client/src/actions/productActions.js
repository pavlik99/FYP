import {
  FETCH_ALL_ERROR,
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  RATE_PRODUCT_ERROR,
  RATE_PRODUCT_REQUEST,
  RATE_PRODUCT_RESTART,
  RATE_PRODUCT_SUCCESS,
} from '../constants/productTypes'
import axios from 'axios'

// FETCH ALL PRODUCTS
export const fetchProducts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_ALL_REQUEST })

      axios.get(`/api/products?keyword=${keyword}`).then((res) =>
        dispatch({
          type: FETCH_ALL_SUCCESS,
          payload: res.data,
        })
      )
      // const { data } = await axios.get(`/api/products?keyword=${keyword}`)

      // dispatch({ type: FETCH_ALL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_ALL_ERROR, payload: error.response })
    }
  }

// FETCH ONE SPECIFIC PRODUCT
export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

//RATE PRODUCT
export const rateProductAction = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: RATE_PRODUCT_REQUEST })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    // const { data } = await axios.post(
    //   `/api/products/${id}/reviews`,
    //   review,
    //   config
    // )

    await axios.post(`/api/products/${id}/reviews`, review, config)

    dispatch({ type: RATE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: RATE_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}
