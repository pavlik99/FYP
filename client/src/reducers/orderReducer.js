import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_START,
} from '../constants/orders'

const initialState = {}

export const createOrderReducer = (state = initialState, action) => {
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
