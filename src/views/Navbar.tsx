import { useContext, useState } from 'react'
import SelectCreateGroup from './product/form/SelectCreateGroup'
import { Container, Navbar as BSNavbar, Nav } from 'react-bootstrap'
import { signOut as requestSignOut } from '../api/users'
import { appContext } from '../context/AppContextProvider'
import ConfirmationDialog from './ConfirmationDialog'
import { getCookie } from '../cookies'
import { C_IS_SIGNED_IN } from '../api/constants'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContextProvider'
import { UserPermissions } from '../models'
import UserList from './user/list/UserList'


function Navbar() {
  const{ showModal, hideModal} = useContext(appContext)
  const {hasPermission} = useContext(authContext)
  const isSignedIn = getCookie(C_IS_SIGNED_IN)
  const navigate = useNavigate()
  function signOut(){
    showModal(
    <ConfirmationDialog 
      prompt={'Вы действительно хотите выйти?'}
      onCancel={hideModal}
      onConfirm={()=>{
        requestSignOut()
        .then(()=>{
            hideModal()
            navigate('/home')
        })
      }}
    />)
  }
  return (
    <BSNavbar bg="light" data-bs-theme="light">
    <Container>
      <BSNavbar.Brand href="/home">KiAc</BSNavbar.Brand>
      <Nav className="me-auto">
        <Link className="nav-link" to="/ingredients/all">Ингредиенты</Link>
      </Nav>
      <Nav className="me-auto">
        <Link className="nav-link" to="/dishes/all">Блюда</Link>
      </Nav>
      <Nav className="me-auto">
        <Link className="nav-link" to="/distributors/all">Поставщики</Link>
      </Nav>
    </Container>
    <Nav>{
      isSignedIn == 'true'
      ? <>
          <Link className="nav-link" to='' onClick={signOut}>Выйти</Link>
          <Link className="nav-link" to='/profile'>Профиль</Link>
          {
            hasPermission(UserPermissions.CRUD_USERS)
            ? 
            <Link className="nav-link" to='/users'>Пользователи</Link>
            : <></>
          }
        </>
      : <Link className="nav-link" to='/signin'>Войти</Link>
    }</Nav>
  </BSNavbar>
  )
}

export default Navbar
