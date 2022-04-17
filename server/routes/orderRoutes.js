const router = express.Router()
import express from 'express'
import {
  getOrder,
  putOrderProducts,
  payOrder,
  stripePayment,
  getOrders,
} from '../controllers/orders.js'
import { getProfile } from '../controllers/authControllers.js'
import { protect } from '../middleware/authentication.js'

//GET /api/orders/allOrders
router.get('/allOrders', protect, getOrders)

//POST /api/orders
router.post('/', protect, putOrderProducts)
//GET /api/orders/:id
router.get('/:id', protect, getOrder)

//PUT /api/orders/:id/payment DELETE
router.put('/:id/payment', protect, payOrder)
//POST /api/orders/:id/stripe
router.post('/:id/stripe', protect, stripePayment)

export default router
