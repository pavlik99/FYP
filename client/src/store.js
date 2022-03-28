import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer, productReducer } from './reducers/productReducers'
import { basketReducer } from './reducers/basketReducers'
import { signinReducer } from './reducers/authReducers'

const basketProductsStorage = localStorage.getItem('basketProducts')
  ? JSON.parse(localStorage.getItem('basketProducts'))
  : []

const accountStorage = localStorage.getItem('account')
  ? JSON.parse(localStorage.getItem('account'))
  : null

const initialState = {
  basket: { basketProducts: basketProductsStorage },
  signin: { account: accountStorage },
}
const middleWare = [thunk]
const rootReducer = combineReducers({
  allProducts: productsReducer,
  oneProduct: productReducer,
  basket: basketReducer,
  signin: signinReducer,
})

// const store = createStore(rootReducer,initialState, composeWithDevTools(
//     applyMiddleware(...middleWare)))

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
