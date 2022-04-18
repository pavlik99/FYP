const router = express.Router()
import express from 'express'
import {
  getOrder,
  putOrderProducts,
  payOrder,
  stripePayment,
  getOrders,
  getAllOrdersManager,
} from '../controllers/orders.js'
import { protect, manager } from '../middleware/authentication.js'

//GET /api/orders/allOrders
router.get('/allOrders', protect, getOrders)

//POST /api/orders
router.post('/', protect, putOrderProducts)

//GET /api/orders
router.get('/', protect, getAllOrdersManager)

//GET /api/orders/:id
router.get('/:id', protect, getOrder)

//PUT /api/orders/:id/payment DELETE
router.put('/:id/payment', protect, payOrder)

//POST /api/orders/:id/stripe
router.post('/:id/stripe', protect, stripePayment)

export default router
