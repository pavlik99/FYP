import axios from 'axios'
import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_DELIVERY_ADDRESS,
  SET_PAYMENT,
} from '../constants/basketTypes'
import * as crud from '../crud/index.js'

export const addProduct = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  // const { data } = await crud.fetchProduct(id)
  // try {
  dispatch({
    type: ADD_TO_BASKET,
    payload: {
      product: data._id,
      title: data.title,
      productImage: data.productImage, //image:
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  })

  localStorage.setItem(
    'basketItems',
    JSON.stringify(getState().basket.basketItems)
  )

  // } catch (error) {
  //   console.log(error.message)
  // }
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

export const setDeliveryAdress = (data) => (dispatch, getState) => {
  try {
    dispatch({
      type: SET_DELIVERY_ADDRESS,
      payload: data,
    })

    localStorage.setItem('deliveryAddress', JSON.stringify(data))
  } catch (error) {
    console.log(error.message)
  }
}

export const setPay = (data) => (dispatch, getState) => {
  try {
    dispatch({
      type: SET_PAYMENT,
      payload: data,
    })

    localStorage.setItem('payment', JSON.stringify(data))
  } catch (error) {
    console.log(error.message)
  }
}
