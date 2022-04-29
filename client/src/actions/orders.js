import axios from 'axios'
import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  CREATE_ORDER_START,
  GET_ORDER_START,
  PAY_ORDER,
  PAY_ORDER_ERROR,
  PAY_ORDER_START,
  GET_USER_ORDERS,
  GET_USER_ORDERS_ERROR,
  GET_USER_ORDERS_START,
} from '../constants/orders'
import {
  ACCOUNT_INFO_ERROR,
  ACCOUNT_INFO_START,
  ACCOUNT_INFO_SUCCESS,
  ACCOUNT_INFO_CLEAR,
} from '../constants/authTypes'

export const orderCreate = (order) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: CREATE_ORDER_START,
    // })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.post(`/api/orders`, order, config).then((res) =>
      dispatch({
        type: CREATE_ORDER,
        payload: res.data,
      })
    )
    // const { data } = await axios.post(`/api/orders`, order, config)

    // dispatch({
    //   type: CREATE_ORDER,
    //   payload: data,
    // })
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ERROR, payload: error.response })
  }
}

// GET ACCOUT INFO FOR ORDER
export const getAccountInfoOrder = (id) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: ACCOUNT_INFO_START,
    // })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/allorders/${id}`, config)
    dispatch({
      type: ACCOUNT_INFO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: ACCOUNT_INFO_ERROR, payload: error.response })
  }
}
// GET A SPECIFIC USER ORDER
export const getOrderInfo = (id) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: GET_ORDER_START,
    // })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.get(`/api/orders/${id}`, config).then((res) =>
      dispatch({
        type: GET_ORDER,
        payload: res.data,
      })
    )

    // const { data } = await axios.get(`/api/orders/${id}`, config)

    // dispatch({
    //   type: GET_ORDER,
    //   payload: data,
    // })
  } catch (error) {
    dispatch({ type: GET_ORDER_ERROR, payload: error.response })
  }
}
// GET ALL USER ORDERS
export const getOrdersAction = () => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: GET_USER_ORDERS_START,
    // })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.get('/api/orders/allorders', config).then((res) =>
      dispatch({
        type: GET_USER_ORDERS,
        payload: res.data,
      })
    )

    // const { data } = await axios.get('/api/orders/allorders', config)

    // dispatch({
    //   type: GET_USER_ORDERS,
    //   payload: data,
    // })
  } catch (error) {
    dispatch({ type: GET_USER_ORDERS_ERROR, payload: error.response })
  }
}

//STRIPE CHECKOUT
export const handleToken = (token, orderId) => async (dispatch, getState) => {
  // dispatch({
  //   type: PAY_ORDER_START,
  // })
  const {
    authSignin: { accountData },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accountData.token}`,
    },
  }
  const res = await axios.post(`/api/orders/${orderId}/stripe`, token, config)
  dispatch({
    type: PAY_ORDER,
    payload: res.data,
  })
}
