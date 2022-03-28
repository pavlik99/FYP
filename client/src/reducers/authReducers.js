import {
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNOUT,
} from '../constants/authTypes'

const initialState = {}

export const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN_START:
      return {
        loading: true,
        success: false,
      }

    case AUTH_SIGNIN_SUCCESS:
      return {
        account: action.payload,
        loading: false,
        success: true,
      }

    case AUTH_SIGNIN_ERROR:
      return { loading: false, error: action.payload, success: false }

    case AUTH_SIGNOUT:
      return {}

    default:
      return state
  }
}
