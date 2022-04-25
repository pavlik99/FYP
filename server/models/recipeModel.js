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
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    image2: {
      type: String,
      required: false,
    },
    image3: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    body2: {
      type: String,
      required: false,
    },
    ingredients: {
      type: String,
      required: false,
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
