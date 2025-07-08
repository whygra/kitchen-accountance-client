import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserPermissions } from '../../../models';
import { deletePurchaseOption as requestDelete, PurchaseOptionDTO } from '../../../api/nomenclature/purchaseOptions';
import CUDButtons from '../../shared/CUDButtons';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { ErrorView } from '../../ErrorView';
import ProductsTable from '../../product/list/ProductsTable';
import PurchaseOptionsTableItem from '../table/PurchaseOptionsTableItem';


interface PurchaseOptionListItemProps {
    onDelete: ()=>void
    purchaseOption: PurchaseOptionDTO
  }

function PurchaseOptionListItem({onDelete, purchaseOption}: PurchaseOptionListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    function deletePurchaseOption() {
        requestDelete(purchaseOption.id)
            .catch(e=>showModal(<ErrorView error={e}/>))
            .then(r=>{
                onDelete()
                showModal(<>Удалена позиция закупки: {r?.id}.{r?.name}</>)
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${purchaseOption.id}`}>
        <Accordion.Header className='ms-0' style={{userSelect: 'text'}}>
            <div className='d-flex w-100'>
                <PurchaseOptionsTableItem purchaseOption={purchaseOption}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small><ProductsTable products={purchaseOption.products??[]} fieldsToExclude={[]}/></small>

                <div className='d-flex justify-content-between'>
                    <Link to={`/purchase-options/details/${purchaseOption.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deletePurchaseOption}
                        entity={purchaseOption}
                        path='purchase-options'
                        requiredPermission={UserPermissions.CRUD_DISTRIBUTORS}
                    />   
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default PurchaseOptionListItem;