import React from 'react'
import { Container, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
     
        <footer className="text-sm px-8 flex-none py-3 bg-light">
          <Container>
          <Nav className="justify-content-end" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">About us</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Contact us</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="disabled" disabled> Disabled </Nav.Link>
    </Nav.Item>
  </Nav>
  </Container>
    </footer>

    )
}

export default Footer
