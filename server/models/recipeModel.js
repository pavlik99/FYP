import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      maxlength: 50,
    },
    image: {
      type: String,
      required: [false, 'Please add an Image'],
    },
    image2: {
      type: String,
      required: [false, 'Please add an Image'],
    },
    image3: {
      type: String,
      required: [false, 'Please add an Image'],
    },
    description: {
      type: String,
      required: [false, 'Please add a description'],
    },
    body: {
      type: String,
      required: [false, 'Please add text'],
    },
    body2: {
      type: String,
      required: [false, 'Please add text'],
    },
    ingredients: {
      type: String,
      required: [false, 'Please add ingredients'],
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
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
    isRecipe: {
      type: Boolean,
      default: false,
    },
    isArticle: {
      type: Boolean,
      default: false,
    },
    isNews: {
      type: Boolean,
      default: false,
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

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
