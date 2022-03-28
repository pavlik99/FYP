import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// GET /api/products
const fetchAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//GET /api/products/:id
const fetchProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Unable to find product' })
  }
})

export { fetchAllProducts, fetchProduct }
