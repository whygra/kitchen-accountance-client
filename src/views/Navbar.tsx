import { useState } from 'react'
import SelectCreateGroup from './product/form/SelectCreateGroup'
import { Container, Navbar as BSNavbar, Nav } from 'react-bootstrap'


function Navbar() {
  return (
    <BSNavbar bg="light" data-bs-theme="light">
    <Container>
      <BSNavbar.Brand href="/home">KiAc</BSNavbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/ingredients/all">Ингредиенты</Nav.Link>
      </Nav>
      <Nav className="me-auto">
        <Nav.Link href="/dishes/all">Блюда</Nav.Link>
      </Nav>
      <Nav className="me-auto">
        <Nav.Link href="/distributors/all">Поставщики</Nav.Link>
      </Nav>
    </Container>
  </BSNavbar>
  )
}

export default Navbar
