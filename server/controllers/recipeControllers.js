import expressAsyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'
import User from '../models/userModel.js'

// GET /api/recipes
const fetchAllRecipes = expressAsyncHandler(async (req, res) => {
  const recipes = await Recipe.find()
  res.json(recipes)
})

// GET /api/recipes/:id
const fetchRecipe = expressAsyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  try {
    res.status(200).json(recipe)
  } catch (error) {
    res.status(404).json({ message: 'Unable to find recipe' })
  }
})

// CREATE, UPDATE AND DELETE RECIPE CONTROLLERS

// CREATE A RECIPE
// POST /api/recipes
const newRecipe = expressAsyncHandler(async (req, res) => {
  const recipe = new Recipe({
    user: req.user._id,
    title: 'Choose Title',
    description: 'Add Desciption',
    body: 'Text',
    ingredients: 'Add Ingredietns',
    isVegeterian: false,
    isVegan: true,
    isKeto: false,
  })

  try {
    const NewRecipe = await recipe.save()
    res.status(201)
    res.json(NewRecipe)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
})
export { fetchAllRecipes, fetchRecipe, newRecipe }
