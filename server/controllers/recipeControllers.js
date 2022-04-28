import express from 'express'
import mongoose from 'mongoose'
import expressAsyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'
import User from '../models/userModel.js'

// GET /api/recipes
const fetchAllRecipes = expressAsyncHandler(async (req, res) => {
  try {
    Recipe.find().then((recipes) => res.json(recipes))

    // const recipes = await Recipe.find()
    // res.json(recipes)
  } catch (error) {
    res.status(404).json({ message: 'Error when getting recipes' })
  }
})

// GET /api/recipes/:id
const fetchRecipe = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id).populate(
    'user',
    'forename surname email'
  )
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Unable to find recipe with such id`)
  try {
    res.status(200).json(recipe)
  } catch (error) {
    res.status(404).json({ message: 'Error when fetching recipe' })
  }
})

// GET USER RECIPES
const getUserRecipes = expressAsyncHandler(async (req, res) => {
  try {
    Recipe.find({ user: req.user._id }).then((recipes) => res.json(recipes))

    // const recipes = await Recipe.find({ user: req.user._id })
    // res.json(recipes)
  } catch (error) {
    res.status(404).json({ message: 'Error when getting user recipes' })
  }
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
    recipe.save().then((NewRecipe) => res.status(201).json(NewRecipe))
    //
    // const NewRecipe = await recipe.save()
    // res.status(201)
    // res.json(NewRecipe)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
})

// DELETE A RECIPE
// DELETE /api/recipes/:id
const destroyRecipe = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Recipe with such id does not exist')
  try {
    await Recipe.findByIdAndRemove(id)

    res.json({ message: 'Recipe deleted successfully.' })
  } catch (error) {
    res.status(404).json({ message: 'Error when deleting user recipes' })
  }
})

// UPDATE RECIPE
// PUT /api/recipe/:id
const updateRecipe = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
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
  //fake start
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Unable to find a recipe with such id')
  //fake end
  //start original
  // const item = await Recipe.findById(id)
  // if (item) {
  //   item.title = title
  //   item.body = body
  //   item.body2 = body2
  //   item.image = image
  //   item.image2 = image2
  //   item.image3 = image3
  //   item.description = description
  //   item.ingredients = ingredients
  //   item.isVegeterian = isVegeterian
  //   item.isVegan = isVegan
  //   item.isKeto = isKeto
  //   item.isRecipe = isRecipe
  //   item.isArticle = isArticle
  //   item.isNews = isNews

  //   const updatedRecipe = await item.save()

  //   res.json(updatedRecipe)
  // } else {
  //   res.status(404)
  //   throw new Error('Product not found')
  // }
  //end original
  //start fake
  const updatedRecipe = {
    title,
    description,
    body,
    body2,
    image2,
    image3,
    image,
    ingredients,
    isVegeterian,
    isVegan,
    isKeto,
    likes,
    isRecipe,
    isArticle,
    isNews,
    _id: req.params.id,
  }

  await Recipe.findByIdAndUpdate(id, updatedRecipe)
  res.json(updatedRecipe)
  //edn fake
})

// LIKE A RECIPE
// PATCH /api/recipe/:id/like
const likeRecipe = expressAsyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Unable to find a recipe with such id ')

  const recipe = await Recipe.findById(id)

  try {
    Recipe.findByIdAndUpdate(id, {
      likes: recipe.likes + 1,
    }).then((likedRecipe) => res.json(likedRecipe))
    //
    // const likedRecipe = await Recipe.findByIdAndUpdate(id, {
    //   likes: recipe.likes + 1,
    // })
    // res.json(likedRecipe)
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error when attempting to upvote a recipe' })
  }
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
