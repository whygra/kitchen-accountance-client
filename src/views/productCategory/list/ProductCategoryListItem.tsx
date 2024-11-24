import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCategoryDTO, deleteProductCategory as requestDeleteProductCategory } from '../../../api/productCategories';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import ProductsTableHeader from '../../product/list/ProductsTableHeader';
import useProductsTableHeader from '../../../hooks/useProductsTableHeader';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import ProductsTableItem from '../../product/list/ProductsTableItem';
import ProductsTable from '../../product/list/ProductsTable';

interface ProductCategoryListItemProps {
    productCategory: ProductCategoryDTO
    onDelete: ()=>void
  }

function ProductCategoryListItem({productCategory, onDelete}: ProductCategoryListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteProductCategory = (id: number) => {
        requestDeleteProductCategory(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${productCategory.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100 text-center pe-3'>
                <Col xs={4}>{productCategory.id}</Col>
                <Col xs={8}>{productCategory.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <ProductsTable products={productCategory.products??[]} fieldsToExclude={[ProductField.Category]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/product-categories/details/${productCategory.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteProductCategory}
                        entity={productCategory}
                        path='product-categories'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default ProductCategoryListItem;