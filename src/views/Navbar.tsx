import { useContext, useState } from 'react'
import { Container, Navbar as BSNavbar, Nav, NavbarBrand, Row, Col, Image, Button } from 'react-bootstrap'
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


function Navbar() {
  const{ showModal, hideModal} = useContext(appContext)
  const {user, updateUserData} = useContext(authContext)
  const {hasPermission, project} = useContext(projectContext)
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
    <div className="fixed-left bg-light text-center d-flex flex-row flex-md-column h-100 justify-content-center align-items-center pb-0">
      <div className='d-flex text-center justify-content-center'>
        <Link to="/home" className="d-block p-3 link-dark text-decoration-none" title="Главная" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
          <Image 
            style={project ? {
                filter: 'blur(2.2px) opacity(30%)'
              } : {}}
            className='p-0 m-0' width='80em' src='/icons/kitchen-accountance-logo.svg'
          />
        </Link>
        {project 
        ?
        <div className="p-3 pe-0 position-absolute border-bottom btn-group dropend">
          
          <Link 
            className='link-dark text-decoration-none'
            title={project.name} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only"
            to={`/projects/details/${project.id}`}
          >
            <Image
              className='p-0 ps-1 m-0' 
              width='80em' 
              src={project.logo?.url} 
              alt={project.name}
            />
          </Link>
        <Link 
          to={'#'}
          className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        ></Link>
        <ul className="ps-3 dropdown-menu text-small shadow">
          <li><Link className="nav-link" to='/projects/all'>Сменить проект...</Link></li>
        </ul>
        </div>
        :
        <></>
      }
      </div>
      <div className="mb-auto bg-light text-center d-flex flex-wrap flex-row flex-md-column justify-content-center align-items-center pb-0">
      {hasPermission(UserPermissions.CRUD_DISTRIBUTORS)||hasPermission(UserPermissions.READ_DISTRIBUTORS) ?
        <div className="p-3 pe-0 border-bottom btn-group dropend">
        <Link className="link-dark text-decoration-none" to="/distributors/all">Поставщики</Link>
        <Link 
          to={'#'}
          className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        ></Link>
        <ul className="ps-3 dropdown-menu text-small shadow">
          <li><Link className="nav-link" to="/purchase-options/all">Позиции закупки</Link></li>
          <li><Link className="nav-link" to='/units/all'>Единицы измерения</Link></li>
        </ul>
      </div>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_INGREDIENTS)||hasPermission(UserPermissions.READ_INGREDIENTS) ?
        <div className="p-3 pe-0 border-bottom btn-group dropend">
          <Link className="link-dark text-decoration-none" to="/ingredients/all">Ингредиенты</Link>
          <Link 
            to={'#'}
            className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          ></Link>
          <ul className="ps-3 dropdown-menu text-small shadow">
            <li><Link className="nav-link" to='/ingredient-categories'>Категории</Link></li>
            <li><Link className="nav-link" to='/ingredient-groups'>Группы</Link></li>
          </ul>
        </div>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_DISHES)||hasPermission(UserPermissions.READ_DISHES) ?
        <div className="p-3 pe-0 border-bottom btn-group dropend">
          <Link className="link-dark text-decoration-none" to="/dishes/all">Блюда</Link>
          <Link 
            to={'#'}
            className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          ></Link>
          <ul className="ps-3 dropdown-menu text-small shadow">
            <li><Link className="nav-link" to='/dish-categories'>Категории</Link></li>
            <li><Link className="nav-link" to='/dish-groups'>Группы</Link></li>
          </ul>
        </div>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_PRODUCTS)||hasPermission(UserPermissions.READ_PRODUCTS) ?
        <div className="p-3 pe-0 border-bottom btn-group dropend">
          <Link className="link-dark text-decoration-none" to="/products/all">Продукты</Link>
          <Link 
            to={'#'}
            className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          ></Link>
          <ul className="ps-3 dropdown-menu text-small shadow">
            <li><Link className="nav-link" to='/product-categories'>Категории</Link></li>
            <li><Link className="nav-link" to='/product-groups'>Группы</Link></li>
          </ul>
        </div>
      : <></>
      }
      {hasPermission(UserPermissions.CRUD_USERS)||hasPermission(UserPermissions.READ_USERS) ?
        <Link className="p-3 nav-link border-bottom" to="/users">Пользователи</Link>
      : <></>
      }
    </div>
    
    <div className="p-3 pe-0 text-center border-top btn-group dropend">

    <Link className="link-dark text-decoration-none" to='/profile'>
      Профиль
    </Link>
    <Link 
      to={'#'}
      className="link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
      data-bs-toggle="dropdown" 
      aria-expanded="false"
    ></Link>

    <ul className="ps-3 dropdown-menu text-small shadow">
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
  </div>
  )
}

export default Navbar
