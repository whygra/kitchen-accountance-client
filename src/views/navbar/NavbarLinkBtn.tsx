import { ReactElement, useContext, useEffect, useState } from 'react'
import { Container, Navbar as BSNavbar, Nav, NavbarBrand, Row, Col, Image, Button, NavbarCollapse, NavbarToggle, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { appContext } from '../../context/AppContextProvider'
import ConfirmationDialog from '../shared/ConfirmationDialog'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContextProvider'
import { UserPermissions } from '../../models'
import { EmailVerificationRequired } from '../EmailVerificationRequired'
import { projectContext } from '../../context/ProjectContextProvider'
import { useMediaQuery } from 'react-responsive'

interface NavbarLinkBtnProps {
  hasAnyPermissions?: UserPermissions[]
  dropdownMenuContent?: ReactElement
  to: string
  dropDirection?: 'dropdown'|'dropup'|'dropend'|'dropstart'
  children: ReactElement|string
}

function NavbarLinkBtn({hasAnyPermissions, dropdownMenuContent, to, children, dropDirection}:NavbarLinkBtnProps) {

  const {hasPermission} = useContext(projectContext)

  return (hasAnyPermissions && hasAnyPermissions.filter(p=>hasPermission(p)).length==0) ? <></> : (
    <div 
      className={`p-0 border-bottom btn-tag d-flex flex-row ${dropDirection??'dropdown'}`}>
      <Link className={`link-dark text-decoration-none ${dropdownMenuContent?'w-75':'w-100'}`} to={to}>
        <Button variant='light'
          className='w-100 py-3 ps-2 pe-2 text-start'
        >{children}</Button>
      </Link>
      { dropdownMenuContent
        ?
        <>
        <Button variant='light'
          className="py-3 link-dark text-decoration-none dropdown-toggle dropdown-toggle-split" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        ></Button>
        <ul
          className="dropdown-menu dropdown-menu-right text-small shadow text-wrap">
          {dropdownMenuContent}
        </ul>
        </>
        : <></>
      }
    </div>
  )
}       

export default NavbarLinkBtn
