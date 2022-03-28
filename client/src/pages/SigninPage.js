import React from 'react'
import { signin } from '../actions/authActions'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const SigninPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const accountData = useSelector((state) => state.signin) //accountData
  const { loading, account } = accountData

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (account) {
      history.push(redirect)
    }
  }, [history, account, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  return (
    <>
      {loading && <Loading />}

      <Container fluid>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            LOGIN
          </Button>
          <Row className='py-3'>
            <Col>
              <Form.Text
                as={Link}
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
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
