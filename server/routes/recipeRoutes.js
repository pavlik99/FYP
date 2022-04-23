import express from 'express'
const router = express.Router()

import {
  fetchAllRecipes,
  fetchRecipe,
  newRecipe,
  destroyRecipe,
  updateRecipe,
  likeRecipe,
  getUserRecipes,
} from '../controllers/recipeControllers.js'
import { protect } from '../middleware/authentication.js'

// GET ALL USER RECIPES
//GET /api/recipes/myrecipes
router.get('/myrecipes', protect, getUserRecipes)
// GET ALL RECIPES
// GET /api/recipes
router.get('/', fetchAllRecipes)

// GET ONE RECIPE BY ID
//GET /api/recipes/:id
router.get('/:id', fetchRecipe)

// CREATE A RECIPE
// POST /api/recipes
router.post('/', protect, newRecipe)

// DELETE RECIPE
// /api/recipes/:id
router.delete('/:id', protect, destroyRecipe)

// UPDATE A RECIPE
//POST /api/recipes/:id
router.put('/:id', protect, updateRecipe)

//LIKE A RECIPE
//PATCH /api/recipes/:id/like
router.patch('/:id/like', likeRecipe)

export default router
