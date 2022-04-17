import express from 'express'
import {
  fetchAllProducts,
  fetchProduct,
  destroyProduct,
} from '../controllers/productControllers.js'
const router = express.Router()
import { manager, protect } from '../middleware/authentication.js'

// GET /api/products
router.get('/', fetchAllProducts)
//router.route('/').get(fetchAllProducts) use this if above one does not work

//GET /api/products/:id
router.get('/:id', fetchProduct)

// MANAGER ROUTES
router.delete('/:id', protect, manager, destroyProduct)

export default router
