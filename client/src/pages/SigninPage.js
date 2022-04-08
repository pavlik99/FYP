import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Row, Col, Form, Container, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
import { signin, googleSignin } from '../actions/authActions'
import GoogleLogin from 'react-google-login'

const SigninPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authSignin = useSelector((state) => state.authSignin)
  const { loading, accountData, success, error } = authSignin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (accountData) {
      history.push(redirect)
    }
  }, [history, accountData, redirect])

  // Dispatvhing the signin action
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  //GOOGLE SIGN IN
  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    console.log(token, result)
    dispatch(googleSignin(result, token))
    history.push('/')
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Unsuccessful Google Sign In')
  }

  return (
    <>
      {error && <Alert variant='danger'>Wrong Email or Password</Alert>}
      {loading && <Loading />}

      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.FloatingLabel
              controlId='email'
              label='Email Address'
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
          <Form.Group className='mb-3' controlId='googleLogin'>
            <GoogleLogin
              clientId='811428273654-d5vk306l3gbbor9ss5qtdmbfj33eae3i.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button
                  className='googleButton'
                  variant='primary'
                  onClick={renderProps.onClick}
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            LOGIN
          </Button>
          <Row className='py-3'>
            <Col>
              <Form.Text
                as={Link}
                to={redirect ? `/signup?redirect=${redirect}` : '/signup'}
              >
                Not Registered Yet?
              </Form.Text>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default SigninPage
