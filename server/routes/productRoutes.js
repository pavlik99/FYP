import express from 'express'
import {
  fetchAllProducts,
  fetchProduct,
} from '../controllers/productControllers.js'
const router = express.Router()

// GET /api/products
router.get('/', fetchAllProducts)
//router.route('/').get(fetchAllProducts) use this if above one does not work

//GET /api/products/:id
router.get('/:id', fetchProduct)

export default router
