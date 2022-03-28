import axios from 'axios'

const url = '/api/products/'

export const fetchProducts = () => axios.get(url)
export const fetchProduct = (id) => axios.get(`${url}/${id}`)
export const createProduct = (newProduct) => axios.post(url, newProduct)
export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${url}/${id}`, updatedProduct)
export const deleteProduct = (id) => axios.delete(`${url}/${id}`)
