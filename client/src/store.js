import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer, productReducer } from './reducers/productReducers'
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

const initialState = {
  basket: { basketItems: basketProductsStorage },
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
