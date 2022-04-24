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
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [isVegeterian, setIsVegeterian] = useState('')
  const [isVegan, setIsVegan] = useState('')
  const [isKeto, setIsKeto] = useState('')
  const [uploading, setUploading] = useState(false)

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
        setBody(recipe.body)
        setDescription(recipe.description)
        setIngredients(recipe.ingredients)
        setIsVegeterian(recipe.isVegeterian)
        setIsVegan(recipe.isVegan)
        setIsKeto(recipe.isKeto)
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
        body,
        description,
        ingredients,
        isVegeterian,
        isVegan,
        isKeto,
      })
    )
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

  return (
    <>
      <Container className='pt-3' fluid>
        <Form onSubmit={updateHandler}>
          <Button variant='outline-secondary' type='submit'>
            SAVE CHANGES
          </Button>
          <Row className='pt-2'>
            <Col>
              <Image
                src={recipe.image}
                fluid
                rounded
                width={600}
                height={600}
              />

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
              <Form.Group className='mb-3 mt-3' controlId='formBasicImage2'>
                <Form.Control
                  type='file'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadHandler}
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
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default UpdateRecipePage
