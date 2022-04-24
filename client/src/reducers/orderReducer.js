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
  PAY_RESET,
  GET_USER_ORDERS,
  GET_USER_ORDERS_ERROR,
  GET_USER_ORDERS_START,
  GET_USER_ORDERS_CLEAR,
} from '../constants/orders'
import {
  ACCOUNT_INFO_ERROR,
  ACCOUNT_INFO_START,
  ACCOUNT_INFO_SUCCESS,
  ACCOUNT_INFO_CLEAR,
} from '../constants/authTypes'

// const initialState = {}

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_START:
      return {
        loading: true,
        created: false,
      }

    case CREATE_ORDER:
      return {
        order: action.payload,
        loading: false,
        created: true,
      }

    case CREATE_ORDER_ERROR:
      return { loading: false, error: action.payload, created: false }

    default:
      return state
  }
}

// const initialStateGetOrder = {
//   productItems: [],
//   deliveryAddress: {},
//   loading: true,
// }

export const getOrderReducer = (
  state = { loading: true, productItems: [], deliveryAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case GET_ORDER:
      return {
        loading: false,
        order: action.payload,
        success: true,
      }
    case GET_ORDER_ERROR:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }
    default:
      return state
  }
}

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_START:
      return {
        loading: true,
      }
    case PAY_ORDER:
      return {
        loading: false,
        successPay: true,
      }
    case PAY_ORDER_ERROR:
      return {
        loading: false,
        error: action.payload,
        successPay: false,
      }
    case PAY_RESET:
      return {}
    default:
      return state
  }
}

export const accountInfoOrderReducer = (state = { account: {} }, action) => {
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

    case ACCOUNT_INFO_CLEAR:
      return { account: {} }
    default:
      return state
  }
}

export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_START:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case GET_USER_ORDERS:
      return {
        loading: false,
        orders: action.payload,
        success: true,
      }
    case GET_USER_ORDERS_ERROR:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }
    case GET_USER_ORDERS_CLEAR:
      return {
        orders: [],
      }
    default:
      return state
  }
}
