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

    const newOrder = await order.save()

    res.status(201).json(newOrder)
  }
})

//GET ORDER
const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'forename surname email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Unable to find order')
  }
})

//PAY ORDER
const payOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const newOrder = await order.save()
    res.json(newOrder)
  } else {
    res.status(404)
    throw new Error('Unable to find order')
  }
})

//STRIPE PAYMENT
const stripePayment = expressAsyncHandler(async (req, res) => {
  const charge = await stripe.charges.create({
    currency: 'GBP',
    description: 'charge',
    // amount: 500,
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
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// GET USER ORDERS
const getAllOrdersManager = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id forename surname')
  res.json(orders)
})

export {
  putOrderProducts,
  getOrder,
  payOrder,
  stripePayment,
  getOrders,
  getAllOrdersManager,
}
