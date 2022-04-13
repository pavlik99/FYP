import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

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
    res.status(400)
    throw new Error('Unable to find order')
  }
})

export { putOrderProducts, getOrder }
