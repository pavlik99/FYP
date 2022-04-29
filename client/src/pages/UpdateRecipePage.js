import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Form, Container, Image } from 'react-bootstrap'

import { UPDATE_RECIPE_RESTART } from '../constants/recipeTypes'
// Components
import Loading from '../components/Loading'
// Redux Actions
import { updateRecipeAction } from '../actions/recipeActions'
import { fetchRecipeAction } from '../actions/recipeActions'
const UpdateRecipePage = (props) => {
  const recipeID = props.match.params.id

  const history = useHistory()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [body2, setBody2] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [isVegeterian, setIsVegeterian] = useState('')
  const [isVegan, setIsVegan] = useState('')
  const [isKeto, setIsKeto] = useState('')
  const [isRecipe, setIsRecipe] = useState('')
  const [isArticle, setIsArticle] = useState('')
  const [isNews, setIsNews] = useState('')

  const [uploading, setUploading] = useState(false)
  const [uploading2, setUploading2] = useState(false)
  const [uploading3, setUploading3] = useState(false)

  const oneRecipe = useSelector((state) => state.oneRecipe)
  const { recipe } = oneRecipe

  const updateRecipe = useSelector((state) => state.oneRecipe)
  const { updated } = updateRecipe

  useEffect(() => {
    if (updated) {
      dispatch({ type: UPDATE_RECIPE_RESTART })
      history.push('/recipes')
    } else {
      if (!recipe.title || recipe._id !== recipeID) {
        dispatch(fetchRecipeAction(recipeID))
      } else {
        setTitle(recipe.title)
        setImage(recipe.image)
        setImage2(recipe.image2)
        setImage3(recipe.image3)
        setBody(recipe.body)
        setBody2(recipe.body2)
        setDescription(recipe.description)
        setIngredients(recipe.ingredients)
        setIsVegeterian(recipe.isVegeterian)
        setIsVegan(recipe.isVegan)
        setIsKeto(recipe.isKeto)
        setIsRecipe(recipe.isRecipe)
        setIsArticle(recipe.isArticle)
        setIsNews(recipe.isNews)
      }
    }
  }, [dispatch, recipe, recipeID, updated, history])

  //Dispatching the update action
  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateRecipeAction({
        _id: recipeID,
        title,
        image,
        image2,
        image3,
        body,
        body2,
        description,
        ingredients,
        isVegeterian,
        isVegan,
        isKeto,
        isArticle,
        isRecipe,
        isNews,
      })
    )
    history.push('/profile')
    window.location.reload()
  }

  const uploadHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadHandler2 = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage2(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadHandler3 = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage3(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Container className='pt-3' fluid>
        <Form onSubmit={updateHandler}>
          <Button variant='outline-secondary' type='submit'>
            SAVE CHANGES
          </Button>
          <Row className='pt-2'>
            <Col>
              <Image className='productUpdateImage' src={recipe.image} />

              {/* Recipe Image*/}
              <Form.Group className='mb-3 mt-3' controlId='formBasicImage'>
                <Form.FloatingLabel
                  controlId='image'
                  label='Recipe Image'
                  className='mb-3'
                >
                  <Form.Control
                    placeholder='Choose Recipe Image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3 mt-3' controlId='formBasicImage'>
                <Form.Control
                  type='file'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadHandler}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3 mt-3' controlId='formBasicImage2'>
                <Form.Control
                  type='file'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadHandler2}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='mb-3 mt-3' controlId='formBasicImage3'>
                <Form.Control
                  type='file'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadHandler3}
                ></Form.Control>
              </Form.Group>
              {/* TITLE */}
              <Form.Group className='mb-3' controlId='formBasicTitle'>
                <Form.FloatingLabel
                  controlId='title'
                  label='Title'
                  className='mb-3'
                >
                  <Form.Control
                    type='title'
                    placeholder='Enter Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              {/*  Description */}
              <Form.Group className='mb-3' controlId='Description'>
                <Form.FloatingLabel
                  controlId='Description'
                  label='Description'
                  className='mb-3'
                >
                  <Form.Control
                    as='textarea'
                    rows={4}
                    type='text'
                    size='lg'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/*  Body */}
              <Form.Group className='mb-3' controlId='Body'>
                <Form.FloatingLabel
                  controlId='Body'
                  label='Body'
                  className='mb-3'
                >
                  <Form.Control
                    as='textarea'
                    type='text'
                    size='lg'
                    placeholder='Body'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              {/*  Body 2*/}
              <Form.Group className='mb-3' controlId='Body2'>
                <Form.FloatingLabel
                  controlId='Body2'
                  label='Body2'
                  className='mb-3'
                >
                  <Form.Control
                    as='textarea'
                    type='text'
                    size='lg'
                    placeholder='Body'
                    value={body2}
                    onChange={(e) => setBody2(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              {/* Ingredients */}
              <Form.Group className='mb-3' controlId='Ingredients'>
                <Form.FloatingLabel
                  controlId='Ingredients'
                  label=' Ingredients'
                  className='mb-3'
                >
                  <Form.Control
                    as='textarea'
                    rows={3}
                    type='text'
                    size='lg'
                    placeholder='Ingredients '
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              {/* isVegeterian */}
              <Form.Group className='mb-3' controlId='isVegeterian'>
                <Form.FloatingLabel
                  controlId='isVegeterian'
                  label='isVegeterian'
                  className='mb-3'
                >
                  <Form.Control
                    type='isVegeterian'
                    placeholder='isVegeterian'
                    value={isVegeterian}
                    onChange={(e) => setIsVegeterian(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/* isVegan */}
              <Form.Group className='mb-3' controlId='isVegan'>
                <Form.FloatingLabel
                  controlId='isVegan'
                  label='isVegan'
                  className='mb-3'
                >
                  <Form.Control
                    type='isVegan'
                    placeholder='Vegan '
                    value={isVegan}
                    onChange={(e) => setIsVegan(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/* isKeto */}
              <Form.Group className='mb-3' controlId='isKeto'>
                <Form.FloatingLabel
                  controlId='isKeto'
                  label=' isKeto'
                  className='mb-3'
                >
                  <Form.Control
                    type='isKeto'
                    placeholder='Keto'
                    value={isKeto}
                    onChange={(e) => setIsKeto(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              {/* isRecipe */}
              <Form.Group className='mb-3' controlId='isRecipe'>
                <Form.FloatingLabel
                  controlId='isRecipe'
                  label=' isRecipe'
                  className='mb-3'
                >
                  <Form.Control
                    type='isRecipe'
                    placeholder='isRecipe'
                    value={isRecipe}
                    onChange={(e) => setIsRecipe(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/* isRecipe */}
              <Form.Group className='mb-3' controlId='isArticle'>
                <Form.FloatingLabel
                  controlId='isArticle'
                  label=' isArticle'
                  className='mb-3'
                >
                  <Form.Control
                    type='isArticle'
                    placeholder='isArticle'
                    value={isArticle}
                    onChange={(e) => setIsArticle(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/* isNews */}
              <Form.Group className='mb-3' controlId='isNews'>
                <Form.FloatingLabel
                  controlId='isNews'
                  label=' isNews'
                  className='mb-3'
                >
                  <Form.Control
                    type='isNews'
                    placeholder='isNews'
                    value={isNews}
                    onChange={(e) => setIsNews(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default UpdateRecipePage
