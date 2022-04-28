import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

import Stripe from 'stripe'
const stripe = new Stripe(
  'sk_test_51Kob94BBFBRBiiwm8rb6Gp0hUkRWHkQGW7pKOz3R3572N6PQMPweFIOURHW1rCH1MD4NX6r8PwrIyxZJ5DFkerwP00Gi0bi2Vv'
)

// NEW ORDER
const putOrderProducts = expressAsyncHandler(async (req, res) => {
  const {
    productItems,
    deliveryAddress,
    productsTotal,
    deliveryPrice,
    finalPrice,
  } = req.body

  if (!deliveryAddress) {
    res.status(400).json({ msg: 'Missing Address' })
  }

  if (!productsTotal || !finalPrice) {
    res.status(400).json({ msg: 'Error with prices' })
  }
  try {
    if (productItems && productItems.length === 0) {
      res.status(400)
      throw new Error('Empty')
      return
    } else {
      const order = new Order({
        user: req.user._id,
        productItems,
        deliveryAddress,
        productsTotal,
        deliveryPrice,
        finalPrice,
      })
      order.save().then((newOrder) => res.status(201).json(newOrder))

      // const newOrder = await order.save()
      // res.status(201).json(newOrder)
    }
  } catch (error) {
    res.status(404).json({ message: 'Unable to create a new order' })
  }
})

//GET ORDER
const getOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    Order.findById(id)
      .populate('user', 'forename surname email')
      .then((order) => res.status(201).json(order))
  } catch (error) {
    res.status(404).json({ message: 'Order with such id does not exist' })
  }

  //
  // const order = await Order.findById(id).populate(
  //   'user',
  //   'forename surname email'
  // )
  // try {
  //   if (order) {
  //     res.json(order)
  //   } else {
  //     res.status(404)
  //     throw new Error('Unable to find order')
  //   }
  // } catch (error) {
  //   res.status(404).json({ message: 'Order with such id does not exist' })
  // }
})

//STRIPE PAYMENT
const stripePayment = expressAsyncHandler(async (req, res) => {
  const charge = await stripe.charges.create({
    currency: 'GBP',
    description: 'charge',
    amount: 100,
    source: req.body.id,
  })

  console.log(charge)
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// GET USER ORDERS
const getOrders = expressAsyncHandler(async (req, res) => {
  try {
    Order.find({ user: req.user._id }).then((orders) =>
      res.status(201).json(orders)
    )
    //
    // const orders = await Order.find({ user: req.user._id })
    // res.json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Unable to find user orders' })
  }
})

// GET /api/orders/profile
const getProfileOrder = expressAsyncHandler(async (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then((account) => {
      if (!account) {
        res.status(400).json({ msg: 'Unable to find user' })
      } else {
        res.json({
          _id: account._id,
          forename: account.forename,
          surname: account.surname,
          email: account.email,
          isManager: account.isManager,
        })
      }
    })
})

// GET All ORDERS
const getAllOrdersManager = expressAsyncHandler(async (req, res) => {
  try {
    Order.find({})
      .populate('user', 'id forename surname')
      .then((orders) => res.status(201).json(orders))
    //
    // const orders = await Order.find({}).populate('user', 'id forename surname')
    // res.json(orders)
  } catch (error) {
    res.status(404).json({ message: 'Unable to get all orders' })
  }
})

//Confirm Order
const confirmOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)

  if (order) {
    order.isConfirmed = true
    order.confirmedAt = Date.now()

    const confirmedOrder = await order.save()
    res.json(confirmedOrder)
  } else {
    res.status(404)
    throw new Error('Unable to find order')
  }
})

//Dispatch Order
const dispatchOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)

  if (order) {
    order.isDispatched = true
    order.dispatchedAt = Date.now()

    const dispatchedOrder = await order.save()
    res.json(dispatchedOrder)
  } else {
    res.status(404)
    throw new Error('Unable to find order')
  }
})

// Mark order as delivered
const deliverOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const deliverOrder = await order.save()
    res.json(deliverOrder)
  } else {
    res.status(404)
    throw new Error('Unable to find order')
  }
})

export {
  putOrderProducts,
  getOrder,
  stripePayment,
  getOrders,
  getAllOrdersManager,
  confirmOrder,
  dispatchOrder,
  deliverOrder,
  getProfileOrder,
}
