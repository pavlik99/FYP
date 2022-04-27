import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  Alert,
  Image,
  ListGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
import UserRecipeCard from '../components/UserRecipeCard'
// Redux Actions
import { getAccountInfo, updateAccountInfo } from '../actions/authActions'
import { getAllUserRecipesAction } from '../actions/recipeActions'
import { getOrdersAction } from '../actions/orders'

const AccountPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [userImage, setUserImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [verifyEmail, setVerifyEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const accountInfo = useSelector((state) => state.accountInfo)
  const { loading, account, error } = accountInfo

  const updateInfo = useSelector((state) => state.updateInfo)
  const { success } = updateInfo

  const getUserRecipes = useSelector((state) => state.getUserRecipes)
  const { recipes } = getUserRecipes

  useEffect(() => {
    if (!accountData) {
      history.push('/signin')
    } else {
      if (!account.forename) {
        dispatch(getAccountInfo('profile'))
        dispatch(getOrdersAction())
        dispatch(getAllUserRecipesAction())
      } else {
        setForename(account.forename)
        setSurname(account.surname)
        setEmail(account.email)
        setUserImage(account.userImage)
      }
    }
  }, [dispatch, history, accountData, account])

  //Dispatching the update action
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== verifyPassword || email !== verifyEmail) {
    } else {
      dispatch(
        updateAccountInfo({
          id: account._id,
          userImage,
          forename,
          surname,
          email,
          password,
        })
      )
    }
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

      setUserImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      {success && <Alert variant='success'>Successfully Updated!</Alert>}
      {error && <Alert variant='danger'>Unsuccessful Attempt</Alert>}
      {loading && <Loading />}

      <Container className='pt-4' fluid>
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>
              {/* User Image*/}
              <Form.Group className='mb-3 mt-3' controlId='formBasicImage'>
                <Form.FloatingLabel
                  controlId='User Image'
                  label='User Image'
                  className='mb-3'
                >
                  <Form.Control
                    placeholder='Choose User Image'
                    value={userImage}
                    onChange={(e) => setUserImage(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3 mt-3'>
                <Form.Control
                  type='file'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadHandler}
                ></Form.Control>
              </Form.Group>

              {/* First Name */}
              <Form.Group className='mb-3' controlId='formBasicForename'>
                <Form.FloatingLabel
                  controlId='forename'
                  label='First Name'
                  className='mb-3'
                >
                  <Form.Control
                    type='forename'
                    placeholder='Enter First Name'
                    value={forename}
                    onChange={(e) => setForename(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              {/* Surname */}
              <Form.Group className='mb-3' controlId='formBasicSurname'>
                <Form.FloatingLabel
                  controlId='surname'
                  label='Last Name'
                  className='mb-3'
                >
                  <Form.Control
                    type='surname'
                    placeholder='Enter First Name'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/* Email */}

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.FloatingLabel
                  controlId='email'
                  label='Email address'
                  className='mb-3'
                >
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              {/* Verify Email */}
              <Form.Group className='mb-3' controlId='formBasicVerifyEmail'>
                <Form.FloatingLabel
                  controlId='verifyEmail'
                  label='Confrim Email'
                  className='mb-3'
                >
                  <Form.Control
                    type='email'
                    placeholder='Confirm Email'
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                  />
                </Form.FloatingLabel>
                <Form.Text className='text-muted'>
                  Please confirm email before making any changes!
                </Form.Text>
              </Form.Group>

              {/* Password */}
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.FloatingLabel
                  controlId='password'
                  label='Password'
                  className='mb-3'
                >
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              {/* Verify Password */}
              <Form.Group className='mb-3' controlId='formBasicVerifyPassword'>
                <Form.FloatingLabel
                  controlId='verifyPassword'
                  label='Confirm Password'
                  className='mb-3'
                >
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='switch' label='Terms and Conditions' />
              </Form.Group>

              <Button variant='outline-dark' type='submit'>
                UPDATE
              </Button>
              <Row className='py-3'></Row>
            </Form>
          </Col>
          <Col>
            <Row>
              <Image
                className='productUpdateImage'
                src={account.userImage}
                rounded
              />
            </Row>
            <Row className='py-3'></Row>
            <Row>
              <Col>
                <Link to={'/profiles/myrecipes'}>
                  <Button variant='outline-dark'>MY RECIPES</Button>
                </Link>
              </Col>
              <Col>
                <Link to={'/profiles/orders'}>
                  <Button variant='outline-dark'>MY ORDERS</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AccountPage
