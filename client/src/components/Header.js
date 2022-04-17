import { NavLink } from 'react-router-dom'
import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { signout, googleSignout } from '../actions/authActions'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
const Header = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  const googleSignin = useSelector((state) => state.googleSignin)
  const { googleData } = googleSignin

  //GOOGLE
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
            Name
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <Nav.Link as={Link} to='/#action1'>
                Products
              </Nav.Link>
              <Nav.Link as={Link} to='/#action2'>
                <i className='fas fa-utensils'></i> Recepies
              </Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
              <Nav.Link as={Link} to='/basket'>
                <i className='fas fa-bag-shopping'></i> Shopping bag
              </Nav.Link>

              {accountData ? (
                <NavDropdown title={accountData.forename}>
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
                  <NavDropdown.Item onClick={signoutHandler}>
                    SIGNOUT
                  </NavDropdown.Item>
                </NavDropdown>
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
                  <i className='fas fa-user'></i> Sign in
                </Nav.Link>
              )}

              {accountData && accountData.isManager && (
                <NavDropdown title={accountData.forename}>
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

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>
                    SIGNOUT
                  </NavDropdown.Item>
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
