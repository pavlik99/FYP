import mongoose from 'mongoose'

const orderItemsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
    },
    productImage: { type: String, required: true },
    price: { type: Number, required: true },
    item: {
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
    items: [orderItemsSchema],
    deliveryAddress: {
      address: { type: String, required: true },
      town: { type: String, required: true },
      postCode: { type: String, required: true },
      county: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentProcess: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    // tax: {
    //   type: Number,
    //   required: [true, 'Please add a tax price'],
    //   default: 0.0,
    // },
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
