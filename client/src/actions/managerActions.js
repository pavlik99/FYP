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
  CONFIRM_ORDER_MANAGER_START,
  CONFIRM_ORDER_MANAGER,
  CONFIRM_ORDER_MANAGER_ERROR,
  DISPATCH_ORDER_MANAGER,
  DISPATCH_ORDER_MANAGER_START,
  DISPATCH_ORDER_MANAGER_ERROR,
  DELIVER_ORDER_MANAGER,
  DELIVER_ORDER_MANAGER_ERROR,
  DELIVER_ORDER_MANAGER_START,
  DELIVER_ORDER_MANAGER_RESTART,
  DISPATCH_ORDER_MANAGER_RESTART,
  CONFIRM_ORDER_MANAGER_RESTART,
} from '../constants/managerTypes'

// DELETE A PRODUCT
export const managerDeleteProduct = (id) => async (dispatch, getState) => {
  try {
    // dispatch({ type: MANAGER_DELETE_PRODUCT_START })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config).then((res) =>
      dispatch({
        type: MANAGER_DELETE_PRODUCT,
        payload: res.data,
      })
    )

    // await axios.delete(`/api/products/${id}`, config)

    // dispatch({ type: MANAGER_DELETE_PRODUCT })
  } catch (error) {
    dispatch({
      type: MANAGER_DELETE_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

// CREATE A NEW PRODUCT
export const managerNewProduct = () => async (dispatch, getState) => {
  try {
    // dispatch({ type: MANAGER_NEW_PRODUCT_START })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.post(`/api/products`, {}, config).then((res) =>
      dispatch({
        type: MANAGER_NEW_PRODUCT,
        payload: res.data,
      })
    )

    // const { newProduct } = await axios.post(`/api/products`, {}, config)

    // dispatch({ type: MANAGER_NEW_PRODUCT, payload: newProduct })
  } catch (error) {
    dispatch({
      type: MANAGER_NEW_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

// UPDATE A PRODUCT
export const managerUpdateProduct = (product) => async (dispatch, getState) => {
  try {
    // dispatch({ type: MANAGER_UPDATE_PRODUCT_START })
    const {
      authSignin: { accountData },
    } = getState()

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios
      .put(`/api/products/${product._id}`, product, headers)
      .then((res) =>
        dispatch({
          type: MANAGER_UPDATE_PRODUCT,
          payload: res.data,
        })
      )

    // const { updateData } = await axios.put(
    //   `/api/products/${product._id}`,
    //   product,
    //   headers
    // )

    // dispatch({ type: MANAGER_UPDATE_PRODUCT, payload: updateData })
  } catch (error) {
    dispatch({
      type: MANAGER_UPDATE_PRODUCT_ERROR,
      payload: error.response,
    })
  }
}

// GET ALL ORDERS
export const managerGetAllOrders = () => async (dispatch, getState) => {
  try {
    // dispatch({ type: GET_ALL_ORDERS_MANAGER_START })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.get(`/api/orders`, config).then((res) =>
      dispatch({
        type: GET_ALL_ORDERS_MANAGER,
        payload: res.data,
      })
    )

    // const { data } = await axios.get(`/api/orders`, config)

    // dispatch({ type: GET_ALL_ORDERS_MANAGER, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_MANAGER_ERROR,
      payload: error.response,
    })
  }
}
// MARK ORDER AS CONFIRMED
export const confirmOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch({ type: CONFIRM_ORDER_MANAGER_START })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.put(`/api/orders/${order._id}/confirm`, config).then((res) =>
      dispatch({
        type: CONFIRM_ORDER_MANAGER,
        payload: res.data,
      })
    )

    // const { data } = await axios.put(`/api/orders/${order._id}/confirm`, config)

    // dispatch({ type: CONFIRM_ORDER_MANAGER, payload: data })
  } catch (error) {
    dispatch({
      type: CONFIRM_ORDER_MANAGER_ERROR,
      payload: error.response,
    })
  }
}

// MARK ORDER AS DISPATCHED
export const dispatchOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch({ type: DISPATCH_ORDER_MANAGER_START })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.put(`/api/orders/${order._id}/dispatch`, config).then((res) =>
      dispatch({
        type: DISPATCH_ORDER_MANAGER,
        payload: res.data,
      })
    )

    // const { data } = await axios.put(
    //   `/api/orders/${order._id}/dispatch`,
    //   config
    // )

    // dispatch({ type: DISPATCH_ORDER_MANAGER, payload: data })
  } catch (error) {
    dispatch({
      type: DISPATCH_ORDER_MANAGER_ERROR,
      payload: error.response,
    })
  }
}

// MARK ORDER AS DELIVERED
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch({ type: DELIVER_ORDER_MANAGER_START })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    await axios.put(`/api/orders/${order._id}/deliver`, config).then((res) =>
      dispatch({
        type: DELIVER_ORDER_MANAGER,
        payload: res.data,
      })
    )

    // const { data } = await axios.put(`/api/orders/${order._id}/deliver`, config)

    // dispatch({ type: DELIVER_ORDER_MANAGER, payload: data })
  } catch (error) {
    dispatch({
      type: DELIVER_ORDER_MANAGER_ERROR,
      payload: error.response,
    })
  }
}
