import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <div>
       <Navbar bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">AMS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">GEN3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
