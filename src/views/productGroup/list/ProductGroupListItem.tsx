import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductGroupDTO, deleteProductGroup as requestDeleteProductGroup } from '../../../api/nomenclature/productGroups';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import ProductsTableHeader from '../../product/list/ProductsTableHeader';
import useProductsTableHeader from '../../../hooks/useProductsTableHeader';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import ProductsTableItem from '../../product/list/ProductsTableItem';
import ProductsTable from '../../product/list/ProductsTable';
import ProductGroupsTableItem from './ProductGroupTableItem';

interface ProductGroupListItemProps {
    productGroup: ProductGroupDTO
    onDelete: ()=>void
  }

function ProductGroupListItem({productGroup, onDelete}: ProductGroupListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteProductGroup = (id: number) => {
        requestDeleteProductGroup(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${productGroup.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 text-center'>
                <ProductGroupsTableItem productgroup={productGroup}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <h5 className='w-100 text-center'>Продукты</h5>
                <ProductsTable products={productGroup.products??[]} fieldsToExclude={[ProductField.Group]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/product-groups/details/${productGroup.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteProductGroup}
                        entity={productGroup}
                        path='product-groups'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default ProductGroupListItem;