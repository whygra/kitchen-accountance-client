import { Link } from "react-router-dom";
import { UserPermissions } from "../../models";
import NavbarLinkBtn from "./NavbarLinkBtn";

function StorageLinks() {
  return (
    <div className="mb-auto h-100 bg-light text-center d-flex flex-wrap flex-row flex-md-column justify-content-center justify-content-md-start align-items-center pb-0">

      <NavbarLinkBtn
        to='/inventory-acts/all'
      >Инвентаризация</NavbarLinkBtn>

      <NavbarLinkBtn 
        to='/write-off-acts/all'
      >Списание</NavbarLinkBtn>

      <NavbarLinkBtn 
        to='/purchase-acts/all'
      >Закупки</NavbarLinkBtn>

      <NavbarLinkBtn 
        to='/sale-acts/all'
      >Продажи</NavbarLinkBtn>

      <NavbarLinkBtn 
        to='/reports'
      >Отчеты</NavbarLinkBtn>
          
    </div>
  )
}

export default StorageLinks