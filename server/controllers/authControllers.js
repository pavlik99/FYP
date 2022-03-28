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

//GET /api/accounts
const signup = expressAsyncHandler(async (req, res) => {
  const { forename, surname, email, password } = req.body

  if (!surname || !forename) {
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
              // token,
              // account: {
              //   id: account._id,
              //   forename: account.forename,
              //   surname: account.surname,
              //   email: account.email,
              // },

              _id: account._id,
              forename: account.forename,
              surname: account.surname,
              email: account.email,
              isAdmin: account.isAdmin,
              token: jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
                expiresIn: '60d',
              }),
            })
          }
        )
      })
    })
  })
  //////////////////////////////////
  // const salt = await bcrypt.genSalt(10)
  // account.password = await bcrypt.hash(this.password, salt) //this.password

  // if (account) {
  //   res.status(201).json({
  //     _id: account._id,
  //     forename: account.forename,
  //     surname: account.surname,
  //     email: account.email,
  //     isAdmin: account.isAdmin,
  //     token: jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
  //       expiresIn: '60d',
  //     }),
  //   })
  // } else {
  //   res.status(400).json({ msg: 'Unexpected error' })
  // }
})

// GET /api/account/profile
const profile = expressAsyncHandler(async (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then((account) => {
      if (!account) {
        res.status(400).json({ msg: 'Unable to find user' })
      } else {
        res.json(account)
      }
    })
})

//GENERATING JWT WEB TOKEN delete
//jwt.sign({ id: account._id }, process.env.JWT_SECRET, { expiresIn: '60d' })

// DELETE LATER
//   const account = await User.findOne({ email: email })
//   if (!account)
//     return res
//       .status(400)
//       .json({ msg: 'Account with this email does not exist' })

//   if (account && (await account.isPassword(password))) {
//     res.json({
//       _id: account._id,
//       forename: account.forename,
//       surname: account.surname,
//       email: account.email,
//       isManager: account.isManager,
//       token: null,
//     })
//   } else {
//     res.status(401).json({ msg: 'Invalid email or password' })
//   }

export { signin, profile, signup }
