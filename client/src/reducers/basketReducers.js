import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../constants/basketTypes'

const initialState = {
  basketProducts: [],
}

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const product = action.payload
      const exist = state.basketProducts.find(
        (x) => x.product === product.product
      )

      if (exist) {
        return {
          ...state,
          basketProducts: state.basketProducts.map((x) =>
            x.product === exist.product ? product : x
          ),
        }
      } else {
        return {
          ...state,
          basketProducts: [...state.basketProducts, product],
        }
      }
    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basketProducts: state.basketProducts.filter(
          (item) => item.product !== action.payload
        ),
      }

    default:
      return state
  }
}
