//import axios from 'axios'
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../constants/basketTypes'
import * as crud from '../crud/index.js'

export const addProduct = (id, quantity) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/products/${id}`)

  try {
    const { data } = await crud.fetchProduct(id) //
    dispatch({
      type: ADD_TO_BASKET,
      payload: {
        product: data._id,
        title: data.title,
        image: data.productImage,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    })

    localStorage.saveItem(
      'basketProducts',
      JSON.stringify(getState().basket.basketItems)
    )
  } catch (error) {
    console.log(error.message)
  }
  // try again kater
  // axios.post('/api/basket', { id, quantity }).then((res) =>
  //   dispatch({
  //     type: ADD_TO_BASKET,
  //     payload: {
  //       product: res.data._id,
  //       name: res.data.title,
  //       image: res.data.productImage,
  //       price: res.data.price,
  //       countInStock: res.data.countInStock,
  //     },
  //   })
  // )
  //end of try
}
export const removeProduct = (id) => (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FROM_BASKET,
      payload: id,
    })

    localStorage.setItem(
      'basketProducts',
      JSON.stringify(getState().basket.basketItems)
    )
  } catch (error) {
    console.log(error.message)
  }
}
