import express from 'express'
import {
  fetchAllProducts,
  fetchProduct,
  destroyProduct,
  updateProduct,
  newProduct,
} from '../controllers/productControllers.js'
const router = express.Router()
import { manager, protect } from '../middleware/authentication.js'

// GET /api/products
router.get('/', fetchAllProducts)

//GET /api/products/:id
router.get('/:id', fetchProduct)

// MANAGER ROUTES
// DELETE A PRODUCT
router.delete('/:id', protect, manager, destroyProduct)
// CREATE A PRODUCT
router.post('/', protect, manager, newProduct)
// UPDATE A PRODUCT
router.put('/:id', protect, manager, updateProduct)
export default router
