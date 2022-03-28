const router = express.Router()
import express from 'express'
import { signin, profile, signup } from '../controllers/authControllers.js'
import { protect } from '../middleware/authentication.js'

// POST /api/account/signin
router.post('/signin', signin)

//POST /api/accounts
router.post('/', signup)
// GET /api/account/profile
router.get('/profile', protect, profile)

// router.post('/signup')

// router.get('/user')

export default router
