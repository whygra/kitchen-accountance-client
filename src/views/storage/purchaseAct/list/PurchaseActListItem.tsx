import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { PurchaseActDTO } from '../../../../api/storage/purchaseActs';
import { Link } from 'react-router-dom';
import PurchaseActItemsTable from '../details/PurchaseActItemsTable';
import { useContext } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { deletePurchaseAct as requestDeletePurchaseAct } from '../../../../api/storage/purchaseActs';
import ConfirmationDialog from '../../../shared/ConfirmationDialog';
import { UserPermissions } from '../../../../models';
import BtnAskConfirmation from '../../../shared/BtnAskConfirmation';
import { authContext } from '../../../../context/AuthContextProvider';
import CUDButtons from '../../../shared/CUDButtons';
import PurchaseActTableItem from './PurchaseActTableItem';


interface PurchaseActListItemProps {
    onDelete: ()=>void
    purchaseAct: PurchaseActDTO
  }

function PurchaseActListItem({onDelete, purchaseAct}: PurchaseActListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    const deletePurchaseAct = (id: number) => {
        requestDeletePurchaseAct(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${purchaseAct.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 pe-none'>
                <PurchaseActTableItem purchaseAct={purchaseAct}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small><PurchaseActItemsTable purchaseAct={purchaseAct}/></small>
            <div className='d-flex justify-content-between'>
                <Link to={`/purchase-acts/details/${purchaseAct.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deletePurchaseAct}
                    entity={{...purchaseAct, name:purchaseAct.date}}
                    path='purchase-acts'
                    requiredPermission={UserPermissions.CRUD_STORAGE}
                />   
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default PurchaseActListItem;