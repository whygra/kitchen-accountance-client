import { useContext, useEffect, useState } from 'react'
import { Container, Navbar as BSNavbar, Nav, NavbarBrand, Row, Col, Image, Button, NavbarCollapse, NavbarToggle, OverlayTrigger, Tooltip, TabContainer, Tab } from 'react-bootstrap'
import { appContext } from '../../context/AppContextProvider'
import ConfirmationDialog from '../shared/ConfirmationDialog'
import { getCookie } from '../../cookies'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContextProvider'
import { UserPermissions } from '../../models'
import { VerifyEmail } from '../VerifyEmail'
import { EmailVerificationRequired } from '../EmailVerificationRequired'
import { projectContext } from '../../context/ProjectContextProvider'
import { useMediaQuery } from 'react-responsive'
import { ErrorView } from '../ErrorView'
import NavbarLinkBtn from './NavbarLinkBtn'
import NomenclatureLinks from './NomenclatureLinks'
import StorageLinks from './StorageLinks'


function Navbar() {

  const{ showErrorModal, showModal, hideModal} = useContext(appContext)
  const {user, logout, isSignedIn} = useContext(authContext)
  const {hasPermission, project} = useContext(projectContext)

  const isAboveMd = useMediaQuery({ minWidth: 768 });

  function signOut(){
    showModal(
    <ConfirmationDialog 
      prompt={'Вы действительно хотите выйти?'}
      onCancel={hideModal}
      onConfirm={()=>{
        logout()
        .catch(e=>showErrorModal(e))
        .then(res=>hideModal())
      }}
    />)
  }
  return (
    <BSNavbar 
      expand="md" 
      style={isAboveMd ? {overflowY: 'auto', overflowX: 'visible'}:{}}
      className="p-0 fixed-left bg-light text-center d-flex flex-row flex-nowrap flex-md-column h-100 justify-content-between align-items-start align-items-md-center pb-0">
      <div 
        className='p-0 m-0 d-flex justify-content-start'>
          <div 
          className={`logo dropdown p-0 mt-0 btn-tag d-flex flex-row justify-content-between`}>
        <Link 
          to="/home" className="logo d-block p-3 link-dark text-decoration-none" title="Главная" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
          <Image 
            style={project ? {
                filter: 'blur(2.2px) opacity(30%)'
              } : {}}
            className='p-0 m-0' width='100%' src='/icons/kitchen-accountance-logo.svg'
          />
        </Link>
        <Link 
          to={'#'}
          className="link-dark position-absolute top-0 end-0 text-decoration-none dropdown-toggle dropdown-toggle-split" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        ></Link>
        <ul className="dropdown-menu position-absolute translate-middle top-50 start-50 text-small">
          <li><Link className="text-wrap nav-link" to='/projects/all'>Выбрать проект</Link></li>
        </ul>
        </div>
        {project 
        ?
        <div 
          className={`logo dropdown p-0 mt-0 position-absolute btn-tag d-flex flex-row justify-content-between`}>
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
              : <span style={{fontSize: `calc(calc(160pt + 10vw) / ${Math.max(...project.name.split(' ').map(s=>s.length))*1.8})`}} className='text-decoration-underline h2'>{project.name}</span>
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
          <li><Link className="text-wrap nav-link" to='/projects/all'>Сменить проект</Link></li>
        </ul>
        </div>
        :
        <></>
      }
      </div>

      {project ? 
          <Tab.Container defaultActiveKey="nomenclature">
      <div
       className="mb-auto h-100 bg-light text-center d-flex flex-wrap flex-row flex-md-column justify-content-start align-items-start p-0">
        <NavbarCollapse 
          className='collapse navbar-collapse' 
          id="collapsableNav"
        >
            <div className='flex-column'>
                <Nav variant="tabs" className="flex-row justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="nomenclature"><small>номенклатура</small></Nav.Link>
                  </Nav.Item>
                  {hasPermission(UserPermissions.CRUD_STORAGE) || hasPermission(UserPermissions.READ_STORAGE)
                    ? <Nav.Item>
                        <Nav.Link eventKey="storage"><small>склад</small></Nav.Link>
                      </Nav.Item>
                    : <></>
                  }
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="nomenclature">
                    <NomenclatureLinks />
                  </Tab.Pane>
                  {hasPermission(UserPermissions.CRUD_STORAGE) || hasPermission(UserPermissions.READ_STORAGE)
                    ? <Tab.Pane eventKey="storage">
                        <StorageLinks/>
                      </Tab.Pane>
                    : <></>
                  }
                </Tab.Content>
            </div>
        </NavbarCollapse>
        <div className='d-flex justify-content-center w-100'>
          <NavbarToggle className='my-2' aria-controls="collapsableNav" />
        </div>

          </div>
          </Tab.Container>
          :
            <div className="h-100">
              <NavbarLinkBtn 
                to='/projects/all'
              >Проекты</NavbarLinkBtn>
            </div>      
      }
    
      <NavbarLinkBtn
        dropDirection={isAboveMd ? 'dropup' : 'dropdown'}
        to={isSignedIn() ? '/profile' : '/signin'}
        dropdownMenuContent={
          isSignedIn()
          ? <>
              {user?.email_verified_at
                ? <></>
                : <li><Link to='#' onClick={()=>showModal(<EmailVerificationRequired/>)} className="nav-link text-success">Подтвердить email</Link></li>
              }
            <li><Link className="nav-link" to='/projects/all'>Мои проекты</Link></li>
            <li><Link className="nav-link" to='#' onClick={signOut}>Выйти</Link></li>
            </>
          : <>
              <li><Link className="nav-link" to='/signin'>Вход</Link></li>
              <li><Link className="nav-link" to='/signup'>Регистрация</Link></li>
            </>
        }
      >
        Профиль
      </NavbarLinkBtn>
  </BSNavbar>
  )
}

export default Navbar
