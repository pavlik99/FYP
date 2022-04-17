import axios from 'axios'
import {
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNOUT,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  ACCOUNT_INFO_ERROR,
  ACCOUNT_INFO_START,
  ACCOUNT_INFO_SUCCESS,
  ACCOUNT_INFO_CLEAR,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_RESTART,
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_SUCCESS,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_ERROR,
  GOOGLE_SIGNOUT,
} from '../constants/authTypes'
import { GET_USER_ORDERS_CLEAR } from '../constants/orders'
//AUTH SIGNUP
export const signup =
  (forename, surname, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: AUTH_SIGNUP_START,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/account/signup',
        { forename, surname, email, password },
        config
      )
      dispatch({
        type: AUTH_SIGNUP_SUCCESS,
        payload: data,
      })

      dispatch({
        type: AUTH_SIGNIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('accountData', JSON.stringify(data))
    } catch (error) {
      dispatch({ type: AUTH_SIGNIN_ERROR, payload: error.response })
    }
  }

//AUTH GOOGLE SIGNUP
export const googleSignin = (token, result) => async (dispatch) => {
  try {
    // const result = res?.profileObj
    // const token = res?.tokenId
    const data = { result, token }
    dispatch({
      type: GOOGLE_AUTH_SUCCESS,
      payload: data,
    })

    localStorage.setItem('accountData', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GOOGLE_AUTH_ERROR, payload: error.response })
  }
}

//AUTH GOOGLE SIGNOUT
export const googleSignout = () => (dispatch) => {
  localStorage.removeItem('accountData')
  dispatch({
    type: GOOGLE_SIGNOUT,
  })
}

// AUTH LOGIN
export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_SIGNIN_START,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/account/signin',
      { email, password },
      config
    )
    dispatch({
      type: AUTH_SIGNIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('accountData', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: AUTH_SIGNIN_ERROR, payload: error.response })
  }

  //try that one
  // try {
  //   dispatch({
  //     type: AUTH_SIGNIN_START,
  //   })

  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  //   const body = JSON.stringify({ email, password })

  //   const { data } = axios
  //     .post('/api/account/signin', body, config)
  //     .then((res) =>
  //       dispatch({
  //         type: AUTH_SIGNIN_SUCCESS,
  //         payload: res.data,
  //       })
  //     )
  //   localStorage.setItem('accountData', JSON.stringify(data))
  // } catch (error) {
  //   dispatch({ type: AUTH_SIGNIN_ERROR, payload: error.response })
  // }
  // end of try
}

//AUTH SIGNOUT
export const signout = () => (dispatch) => {
  localStorage.removeItem('accountData')
  dispatch({
    type: AUTH_SIGNOUT,
  })
  dispatch({
    type: GET_USER_ORDERS_CLEAR,
  })
  dispatch({
    type: ACCOUNT_INFO_CLEAR,
  })
}
// export const signout = () => {
//   localStorage.removeItem('accountData')
//   return {
//     type: AUTH_SIGNOUT,
//   }
// }

export const getAccountInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_INFO_START,
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

    const { data } = await axios.get(`/api/account/${id}`, config)
    dispatch({
      type: ACCOUNT_INFO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({ type: ACCOUNT_INFO_ERROR, payload: error.response })
  }
}

export const updateAccountInfo = (account) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_ACCOUNT_START,
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

    const { data } = await axios.put(`/api/account/profile`, account, config)

    dispatch({
      type: UPDATE_ACCOUNT_SUCCESS,
      payload: data,
    })
    dispatch({
      type: AUTH_SIGNIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('accountData', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: UPDATE_ACCOUNT_ERROR, payload: error.response })
  }
}
