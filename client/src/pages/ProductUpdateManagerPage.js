import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Row, Col, Form, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MANAGER_UPDATE_PRODUCT_RESTART } from '../constants/managerTypes'
import Loading from '../components/Loading'
// Redux Actions
import { managerUpdateProduct } from '../actions/managerActions'
import { fetchProduct } from '../actions/productActions'

const ProductUpdateManagerPage = (props) => {
  const productID = props.match.params.id

  const history = useHistory()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [productImage, setProductImage] = useState('')
  const [brand, setBrand] = useState('')
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [information, setInformation] = useState('')
  const [nutrition, setNutrition] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [allergens, setAllergens] = useState('')
  const [isVegeterian, setIsVegeterian] = useState('')
  const [isVegan, setIsVegan] = useState('')
  const [isKeto, setIsKeto] = useState('')
  const [isOrganic, setIsOrganic] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  // const authSignin = useSelector((state) => state.authSignin)
  // const { accountData } = authSignin

  // const accountInfo = useSelector((state) => state.accountInfo)
  // const { loading, account, error } = accountInfo

  const oneProduct = useSelector((state) => state.oneProduct)
  const { product, loading, error } = oneProduct

  const updateProductManager = useSelector(
    (state) => state.updateProductManager
  )
  const { updated } = updateProductManager

  useEffect(() => {
    if (updated) {
      dispatch({ type: MANAGER_UPDATE_PRODUCT_RESTART })
      history.push('/manager/products')
    } else {
      if (!product.title || product._id !== productID) {
        dispatch(fetchProduct(productID))
      } else {
        setTitle(product.title)
        setPrice(product.price)
        setProductImage(product.productImage)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setInformation(product.information)
        setNutrition(product.nutrition)
        setIngredients(product.ingredients)
        setAllergens(product.allergens)
        setIsVegeterian(product.isVegeterian)
        setIsVegan(product.isVegan)
        setIsKeto(product.isKeto)
        setIsOrganic(product.isOrganic)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, product, productID, updated, history])

  //Dispatching the update action
  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(
      managerUpdateProduct({
        _id: productID,
        title,
        price,
        productImage,
        brand,
        category,
        description,
        information,
        nutrition,
        ingredients,
        allergens,
        isVegeterian,
        isVegan,
        isKeto,
        isOrganic,
        countInStock,
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

      setProductImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      {/* {success && <Alert variant='success'>Successfully Updated!</Alert>}
      {error && <Alert variant='danger'>Unsuccessful Attempt</Alert>} */}
      {loading && <Loading />}

      <Container className='pt-3' fluid>
        <Row>
          <>
            <Form onSubmit={updateHandler} className='textarea'>
              <Button variant='outline-secondary' type='submit'>
                SAVE CHANGES
              </Button>
              <Row className='pt-2'>
                <Col>
                  <Image
                    src={product.productImage}
                    className='productUpdateImage'
                    rounded
                  />

                  {/* Product Image*/}
                  <Form.Group className='mb-3 mt-3' controlId='formBasicImage'>
                    <Form.FloatingLabel
                      controlId='image'
                      label='Product Image'
                      className='mb-3'
                    >
                      <Form.Control
                        placeholder='Choose Product Image'
                        value={productImage}
                        onChange={(e) => setProductImage(e.target.value)}
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

                  {/* Price*/}
                  <Form.Group className='mb-3' controlId='formBasicPrice'>
                    <Form.FloatingLabel
                      controlId='price'
                      label='Price'
                      className='mb-3'
                    >
                      <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>

                  {/* Brand */}
                  <Form.Group className='mb-3' controlId='formBasicBrand'>
                    <Form.FloatingLabel
                      controlId='Brand'
                      label='Brand'
                      className='mb-3'
                    >
                      <Form.Control
                        type='brand'
                        placeholder=' Enter Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>

                  {/* Category */}
                  <Form.Group className='mb-3' controlId='formBasicCategory'>
                    <Form.FloatingLabel
                      controlId='category'
                      label='Category'
                      className='mb-3'
                    >
                      <Form.Control
                        type='category'
                        placeholder='Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  {/*  Description */}
                  <Form.Group className='mb-3 ' controlId='Description'>
                    <Form.FloatingLabel
                      controlId='Description'
                      label='Description'
                      className='mb-3'
                    >
                      <Form.Control
                        className='textarea'
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
                  {/* Information */}
                  <Form.Group className='mb-3' controlId='Information'>
                    <Form.FloatingLabel
                      controlId='Information'
                      label='Information '
                      className='mb-3'
                    >
                      <Form.Control
                        as='textarea'
                        rows={4}
                        type='text'
                        size='lg'
                        placeholder='Product Information '
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>
                  {/* Nutrition  */}
                  <Form.Group className='mb-3' controlId='Nutrition'>
                    <Form.FloatingLabel
                      controlId='Nutrition'
                      label=' Nutrition'
                      className='mb-3'
                    >
                      <Form.Control
                        as='textarea'
                        rows={4}
                        type='text'
                        size='lg'
                        placeholder='Nutrition '
                        value={nutrition}
                        onChange={(e) => setNutrition(e.target.value)}
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
                  {/* Allergens */}
                  <Form.Group className='mb-3' controlId='Allergens'>
                    <Form.FloatingLabel
                      controlId='Allergens'
                      label='Allergens'
                      className='mb-3'
                    >
                      <Form.Control
                        type='Allergens'
                        placeholder='Allergens '
                        value={allergens}
                        onChange={(e) => setAllergens(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>
                  {/* countInStock */}
                  <Form.Group className='mb-3' controlId='countInStock'>
                    <Form.FloatingLabel
                      controlId='countInStock'
                      label='countInStock'
                      className='mb-3'
                    >
                      <Form.Control
                        type='number'
                        placeholder='Quantity'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>
                  <Form.Text className='text-muted py-2'>
                    Please choose "true" or "false" for the options below!
                  </Form.Text>
                  {/* isVegeterian */}
                  <Form.Group className='mb-3 pt-2' controlId='isVegeterian'>
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
                  {/*  isOrganic */}
                  <Form.Group className='mb-3' controlId='isOrganic'>
                    <Form.FloatingLabel
                      controlId='isOrganic'
                      label='isOrganic'
                      className='mb-3'
                    >
                      <Form.Control
                        type='isOrganic'
                        placeholder='Organic'
                        value={isOrganic}
                        onChange={(e) => setIsOrganic(e.target.value)}
                      />
                    </Form.FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </>
        </Row>
      </Container>
    </>
  )
}

export default ProductUpdateManagerPage
