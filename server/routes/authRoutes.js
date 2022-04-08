const router = express.Router()
import express from 'express'
import {
  signin,
  getProfile,
  signup,
  updateProfile,
} from '../controllers/authControllers.js'
import { protect } from '../middleware/authentication.js'

// POST /api/account/signin
router.post('/signin', signin)

//POST /api/account/signup
router.post('/signup', signup) // make it /signup

//GET /api/account/profile
router.get('/profile', protect, getProfile)

// PUT /api/account/profile
router.put('/profile', protect, updateProfile)

export default router
