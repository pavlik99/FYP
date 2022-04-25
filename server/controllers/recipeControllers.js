import express from 'express'
import mongoose from 'mongoose'
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
  const recipe = await Recipe.findById(req.params.id).populate(
    'user',
    'forename surname email'
  )

  try {
    res.status(200).json(recipe)
  } catch (error) {
    res.status(404).json({ message: 'Unable to find recipe' })
  }
})

// GET USER RECIPES
const getUserRecipes = expressAsyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user._id })
  res.json(recipes)
})

// CREATE, UPDATE AND DELETE RECIPE CONTROLLERS

// CREATE A RECIPE
// POST /api/recipes
const newRecipe = expressAsyncHandler(async (req, res) => {
  const recipe = new Recipe({
    user: req.user._id,
    title: 'Choose Title',
    image: '/images/defaultProduct.jpg',
    image2: '/images/defaultProduct.jpg',
    image3: '/images/defaultProduct.jpg',
    description: 'Add Desciption',
    body: 'Text',
    body2: ' ',
    ingredients: 'Add Ingredietns',
    isVegeterian: false,
    isVegan: true,
    isKeto: false,
    isRecipe: true,
    isArticle: false,
    isNews: false,
    likes: 0,
  })

  try {
    const NewRecipe = await recipe.save()
    res.status(201)
    res.json(NewRecipe)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
})

// DELETE A RECIPE
// DELETE /api/recipes/:id
const destroyRecipe = expressAsyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Recipe with such id does not exist')

  await Recipe.findByIdAndRemove(req.params.id)

  res.json({ message: 'Recipe deleted successfully.' })
})

// UPDATE RECIPE
// PUT /api/recipe/:id
const updateRecipe = expressAsyncHandler(async (req, res) => {
  const {
    title,
    image,
    image2,
    image3,
    description,
    body,
    body2,
    ingredients,
    isVegeterian,
    isVegan,
    isKeto,
    isRecipe,
    isArticle,
    isNews,
    likes,
  } = req.body

  // if (!mongoose.Types.ObjectId.isValid(req.params.id))
  //   return res.status(404).send('Unable to find a recipe with such id')

  const item = await Recipe.findById(req.params.id)
  if (item) {
    item.title = title
    item.body = body
    item.body2 = body2
    item.image = image
    item.image2 = image2
    item.image3 = image3
    item.description = description
    item.ingredients = ingredients
    item.isVegeterian = isVegeterian
    item.isVegan = isVegan
    item.isKeto = isKeto
    item.isRecipe = isRecipe
    item.isArticle = isArticle
    item.isNews = isNews

    const updatedRecipe = await item.save()

    res.json(updatedRecipe)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

  // const updatedRecipe = {
  //   title,
  //   description,
  //   body,
  //   image,
  //   ingredients,
  //   isVegeterian,
  //   isVegan,
  //   isKeto,
  //   likes,
  //   _id: req.params.id,
  // }

  // await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe)
  // res.json(updatedRecipe)
})

// LIKE A RECIPE
// PATCH /api/recipe/:id/like
const likeRecipe = expressAsyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Unable to find a recipe with such id ')

  const recipe = await Recipe.findById(req.params.id)

  const likedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
    likes: recipe.likes + 1,
  })

  res.json(likedRecipe)
})

export {
  fetchAllRecipes,
  fetchRecipe,
  newRecipe,
  destroyRecipe,
  updateRecipe,
  likeRecipe,
  getUserRecipes,
}
