import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_DELIVERY_ADDRESS,
} from '../constants/basketTypes'

const initialState = {
  basketItems: [],
  deliveryAddress: {},
}

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const product = action.payload
      const exist = state.basketItems.find((x) => x.product === product.product)

      if (exist) {
        return {
          addedtoBasket: true,
          ...state,
          basketItems: state.basketItems.map((x) =>
            x.product === exist.product ? product : x
          ),
        }
      } else {
        return {
          ...state,
          basketItems: [...state.basketItems, product],
        }
      }
    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basketItems: state.basketItems.filter(
          (x) => x.product !== action.payload
        ),
      }
    case SET_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
        addedAddress: true,
      }

    default:
      return state
  }
}
