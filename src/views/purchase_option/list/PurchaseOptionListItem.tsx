import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PurchaseOptionProductsTable from '../details/PurchaseOptionProductsTable';
import { UserPermissions } from '../../../models';
import { deletePurchaseOption as requestDelete, PurchaseOptionDTO } from '../../../api/purchaseOptions';
import CUDButtons from '../../shared/CUDButtons';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { ErrorView } from '../../ErrorView';


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
            <Row className='d-flex w-100 pe-4'>
                <div style={{width:'18%'}} className='flex-fill text-center d-none d-md-block'>{purchaseOption.distributor?.name}</div>
                <div style={{width:'11%'}} className='flex-fill text-center d-none d-lg-block'>{purchaseOption.code}</div>
                <div style={{width:'22%'}} className='flex-fill text-center'>{purchaseOption.name}</div>
                <div style={{width:'16%'}} className='flex-fill text-center d-none d-lg-block'>{purchaseOption.unit.short}</div>
                <div style={{width:'16%'}} className='flex-fill text-center d-none d-md-block'>{purchaseOption.net_weight}</div>
                <div style={{width:'11%'}} className='flex-fill text-center'>{purchaseOption.price}₽</div>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><PurchaseOptionProductsTable purchaseOption={purchaseOption}/></small>

                <div className='d-flex justify-content-between'>
                    <CUDButtons
                        deleteFn={deletePurchaseOption}
                        entity={purchaseOption}
                        path='purchase-options'
                        requiredPermission={UserPermissions.CRUD_DISTRIBUTORS}
                    />   
                    <Link to={`/purchase-options/details/${purchaseOption.id}`}><Button variant='info'>Подробнее</Button></Link>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default PurchaseOptionListItem;