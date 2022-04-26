import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap'

import { signout, googleSignout } from '../actions/authActions'

const Header = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  const location = useLocation()
  const dispatch = useDispatch()

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const googleSignin = useSelector((state) => state.googleSignin)
  const { googleData } = googleSignin

  const [googleUser, setGoogleUser] = useState(
    JSON.parse(localStorage.getItem('googleProfile'))
  )

  useEffect(() => {
    const token = googleUser?.token
    setGoogleUser(JSON.parse(localStorage.getItem('accountData'))) //googleProfile
  }, [location])

  const signoutHandler = () => {
    dispatch(signout())
  }
  const googleSignoutHandler = () => {
    dispatch(googleSignout())
  }

  return (
    <header>
      <Navbar bg='light' collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            HEALTHY LIVING
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <Nav.Link as={Link} to='/#action1'>
                PRODUCTS
              </Nav.Link>
              <Nav.Link as={Link} to='/recipes'>
                BLOG
              </Nav.Link>
            </Nav>

            <Form className='d-flex p-1 pl-2 ' onSubmit={submitHandler}>
              <Form.Control
                type='search'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search'
                aria-label='Search'
                className='me-2'
              ></Form.Control>
              <Button variant='outline-secondary'>Search</Button>
            </Form>

            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/basket'>
                BASKET
              </Nav.Link>

              {accountData ? (
                <>
                  {/* <NavDropdown title={<i class='fa-solid fa-user'></i>}> */}
                  <NavDropdown title='PROFILE '>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to='/profile'>
                        ACCOUNT
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to='/profiles/orders'>
                        ORDERS
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={signoutHandler}>
                      SIGNOUT
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : googleData ? (
                <NavDropdown>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/profile'>
                      ACCOUNT
                    </Nav.Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/allOrders'>
                      ORDERS
                    </Nav.Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={googleSignoutHandler}>
                    SIGNOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/signin'>
                  SIGN IN
                </Nav.Link>
              )}

              {accountData && accountData.isManager && (
                <NavDropdown title='MANAGER '>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/manager/products'>
                      PRODUCTS
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to='/manager/orders'>
                      ORDERS
                    </Nav.Link>
                  </NavDropdown.Item>

                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>
                    SIGNOUT
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
