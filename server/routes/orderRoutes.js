const router = express.Router()
import express from 'express'
import { putOrderProducts } from '../controllers/orders.js'
import { protect } from '../middleware/authentication.js'

//GET /api/account/profile
router.post('/', protect, putOrderProducts)

export default router
