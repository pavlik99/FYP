import mongoose from "mongoose";

const promotionSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        maxlength: 32
    },
      description: {
        type: String,
        required: true,
        maxlength: 120
    },
    promotionImage: {
        type: String,
        required: true
      }
   
}, {
    timestamps: true
})

const Promotion =  mongoose.model('Promotion', promotionSchema)

export default Promotion