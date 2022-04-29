import {
  FETCH_ALL_ERROR,
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  RATE_PRODUCT_ERROR,
  RATE_PRODUCT_REQUEST,
  RATE_PRODUCT_RESTART,
  RATE_PRODUCT_SUCCESS,
} from '../constants/productTypes'

const originalState = {
  products: [],
  loading: false,
}

// GET ALL PRODUCTS
export const productsReducer = (state = originalState, action) => {
  switch (action.type) {
    // case FETCH_ALL_REQUEST:
    //   return {
    //     products: [],
    //     loading: true,
    //     success: false,
    //   }

    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        success: true,
      }

    case FETCH_ALL_ERROR:
      return { ...state, loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

const initialState = {
  product: { reviews: [] },
  loading: false,
}

// GET ONE SPECIFIC PRODUCT
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_PRODUCT_REQUEST:
    //   return {
    //     loading: true,
    //     ...state,
    //     success: false,
    //   }

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        success: true,
      }

    case FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload, success: false }

    default:
      return state
  }
}
// RATE A PRODUCT
export const rateProductReducer = (state = {}, action) => {
  switch (action.type) {
    // case RATE_PRODUCT_REQUEST:
    //   return {
    //     loading: true,
    //     ...state,
    //     rated: false,
    //   }

    case RATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        rated: true,
      }

    case RATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        rated: false,
      }

    case RATE_PRODUCT_RESTART:
      return {}

    default:
      return state
  }
}
