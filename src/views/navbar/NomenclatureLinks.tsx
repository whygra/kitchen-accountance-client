import { Link } from "react-router-dom";
import { UserPermissions } from "../../models";
import NavbarLinkBtn from "./NavbarLinkBtn";

function NomenclatureLinks() {
  return (
    <div className="mb-auto h-100 bg-light text-center d-flex flex-wrap flex-row flex-md-column justify-content-center justify-content-md-start align-items-center pb-0">

          <NavbarLinkBtn
            to='/dishes/all'
            hasAnyPermissions={[UserPermissions.CRUD_DISHES, UserPermissions.READ_DISHES]}
            dropdownMenuContent={<>
              <li><Link className="nav-link" to='/dish-categories'>Категории</Link></li>
              <li><Link className="nav-link" to='/dish-groups'>Группы</Link></li>
              </>}
          >Блюда</NavbarLinkBtn>

          <NavbarLinkBtn 
            to='/ingredients/all'
            hasAnyPermissions={[UserPermissions.CRUD_INGREDIENTS, UserPermissions.READ_INGREDIENTS]}
            dropdownMenuContent={<>
              <li><Link className="nav-link" to='/ingredient-categories'>Категории</Link></li>
              <li><Link className="nav-link" to='/ingredient-groups'>Группы</Link></li>
              </>}
          >Ингредиенты</NavbarLinkBtn>

          <NavbarLinkBtn 
            to='/products/all'
            hasAnyPermissions={[UserPermissions.CRUD_PRODUCTS, UserPermissions.READ_PRODUCTS]}
            dropdownMenuContent={<>
              <li><Link className="nav-link" to='/product-categories'>Категории</Link></li>
              <li><Link className="nav-link" to='/product-groups'>Группы</Link></li>
              </>}
          >Продукты</NavbarLinkBtn>

          <NavbarLinkBtn 
            to='/distributors/all'
            hasAnyPermissions={[UserPermissions.CRUD_DISTRIBUTORS, UserPermissions.READ_DISTRIBUTORS]}
            dropdownMenuContent={<>
              <li><Link className="text-wrap nav-link" to="/purchase-options/all">Позиции закупки</Link></li>
              <li><Link className="text-wrap nav-link" to='/units/all'>Единицы измерения</Link></li>
              </>}
          >Поставщики</NavbarLinkBtn>

          </div>
  )
}

export default NomenclatureLinks