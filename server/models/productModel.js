import mongoose from 'mongoose'

const ratingSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    review: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: false,
    },
    nutrition: {
      type: String,
      required: false,
    },
    ingredients: {
      type: String,
      required: false,
    },
    allergens: {
      type: String,
      required: false,
    },
    isVegeterian: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isKeto: {
      type: Boolean,
      default: false,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    reviews: [ratingSchema],
    review: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
      required: [true, 'Product Stock is required'],
    },
    date_added: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
