import { useContext, useState } from 'react'
import { Container, Navbar as BSNavbar, Nav, NavbarBrand, Row, Col, Image } from 'react-bootstrap'
import { signOut as requestSignOut } from '../api/users'
import { appContext } from '../context/AppContextProvider'
import ConfirmationDialog from './shared/ConfirmationDialog'
import { getCookie } from '../cookies'
import { C_IS_SIGNED_IN } from '../api/constants'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContextProvider'
import { UserPermissions } from '../models'


function Navbar() {
  const{ showModal, hideModal} = useContext(appContext)
  const {hasPermission, updateUserData} = useContext(authContext)
  const isSignedIn = getCookie(C_IS_SIGNED_IN)
  const navigate = useNavigate()
  function signOut(){
    showModal(
    <ConfirmationDialog 
      prompt={'Вы действительно хотите выйти?'}
      onCancel={hideModal}
      onConfirm={()=>{
        requestSignOut()
        .then(async ()=>{
            await updateUserData()
            hideModal()
            navigate('/home')
        })
      }}
    />)
  }
  return (
    <div className="fixed-left mb-auto bg-light text-center d-flex flex-row flex-md-column h-100 align-items-center">
      <div className='d-flex'>

      <Link to="/home" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
        <Image className='p-0 m-0' width={100} src='/icons/kitchen-accountance-logo.svg'/>
      </Link>
      </div>
      <div className="mb-auto bg-light text-center d-flex flex-wrap flex-row flex-md-column align-items-center">
      {hasPermission(UserPermissions.CRUD_DISTRIBUTORS)||hasPermission(UserPermissions.READ_DISTRIBUTORS) ?
        <Link className="p-3 nav-link border-bottom" to="/distributors/all">Поставщики</Link>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_INGREDIENTS)||hasPermission(UserPermissions.READ_INGREDIENTS) ?
        <Link className="p-3 nav-link border-bottom" to="/ingredients/all">Ингредиенты</Link>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_DISHES)||hasPermission(UserPermissions.READ_DISHES) ?
        <Link className="p-3 nav-link border-bottom" to="/dishes/all">Блюда</Link>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_PRODUCTS)||hasPermission(UserPermissions.READ_PRODUCTS) ?
        <Link className="p-3 nav-link border-bottom" to="/products/all">Продукты</Link>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_DISTRIBUTORS)||hasPermission(UserPermissions.READ_DISTRIBUTORS) ?
        <Link className="p-3 nav-link border-bottom" to="/purchase-options/all">Позиции закупки</Link>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_USERS)||hasPermission(UserPermissions.READ_USERS) ?
        <Link className="p-3 nav-link border-bottom" to="/users">Пользователи</Link>
      : <></>
      }
    <div className="p-3 dropdown border-bottom">
      <a href="#" className="link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
        Профиль
      </a>
      <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
        {
          isSignedIn == 'true'
          ? <>
              <li><Link className="nav-link" to='/profile'>Профиль</Link></li>
              <li><Link className="nav-link" to='' onClick={signOut}>Выйти</Link></li>

            </>
          : <>
              <li><Link className="nav-link" to='/signin'>Вход</Link></li>
              <li><Link className="nav-link" to='/signup'>Регистрация</Link></li>
            </>
        }
      </ul>
    </div>
    </div>
  </div>
  )
}

export default Navbar
