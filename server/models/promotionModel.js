import mongoose from 'mongoose'

const promotionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [false, 'Please add title'],
      maxlength: 32,
    },
    description: {
      type: String,
      required: [false, 'Please add text'],
      maxlength: 120,
    },
    promotionImage: {
      type: String,
      required: [false, 'Please add an Image'],
    },
  },
  {
    timestamps: true,
  }
)

const Promotion = mongoose.model('Promotion', promotionSchema)

export default Promotion
