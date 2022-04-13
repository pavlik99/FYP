import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  // CREATE_ORDER_START,
} from '../constants/orders'

const initialState = {}

export const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    // case CREATE_ORDER_START:
    //   return {
    //     loading: true,
    //     created: false,
    //   }

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

const initialStateGetOrder = {
  productItems: [],
  deliveryAddress: {},
  loading: true,
}
export const getOrderReducer = (state = initialStateGetOrder, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        order: action.payload,
        loading: false,
        recieved: true,
      }

    case GET_ORDER_ERROR:
      return { loading: false, error: action.payload, recieved: false }

    default:
      return state
  }
}
