import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// New Order
const putOrderProducts = expressAsyncHandler(async (req, res) => {
  const { productItems, deliveryAddress, productsTotal, deliveryPrice, total } =
    req.body

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
      total,
    })

    const newOrder = await order.save()

    res.status(201).json(newOrder)
  }
})

export { putOrderProducts }
