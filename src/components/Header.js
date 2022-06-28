import React from 'react'
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getName, removeName, removeToken, removeUserId } from '../helpers/auth'

import styles from '../styles/Nav.module.scss'

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    removeName()
    removeUserId()
    setIsLoggedIn(false)
    navigate('/')
  }

  const user = getName()

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      // bg="dark"
      variant="dark"
      sticky="top"
      className={styles.container}
    >
      <Container>
        <Link to="/">
          <Navbar.Brand href="#home">Club</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className={styles.dropdown}>
            {isLoggedIn ? (
              <>
                <NavDropdown
                  title={user}
                  id="collapsible-nav-dropdown"
                  className="text-black"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Inbox</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register/">Register</Nav.Link>
                <Nav.Link eventKey={2} href="/login/">
                  Sign In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
