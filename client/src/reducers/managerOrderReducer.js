import {
  GET_ALL_ORDERS_MANAGER,
  GET_ALL_ORDERS_MANAGER_START,
  GET_ALL_ORDERS_MANAGER_ERROR,
  CONFIRM_ORDER_MANAGER_START,
  CONFIRM_ORDER_MANAGER,
  CONFIRM_ORDER_MANAGER_ERROR,
  DISPATCH_ORDER_MANAGER,
  DISPATCH_ORDER_MANAGER_START,
  DISPATCH_ORDER_MANAGER_ERROR,
  DELIVER_ORDER_MANAGER,
  DELIVER_ORDER_MANAGER_ERROR,
  DELIVER_ORDER_MANAGER_START,
  DELIVER_ORDER_MANAGER_RESTART,
  DISPATCH_ORDER_MANAGER_RESTART,
  CONFIRM_ORDER_MANAGER_RESTART,
} from '../constants/managerTypes'

// const originalState = {
//   orders: [],
// }
// GET ALL ORDERS
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

// MARK ORDER AS CONFIRMED
export const confirmOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_ORDER_MANAGER_START:
      return {
        loading: true,
        confirmed: false,
      }

    case CONFIRM_ORDER_MANAGER:
      return {
        loading: false,
        confirmed: true,
      }

    case CONFIRM_ORDER_MANAGER_ERROR:
      return {
        loading: false,
        error: action.payload,
        confirmed: false,
      }
    case CONFIRM_ORDER_MANAGER_RESTART:
      return {}

    default:
      return state
  }
}

// MARK ORDER AS DIPATCHED
export const dispatchOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DISPATCH_ORDER_MANAGER_START:
      return {
        loading: true,
        dispatched: false,
      }

    case DISPATCH_ORDER_MANAGER:
      return {
        loading: false,
        dispatched: true,
      }

    case DISPATCH_ORDER_MANAGER_ERROR:
      return {
        loading: false,
        error: action.payload,
        dispatched: false,
      }
    case DISPATCH_ORDER_MANAGER_RESTART:
      return {}

    default:
      return state
  }
}
//aaa
// MARK ORDER AS DELIVERED
export const deliverOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVER_ORDER_MANAGER_START:
      return {
        loading: true,
        delivered: false,
      }

    case DELIVER_ORDER_MANAGER:
      return {
        loading: false,
        delivered: true,
      }

    case DELIVER_ORDER_MANAGER_ERROR:
      return {
        loading: false,
        error: action.payload,
        delivered: false,
      }
    case DELIVER_ORDER_MANAGER_RESTART:
      return {}

    default:
      return state
  }
}
