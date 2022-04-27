import mongoose from 'mongoose'

const ratingSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add name'] },
    rating: { type: Number, required: [true, 'Please add rating'] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
      required: [true, 'Please add title'],
    },
    productImage: {
      type: String,
      required: [true, 'Please add image'],
    },
    brand: {
      type: String,
      required: [true, 'Please add brand'],
    },
    category: {
      type: String,
      required: [true, 'Please add category'],
    },
    price: {
      type: Number,
      required: [true, 'Please add price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please add description'],
    },
    information: {
      type: String,
      required: [false, 'Please add information'],
    },
    nutrition: {
      type: String,
      required: [false, 'Please add nutrition'],
    },
    ingredients: {
      type: String,
      required: [false, 'Please add ingredients'],
    },
    allergens: {
      type: String,
      required: [false, 'Please add allergens'],
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
    rating: {
      type: Number,
      required: [true, 'Rating Stock is required'],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [false, 'NumReviews Stock is required'],
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
