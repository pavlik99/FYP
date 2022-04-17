import {
  MANAGER_DELETE_PRODUCT,
  MANAGER_DELETE_PRODUCT_START,
  MANAGER_DELETE_PRODUCT_ERROR,
} from '../constants/managerTypes'

const initialState = {}
export const managerProductDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case MANAGER_DELETE_PRODUCT_START:
      return {
        ...state,
        loading: true,
        deleted: false,
      }

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
