import React from 'react'
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand href="#home">Club</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link href="#deets">More Deets</Nav.Link>
                <Link to="/login">
                  <Nav.Link eventKey={2} href="#memes">
                    Sign Out
                  </Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Nav.Link href="#deets">Register</Nav.Link>
                </Link>
                <Link to="/login">
                  <Nav.Link eventKey={2} href="#memes">
                    Sign In
                  </Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
