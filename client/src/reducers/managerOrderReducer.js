import {
  GET_ALL_ORDERS_MANAGER,
  GET_ALL_ORDERS_MANAGER_START,
  GET_ALL_ORDERS_MANAGER_ERROR,
} from '../constants/managerTypes'

// const originalState = {
//   orders: [],
// }
// GET ALL PRODUCTS
export const managerOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_MANAGER_START:
      return {
        loading: true,
        received: false,
      }

    case GET_ALL_ORDERS_MANAGER:
      return {
        orders: action.payload,
        loading: false,
        received: true,
      }

    case GET_ALL_ORDERS_MANAGER_ERROR:
      return {
        loading: false,
        error: action.payload,
        received: false,
      }

    default:
      return state
  }
}
