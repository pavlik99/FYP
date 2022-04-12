import mongoose from 'mongoose'

const orderItemsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    countInStock: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
    },
    productImage: { type: String, required: false },
    price: { type: Number, required: true },
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
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
)

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productItems: [orderItemsSchema],
    deliveryAddress: {
      deliveryAdress1: { type: String, required: true },
      address2: { type: String, required: false, default: 'N/A' },
      town: { type: String, required: true },
      zipCode: { type: String, required: true },
      county: { type: String, required: true },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    deliveryPrice: {
      type: Number,
      required: [true, 'Please add a delivery price'],
      default: 0.0,
    },
    finalPrice: {
      type: Number,
      required: [true, 'Please add a final price'],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },
    deliveredAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
