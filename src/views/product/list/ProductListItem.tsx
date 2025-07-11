import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductPurchaseOptionsTable from '../details/ProductPurchaseOptionsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { deleteIngredient as requestDeleteIngredient } from '../../../api/nomenclature/ingredients';
import { ProductDTO } from '../../../api/nomenclature/products';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import { projectContext } from '../../../context/ProjectContextProvider';
import ProductsTableItem from './ProductsTableItem';


interface ProductListItemProps {
    onDelete: ()=>void
    product: ProductDTO
  }

function ProductListItem({onDelete, product}: ProductListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)
    const {hasPermission} = useContext(projectContext)

    const deleteProduct = (id: number) => {
        requestDeleteIngredient(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <Accordion.Item eventKey={`${product.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <ProductsTableItem product={product}/>
        </Accordion.Header>
        <Accordion.Body>
            <small><ProductPurchaseOptionsTable product={product}/></small>
                <div className='d-flex justify-content-between'>
                    <Link to={`/products/details/${product.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteProduct}
                        entity={product}
                        path='products'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />   
                </div>
        </Accordion.Body>
        </Accordion.Item>
    )
}

export default ProductListItem;