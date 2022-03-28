import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const protect = expressAsyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401).json({ msg: 'Unauthorized token' })
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'User is not authorized' })
  }

  //   const authorization = req.headers['authorization']
  //   if (!(authorization && authorization.toLowerCase().startsWith('bearer')))
  //     throw createError(401, 'Not authorized')
})

export { protect }
