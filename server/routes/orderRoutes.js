const router = express.Router()
import express from 'express'
import { getOrder, putOrderProducts } from '../controllers/orders.js'
import { protect } from '../middleware/authentication.js'

//GET /api/account/profile
router.post('/', protect, putOrderProducts)

router.get('/:id', protect, getOrder)

export default router
