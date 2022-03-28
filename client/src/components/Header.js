import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../actions/authActions'
const Header = () => {
  const dispatch = useDispatch()
  const accountData = useSelector((state) => state.signin)
  const { account } = accountData

  const signoutHandler = () => {
    dispatch(signout())
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

              {account ? (
                <NavDropdown title={account.forename}>
                  <Nav.Link as={Link} to='/profile'>
                    <NavDropdown.Item>ACCOUNT</NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>
                    SIGNOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/signin'>
                  <i className='fas fa-user'></i> SIGN IN
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
