import { FETCH_ALL_ERROR, FETCH_ALL_REQUEST, FETCH_ALL_SUCCESS,
FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_ERROR } from '../constants/productTypes'
import axios from 'axios'

// FETCH ALL PRODUCTS
export const fetchProducts = () => async (dispatch) => {

    try{
        dispatch({ type: FETCH_ALL_REQUEST})

        const {data} = await axios.get('/api/products')

        dispatch({type: FETCH_ALL_SUCCESS,
            payload: data 
        })

    } catch (error) {
        dispatch({ type: FETCH_ALL_ERROR,
       payload: error.response
    })
    }
}

// FETCH ONE SPECIFIC PRODUCT
export const fetchProduct = (id) => async (dispatch) => {

    try{
        dispatch({ type: FETCH_PRODUCT_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({type: FETCH_PRODUCT_SUCCESS,
            payload: data 
        })

    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_ERROR,
       payload: error.response && error.response.data.message
    })
    }
}