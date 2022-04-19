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

export const orderCreate = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_START,
    })

    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: CREATE_ORDER,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ERROR, payload: error.response })
  }
}
// GET A SPECIFIC USER ORDER
export const getOrderInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_START,
    })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: GET_ORDER,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: GET_ORDER_ERROR, payload: error.response })
  }
}
// GET ALL USER ORDERS
export const getOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_ORDERS_START,
    })
    const {
      authSignin: { accountData },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { data } = await axios.get('/api/orders/allOrders', config)

    dispatch({
      type: GET_USER_ORDERS,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: GET_USER_ORDERS_ERROR, payload: error.response })
  }
}
//DELTE
// export const payOrder = (orderId) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PAY_ORDER_START,
//     })
//     const {
//       authSignin: { accountData },
//     } = getState()

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accountData.token}`,
//       },
//     }

//     const { data } = await axios.put(`/api/orders/${orderId}/payment`, config)

//     dispatch({
//       type: PAY_ORDER,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({ type: PAY_ORDER_ERROR, payload: error.response })
//   }
// }
//END DELETE
export const handleToken = (token, orderId) => async (dispatch, getState) => {
  dispatch({
    type: PAY_ORDER_START,
  })
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

//ORIGINAL DELETE
// export const payOrder =
//   (orderId, paymentResult) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: PAY_ORDER_START,
//       })
//       const {
//         authSignin: { accountData },
//       } = getState()

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accountData.token}`,
//         },
//       }

//       const { data } = await axios.put(
//         `/api/orders/${orderId}/payment`,
//         paymentResult,
//         config
//       )

//       dispatch({
//         type: PAY_ORDER,
//         payload: data,
//       })
//     } catch (error) {
//       dispatch({ type: PAY_ORDER_ERROR, payload: error.response })
//     }
//   }
