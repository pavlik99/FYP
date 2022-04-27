const router = express.Router()
import express from 'express'
import {
  getOrder,
  putOrderProducts,
  stripePayment,
  getOrders,
  getAllOrdersManager,
  confirmOrder,
  dispatchOrder,
  deliverOrder,
  getProfileOrder,
} from '../controllers/orders.js'
import { protect } from '../middleware/authentication.js'

//GET /api/orders/allorders
router.get('/allorders', protect, getOrders)

//GET /api/account/profile
router.get('/allorders/profile', protect, getProfileOrder)

//POST /api/orders
router.post('/', protect, putOrderProducts)

//GET /api/orders
router.get('/', protect, getAllOrdersManager)

//GET /api/orders/:id
router.get('/:id', protect, getOrder)

//POST /api/orders/:id/stripe
router.post('/:id/stripe', protect, stripePayment)

//POST /api/orders/:id/confirm
router.put('/:id/confirm', confirmOrder)

//POST /api/orders/:id/dispatch
router.put('/:id/dispatch', dispatchOrder)

//POST /api/orders/:id/deliver
router.put('/:id/deliver', deliverOrder)

export default router
