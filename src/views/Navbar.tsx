import { useContext, useEffect, useState } from 'react'
import { Container, Navbar as BSNavbar, Nav, NavbarBrand, Row, Col, Image, Button, NavbarCollapse, NavbarToggle, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { signOut as requestSignOut } from '../api/auth'
import { appContext } from '../context/AppContextProvider'
import ConfirmationDialog from './shared/ConfirmationDialog'
import { getCookie } from '../cookies'
import { C_IS_SIGNED_IN } from '../api/constants'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContextProvider'
import { UserPermissions } from '../models'
import { VerifyEmail } from './VerifyEmail'
import { EmailVerificationRequired } from './EmailVerificationRequired'
import { projectContext } from '../context/ProjectContextProvider'
import $ from 'jquery'
import { useMediaQuery } from 'react-responsive'


function Navbar() {
  const{ showModal, hideModal} = useContext(appContext)
  const {user, updateUserData} = useContext(authContext)
  const {hasPermission, project} = useContext(projectContext)
  const isSignedIn = getCookie(C_IS_SIGNED_IN)
  const navigate = useNavigate()

  const isAboveMd = useMediaQuery({ minWidth: 768 });

  function signOut(){
    showModal(
    <ConfirmationDialog 
      prompt={'Вы действительно хотите выйти?'}
      onCancel={hideModal}
      onConfirm={async ()=>{
        await requestSignOut()
        .catch(e=>{
          hideModal()
          showModal(<div className='p-2'>{e.message}</div>, <b>{e.name}</b>)
        })
        await updateUserData()
        hideModal()
        navigate('/home')
      }}
    />)
  }
  return (
    <BSNavbar expand="md" 
    style={{overflowY: 'auto', overflowX: 'clip'}}

      className="p-0 fixed-left bg-light text-center d-flex flex-row flex-nowrap flex-md-column h-100 justify-content-between align-items-start align-items-md-center pb-0">
      <div 

        className='p-0 m-0 d-flex justify-content-start'>
        <Link 
          to="/home" className="logo d-block p-3 link-dark text-decoration-none" title="Главная" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
          <Image 
            style={project ? {
                filter: 'blur(2.2px) opacity(30%)'
              } : {}}
            className='p-0 m-0' width='100%' src='/icons/kitchen-accountance-logo.svg'
          />
        </Link>
        {project 
        ?
        <div 
          className={`logo dropdown p-0 mt-0 position-absolute btn-group d-flex flex-row justify-content-between`}>
          
          <Link 
            className='flex-grow-1 link-dark text-decoration-none'
            title={project.name} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only"
            to={`/projects/details/${project.id}`}
          >
            <div className='w-100 h-100 p-3 m-0 d-flex justify-content-center align-items-center fw-bolder text-wrap'>
              {project.logo?.url ?? '' != ''
              ? <Image
                  className='w-100 m-0' 
                  src={project.logo?.url} 
                  alt={project.name}
                />
              : <span className='text-decoration-underline h2'>{project.name}</span>
            }
            </div>
          </Link>
        <Link 
          to={'#'}
          className="link-dark position-absolute top-0 end-0 text-decoration-none dropdown-toggle dropdown-toggle-split" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        ></Link>
        <ul className="dropdown-menu position-absolute translate-middle top-50 start-50 text-small">
          <li><Link className="nav-link" to='/projects/all'>Сменить проект</Link></li>
        </ul>
        </div>
        :
        <></>
      }
      </div>

      <div

       className="mb-auto h-100 bg-light text-center d-flex flex-wrap flex-row flex-md-column justify-content-center align-items-center p-0">
        <NavbarCollapse 
          className='collapse navbar-collapse' 
          id="collapsableNav"
        >
      <div className="mb-auto h-100 bg-light text-center d-flex flex-wrap flex-row flex-md-column justify-content-center justify-content-md-start align-items-center pb-0">

          {hasPermission(UserPermissions.CRUD_DISHES)||hasPermission(UserPermissions.READ_DISHES) ?
            <div className="py-3 px-1 pe-0 border-bottom btn-group dropdown">
              <Link className="link-dark text-decoration-none" to="/dishes/all">Блюда</Link>
              <Link 
                to={'#'}
                className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              ></Link>
              <ul className="position-absolute dropdown-menu text-small shadow">
                <li><Link className="nav-link" to='/dish-categories'>Категории</Link></li>
                <li><Link className="nav-link" to='/dish-groups'>Группы</Link></li>
              </ul>
            </div>
          : <></>
          }
          
          {hasPermission(UserPermissions.CRUD_INGREDIENTS)||hasPermission(UserPermissions.READ_INGREDIENTS) ?
            <div className="py-3 px-1 pe-0 border-bottom btn-group dropdown">
              <Link className="link-dark text-decoration-none" to="/ingredients/all">Ингредиенты</Link>
              <Link 
                to={'#'}
                className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              ></Link>
              <ul className="dropdown-menu text-small shadow">
                <li><Link className="nav-link" to='/ingredient-categories'>Категории</Link></li>
                <li><Link className="nav-link" to='/ingredient-groups'>Группы</Link></li>
              </ul>
            </div>
          : <></>
          }
          {hasPermission(UserPermissions.CRUD_PRODUCTS)||hasPermission(UserPermissions.READ_PRODUCTS) ?
            <div className="py-3 px-1 pe-0 border-bottom btn-group dropdown">
              <Link className="link-dark text-decoration-none" to="/products/all">Продукты</Link>
              <Link 
                to={'#'}
                className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              ></Link>
              <ul className="dropdown-menu text-small shadow">
                <li><Link className="nav-link" to='/product-categories'>Категории</Link></li>
                <li><Link className="nav-link" to='/product-groups'>Группы</Link></li>
              </ul>
            </div>
          : <></>
          }
          {hasPermission(UserPermissions.CRUD_DISTRIBUTORS)||hasPermission(UserPermissions.READ_DISTRIBUTORS) ?
            <div className="py-3 px-1 pe-0 border-bottom btn-group dropdown">
            <Link className="link-dark text-decoration-none" to="/distributors/all">Поставщики</Link>
            <Link 
              to={'#'}
              className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            ></Link>
            <ul className="dropdown-menu text-small shadow text-wrap">
              <li><Link className="nav-link" to="/purchase-options/all">Позиции закупки</Link></li>
              <li><Link className="nav-link" to='/units/all'>Ед. измерения</Link></li>
            </ul>
          </div>
          : <></>
          }
          {hasPermission(UserPermissions.CRUD_USERS)||hasPermission(UserPermissions.READ_USERS) ?
            <Link className="py-3 px-1 nav-link border-bottom" to="/users">Пользователи</Link>
          : <></>
          }
          </div>
        </NavbarCollapse>
        <div className='d-flex justify-content-center w-100'>
          <NavbarToggle className='my-2' aria-controls="collapsableNav" />
        </div>

          </div>
    
    <div 
      
    className={`${isAboveMd ? 'dropup' : 'dropdown'} py-3 px-2 d-flex align-items-center align-items-md-end text-center btn-group`}>

    <Link className="link-dark text-decoration-none" to={isSignedIn ? '/profile' : '/signin'}>
      Профиль
    </Link>
    <Link 
      to={'#'}
      className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
    ></Link>

    <ul className={` dropdown-menu ${isAboveMd?'dropdown-menu-start':'dropdown-menu-end'} text-small shadow`}>
      {
        isSignedIn == 'true'
        ? <>
            {user?.email_verified_at
              ? <></>
              : <li><Link to='' onClick={()=>showModal(<EmailVerificationRequired/>)} className="nav-link text-success">Подтвердить email</Link></li>
            }
          <li><Link className="nav-link" to='/projects/all'>Мои проекты</Link></li>
          <li><Link className="nav-link" to='' onClick={signOut}>Выйти</Link></li>
          </>
        : <>
            <li><Link className="nav-link" to='/signin'>Вход</Link></li>
            <li><Link className="nav-link" to='/signup'>Регистрация</Link></li>
          </>
      }
    </ul>
    
  </div>
  </BSNavbar>
  )
}

export default Navbar
