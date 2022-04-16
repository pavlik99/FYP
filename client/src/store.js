import thunk from 'redux-thunk'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//IMPORTING REDUCERS
import { productsReducer, productReducer } from './reducers/productReducers'
import {
  createOrderReducer,
  getOrderReducer,
  payOrderReducer,
  getOrdersReducer,
} from './reducers/orderReducer'
import { basketReducer } from './reducers/basketReducers'
import {
  signinReducer,
  signupReducer,
  accountInfoReducer,
  accountUpdateReducer,
  googleReducer,
} from './reducers/authReducers'

const basketProductsStorage = localStorage.getItem('basketItems')
  ? JSON.parse(localStorage.getItem('basketItems'))
  : []

const accountStorage = localStorage.getItem('accountData')
  ? JSON.parse(localStorage.getItem('accountData'))
  : null

const deiveryAddressStorage = localStorage.getItem('deliveryAddress')
  ? JSON.parse(localStorage.getItem('deliveryAddress'))
  : {}

const initialState = {
  basket: {
    basketItems: basketProductsStorage,
    deliveryAdress: deiveryAddressStorage,
  },
  authSignin: { accountData: accountStorage },
}
const middleWare = [thunk]
const rootReducer = combineReducers({
  allProducts: productsReducer,
  oneProduct: productReducer,
  basket: basketReducer,
  authSignin: signinReducer,
  authSignup: signupReducer,
  accountInfo: accountInfoReducer,
  updateInfo: accountUpdateReducer,
  googleSignin: googleReducer,
  createOrder: createOrderReducer,
  getOrder: getOrderReducer,
  getOrders: getOrdersReducer,
  payOrder: payOrderReducer,
})

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleWare),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

export default store
