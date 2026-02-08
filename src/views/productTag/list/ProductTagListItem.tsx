import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductTagDTO, deleteProductTag as requestDeleteProductTag } from '../../../api/nomenclature/productTags';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import { ProductField } from '../../../hooks/sort/useSortProducts';
import ProductsTable from '../../product/list/ProductsTable';
import ProductTagsTableItem from './ProductTagTableItem';

interface ProductTagListItemProps {
    productTag: ProductTagDTO
    onDelete: ()=>void
  }

function ProductTagListItem({productTag, onDelete}: ProductTagListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteProductTag = (id: number) => {
        requestDeleteProductTag(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${productTag.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 text-center'>
                <ProductTagsTableItem producttag={productTag}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <h5 className='w-100 text-center'>Продукты</h5>
                <ProductsTable products={productTag.products??[]} fieldsToExclude={[ProductField.Tag]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/product-tags/details/${productTag.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteProductTag}
                        entity={productTag}
                        path='product-tags'
                        requiredPermission={UserPermissions.CRUD_PRODUCTS}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default ProductTagListItem;