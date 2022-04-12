import axios from 'axios'
import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_START,
} from '../constants/orders'

export const orderCreate = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_START,
    })

    const {
      authSignin: { accountData },
    } = getState()

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountData.token}`,
      },
    }

    const { orderData } = await axios.post(`/api/orders`, order, headers)

    dispatch({
      type: CREATE_ORDER,
      payload: orderData,
    })
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ERROR, payload: error.response })
  }
}
