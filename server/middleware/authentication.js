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
      const isCustomAuth = token.length < 500
      let decoded

      if (token && isCustomAuth) {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        //req.userId = decoded?.id
        req.user = await User.findById(decoded.id).select('-password')
      } else {
        decoded = jwt.decode(token)
        // req.userId = decoded.sub
        req.user = await User.findById(sub)
      }

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

const manager = (req, res, next) => {
  if (req.user && req.user.isManager) {
    next()
  } else {
    throw new Error('This page can be accessed just by managers!')
  }
}

export { protect, manager }
