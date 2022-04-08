import {
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNOUT,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_ERROR,
  ACCOUNT_INFO_ERROR,
  ACCOUNT_INFO_START,
  ACCOUNT_INFO_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_RESTART,
  UPDATE_ACCOUNT_START,
  UPDATE_ACCOUNT_SUCCESS,
  GOOGLE_AUTH_ERROR,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_SIGNOUT,
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
        accountData: action.payload,
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

export const googleReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_AUTH_SUCCESS:
      return {
        googleData: action.payload,
        loading: false,
        errors: null,
        gSingin: true,
      }
    case GOOGLE_AUTH_ERROR:
      return { loading: false, error: action.payload }

    case GOOGLE_SIGNOUT:
      return {}

    default:
      return state
  }
}

export const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_SIGNUP_START:
      return {
        loading: true,
        success: false,
      }

    case AUTH_SIGNUP_SUCCESS:
      return {
        accountData: action.payload,
        loading: false,
        success: true,
      }

    case AUTH_SIGNUP_ERROR:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const accountInfoReducer = (state = { account: {} }, action) => {
  switch (action.type) {
    case ACCOUNT_INFO_START:
      return {
        loading: true,
        success: false,
        ...state,
      }

    case ACCOUNT_INFO_SUCCESS:
      return {
        account: action.payload,
        loading: false,
        success: true,
      }

    case ACCOUNT_INFO_ERROR:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

const updateInitialState = {}
export const accountUpdateReducer = (state = updateInitialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_START:
      return {
        loading: true,
        success: false,
      }

    case UPDATE_ACCOUNT_SUCCESS:
      return {
        accountData: action.payload,
        loading: false,
        success: true,
      }

    case UPDATE_ACCOUNT_ERROR:
      return { loading: false, error: action.payload, success: false }

    case UPDATE_ACCOUNT_RESTART:
      return {}
    default:
      return state
  }
}
