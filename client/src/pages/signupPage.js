import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Row, Col, Form, Container, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Loading from '../components/Loading'
import { signup } from '../actions/authActions'

const SignupPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [verifyEmail, setVerifyEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  // const [message, setMessage] = useState(null)

  const authSignup = useSelector((state) => state.authSignup)
  const { loading, accountData, success, error } = authSignup

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (accountData) {
      history.push(redirect)
    }
  }, [history, accountData, redirect])

  //Dispatching the sign up acion
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== verifyPassword || email !== verifyEmail) {
    } else {
      dispatch(signup(forename, surname, email, password))
    }
  }

  return (
    <>
      {error && <Alert variant='danger'>Unsuccessful Attempt</Alert>}
      {loading && <Loading />}

      <Container fluid>
        <Form onSubmit={submitHandler}>
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
              We'll never share your email with anyone else.
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

          <Button variant='primary' type='submit'>
            SIGNUP
          </Button>
          <Row className='py-3'>
            <Col>
              <Form.Text
                as={Link}
                to={redirect ? `/signin?redirect=${redirect}` : '/signin'}
              >
                Existing customer?
              </Form.Text>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default SignupPage
