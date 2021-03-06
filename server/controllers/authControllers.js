import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// POST /api/account/signin
const signin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ msg: 'Missing email or password' })
  }

  User.findOne({ email: email }).then((account) => {
    if (!account) {
      return res
        .status(400)
        .json({ msg: 'Account with this email does not exist' })
    } else {
      bcrypt.compare(password, account.password).then((isPassword) => {
        if (!isPassword) {
          res.status(401).json({ msg: 'Invalid password' })
        } else {
          res.json({
            _id: account._id,
            userImage: account.userImage,
            forename: account.forename,
            surname: account.surname,
            email: account.email,
            isManager: account.isManager,
            token: jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
              expiresIn: '60d',
            }),
          })
        }
      })
    }
  })
})

//GET /api/account/signup
const signup = expressAsyncHandler(async (req, res) => {
  const { forename, surname, email, password } = req.body

  if (!surname || !forename || !password || !email) {
    res.status(400).json({ msg: 'Please fill name' })
  }

  if (!password) {
    res.status(400).json({ msg: 'Missing password' })
  }
  if (!email) {
    res.status(400).json({ msg: 'Missing email' })
  }

  await User.findOne({ email: email }).then((accountExists) => {
    if (accountExists) {
      res.status(400).json({ msg: 'An account with this email already exists' })
    }
  })

  const account = await User.create({
    userImage: '/images/defaultProduct.jpg',
    forename,
    surname,
    email,
    password,
  })

  // Hashing the passwotrd with bcypt when creating a new account
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err
      account.password = hash
      account.save().then((account) => {
        jwt.sign(
          { id: account._id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err
            res.json({
              _id: account._id,
              userImage: account.userImage,
              forename: account.forename,
              surname: account.surname,
              email: account.email,
              isManager: account.isManager,
              token: jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
                expiresIn: '60d',
              }),
            })
          }
        )
      })
    })
  })
})

// GET /api/account/profile
const getProfile = expressAsyncHandler(async (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then((account) => {
      if (!account) {
        res.status(400).json({ msg: 'Unable to find user' })
      } else {
        res.json({
          _id: account._id,
          userImage: account.userImage,
          forename: account.forename,
          surname: account.surname,
          email: account.email,
          isManager: account.isManager,
        })
      }
    })
})

// UPDATE USER PROFILE
// PUT /api/account/profile
const updateProfile = expressAsyncHandler(async (req, res) => {
  const { forename, surname, email, password, userImage } = req.body
  const account = await User.findById(req.user._id)

  if (account) {
    account.userImage = userImage || account.userImage
    account.forename = forename || account.forename
    account.surname = surname || account.surname
    account.email = email || account.email
    if (password) {
      account.password = password
      const salt = await bcrypt.genSalt(10)
      account.password = await bcrypt.hash(account.password, salt)
    }
  }

  const updatedAccount = await account.save()

  res.json({
    updatedAccount,
    token: jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
      expiresIn: '60d',
    }),
  })
})

export { signin, signup, getProfile, updateProfile }
