import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'

// GET /api/products
const fetchAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    Product.find({ ...keyword }).then((products) => res.json(products))
    // const products = await Product.find({ ...keyword })
    // res.json(products)
  } catch (error) {
    res.status(404).json({ message: 'Error when fetching products' })
  }
})

//GET /api/products/:id
const fetchProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    await Product.findById(id).then((product) => res.json(product))
  } catch (error) {
    res.status(404).json({ message: 'Error when fetching product' })
  }

  // const product = await Product.findById(id)
  // try {
  //   if (product) {
  //     res.json(product)
  //   } else {
  //     res.status(404).json({ message: 'Unable to find product' })
  //   }
  // } catch (error) {
  //   res.status(404).json({ message: 'Error when fetching product' })
  // }
})

// RATING  A PRODUCT
const newReview = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const { rating } = req.body

  const product = await Product.findById(id)

  if (product) {
    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
      res.status(400)
      throw new Error('Each user can rate a certain product just once')
    }

    const review = {
      name: req.user.surname,
      rating: Number(rating),
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, object) => object.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201)

    res.json({ message: 'The product has been rated successfully!' })
  } else {
    res.status(404)
    throw new Error('Product with such ID does not exist!')
  }
})

// MANAGER
// DELETE /api/products/:id
const destroyProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with such id was found`)

  try {
    if (product) {
      //await product.remove()
      await Product.findByIdAndRemove(id)
    } else {
      res.status(404).json({ message: 'Unable to find product' })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error when deleting product' })
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
  try {
    const newProduct = await item.save()
    res.status(201)
    res.json(newProduct)
  } catch (error) {
    res.status(404).json({ message: 'Error when creating product' })
  }
})

// MANAGER
// PUT /api/products/:id
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
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
    countInStock,
  } = req.body

  //fake
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Unable to find a recipe with such id')

  const updatedProduct = {
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
    countInStock,
    _id: req.params.id,
  }

  await Product.findByIdAndUpdate(id, updatedProduct)
  res.json(updatedProduct)
  //end fake

  //original
  //const item = await Product.findById(id)
  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return res.status(404).send(`No product with such  id`)

  // try {
  //   if (item) {
  //     item.title = title
  //     item.price = price
  //     item.productImage = productImage
  //     item.brand = brand
  //     item.category = category
  //     item.description = description
  //     item.information = information
  //     item.nutrition = nutrition
  //     item.ingredients = ingredients
  //     item.allergens = allergens
  //     item.isVegeterian = isVegeterian
  //     item.isVegan = isVegan
  //     item.isKeto = isKeto
  //     item.isOrganic = isOrganic
  //     item.numReviews = numReviews
  //     item.countInStock = countInStock

  //     const updatedProduct = await item.save()

  //     res.json(updatedProduct)
  //   } else {
  //     res.status(404)
  //     throw new Error('Product not found')
  //   }
  // } catch (error) {
  //   res.status(404).json({ message: 'Error when updating product' })
  // }
  // end original
})

export {
  fetchAllProducts,
  fetchProduct,
  destroyProduct,
  newProduct,
  updateProduct,
  newReview,
}
