import axios from 'axios'
import {
  MANAGER_DELETE_PRODUCT,
  MANAGER_DELETE_PRODUCT_START,
  MANAGER_DELETE_PRODUCT_ERROR,
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
      payload: error.response && error.response.data.message,
    })
  }
}
