import axios from 'axios'
import {
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNOUT,
} from '../constants/authTypes'

// AUTH LOGIN
export const signin = (email, password) => async (dispatch) => {
  // try {
  //   dispatch({
  //     type: AUTH_SIGNIN_START,
  //   })
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }

  //try that one
  try {
    dispatch({
      type: AUTH_SIGNIN_START,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ email, password })

    const { data } = axios
      .post('/api/account/signin', body, config)
      .then((res) =>
        dispatch({
          type: AUTH_SIGNIN_SUCCESS,
          payload: res.data,
        })
      )
    localStorage.setItem('account', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: AUTH_SIGNIN_ERROR, payload: error.response })
  }
  // end of try

  //   const { data } = await axios.post(
  //     '/api/account/signin',
  //     { email, password },
  //     config
  //   )
  //   dispatch({
  //     type: AUTH_SIGNIN_SUCCESS,
  //     payload: data,
  //   })

  //   localStorage.setItem('account', JSON.stringify(data))
  // } catch (error) {
  //   dispatch({ type: AUTH_SIGNIN_ERROR, payload: error.response })
  // }
}

//AUTH SIGNOUT
export const signout = () => (dispatch) => {
  localStorage.removeItem('account')
  dispatch({
    type: AUTH_SIGNOUT,
  })
}
// export const signout = () => {
//   localStorage.removeItem('account')
//   return {
//     type: AUTH_SIGNOUT,
//   }
// }
