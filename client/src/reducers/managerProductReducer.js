import {
  MANAGER_DELETE_PRODUCT,
  MANAGER_DELETE_PRODUCT_START,
  MANAGER_DELETE_PRODUCT_ERROR,
  MANAGER_NEW_PRODUCT,
  MANAGER_NEW_PRODUCT_START,
  MANAGER_NEW_PRODUCT_ERROR,
  MANAGER_NEW_PRODUCT_RESTART,
  MANAGER_UPDATE_PRODUCT,
  MANAGER_UPDATE_PRODUCT_START,
  MANAGER_UPDATE_PRODUCT_ERROR,
  MANAGER_UPDATE_PRODUCT_RESTART,
} from '../constants/managerTypes'

const initialState = {}
export const managerProductDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    // case MANAGER_DELETE_PRODUCT_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     deleted: false,
    //   }

    case MANAGER_DELETE_PRODUCT:
      return {
        loading: false,
        deleted: true,
      }

    case MANAGER_DELETE_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload, deleted: false }

    default:
      return state
  }
}

export const managerProductNewReducer = (state = {}, action) => {
  switch (action.type) {
    // case MANAGER_NEW_PRODUCT_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     created: false,
    //   }

    case MANAGER_NEW_PRODUCT:
      return {
        loading: false,
        created: true,
        product: action.payload,
      }

    case MANAGER_NEW_PRODUCT_RESTART:
      return {}

    case MANAGER_NEW_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload, created: false }

    default:
      return state
  }
}

const updateInitialState = { product: {} }
export const managerProductUpdateReducer = (
  state = updateInitialState,
  action
) => {
  switch (action.type) {
    // case MANAGER_UPDATE_PRODUCT_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     updated: false,
    //   }

    case MANAGER_UPDATE_PRODUCT:
      return {
        loading: false,
        updated: true,
        product: action.payload,
      }

    case MANAGER_UPDATE_PRODUCT_RESTART:
      return { product: {} }

    case MANAGER_UPDATE_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload, updated: false }

    default:
      return state
  }
}
