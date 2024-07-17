import { useState } from 'react'
import SelectCreateGroup from './product/inputs/SelectCreateGroup'
import { Container, Navbar as BSNavbar, Nav } from 'react-bootstrap'


function Navbar() {
  return (
    <BSNavbar bg="light" data-bs-theme="light">
    <Container>
      <BSNavbar.Brand href="/home">KA</BSNavbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/components/all">Компоненты</Nav.Link>
      </Nav>
    </Container>
  </BSNavbar>
  )
}

export default Navbar
