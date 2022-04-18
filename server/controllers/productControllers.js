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

// MANAGER
// DELETE /api/products/:id
const destroyProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
  } else {
    res.status(404).json({ message: 'Unable to find product' })
  }
})

// MANAGER
// POST /api/products
const newProduct = expressAsyncHandler(async (req, res) => {
  const item = new Product({
    title: 'Title',
    price: 0,
    user: req.user._id,
    productImage: '/images/defaultProduct.jpg',
    brand: 'Brand',
    category: 'Category',
    description: 'Description',
    information: 'Information',
    nutrition: 'Nutrition',
    ingredients: 'Ingredietns',
    allergens: 'Allergens',
    isVegeterian: false,
    isVegan: true,
    isKeto: false,
    isOrganic: false,
    numReviews: 0,
    countInStock: 0,
  })

  const newProduct = await item.save()
  res.status(201)
  res.json(newProduct)
})

// MANAGER
// PUT /api/products/:id
const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    title,
    price,
    productImage,
    brand,
    category,
    description,
    information,
    nutrition,
    ingredients,
    allergens,
    isVegeterian,
    isVegan,
    isKeto,
    isOrganic,
    numReviews,
    countInStock,
  } = req.body
  const item = await Product.findById(req.params.id)
  if (item) {
    item.title = title
    item.price = price
    item.productImage = productImage
    item.brand = brand
    item.category = category
    item.description = description
    item.information = information
    item.nutrition = nutrition
    item.ingredients = ingredients
    item.allergens = allergens
    item.isVegeterian = isVegeterian
    item.isVegan = isVegan
    item.isKeto = isKeto
    item.isOrganic = isOrganic
    item.numReviews = numReviews
    item.countInStock = countInStock

    const updatedProduct = await item.save()

    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  fetchAllProducts,
  fetchProduct,
  destroyProduct,
  newProduct,
  updateProduct,
}
