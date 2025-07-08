import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { InventoryActDTO } from '../../../../api/storage/inventoryActs';
import { Link } from 'react-router-dom';
import InventoryActProductsTable from '../details/InventoryActProductsTable';
import { useContext } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { deleteInventoryAct as requestDeleteInventoryAct } from '../../../../api/storage/inventoryActs';
import ConfirmationDialog from '../../../shared/ConfirmationDialog';
import { UserPermissions } from '../../../../models';
import BtnAskConfirmation from '../../../shared/BtnAskConfirmation';
import { authContext } from '../../../../context/AuthContextProvider';
import CUDButtons from '../../../shared/CUDButtons';
import InventoryActTableItem from './InventoryActTableItem';
import InventoryActIngredientsTable from '../details/InventoryActIngredientsTable';


interface InventoryActListItemProps {
    onDelete: ()=>void
    inventoryAct: InventoryActDTO
  }

function InventoryActListItem({onDelete, inventoryAct}: InventoryActListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    const deleteInventoryAct = (id: number) => {
        requestDeleteInventoryAct(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${inventoryAct.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 pe-none'>
                <InventoryActTableItem inventoryAct={inventoryAct}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small><InventoryActProductsTable inventoryAct={inventoryAct}/></small>
            <small><InventoryActIngredientsTable inventoryAct={inventoryAct}/></small>
            <div className='d-flex justify-content-between'>
                <Link to={`/inventory-acts/details/${inventoryAct.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deleteInventoryAct}
                    entity={{...inventoryAct, name:inventoryAct.date}}
                    path='inventory-acts'
                    requiredPermission={UserPermissions.CRUD_STORAGE}
                />   
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default InventoryActListItem;