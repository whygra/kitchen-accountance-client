import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { SaleActDTO } from '../../../../api/storage/saleActs';
import { Link } from 'react-router-dom';
import SaleActDishesTable from '../details/SaleActDishesTable';
import { useContext } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { deleteSaleAct as requestDeleteSaleAct } from '../../../../api/storage/saleActs';
import ConfirmationDialog from '../../../shared/ConfirmationDialog';
import { UserPermissions } from '../../../../models';
import BtnAskConfirmation from '../../../shared/BtnAskConfirmation';
import { authContext } from '../../../../context/AuthContextProvider';
import CUDButtons from '../../../shared/CUDButtons';
import SaleActTableItem from './SaleActTableItem';
import SaleActItemsTable from '../details/SaleActDishesTable';


interface SaleActListItemProps {
    onDelete: ()=>void
    saleAct: SaleActDTO
  }

function SaleActListItem({onDelete, saleAct}: SaleActListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    const deleteSaleAct = (id: number) => {
        requestDeleteSaleAct(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${saleAct.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 pe-none'>
                <SaleActTableItem saleAct={saleAct}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small><SaleActDishesTable saleAct={saleAct}/></small>
            <small><SaleActItemsTable saleAct={saleAct}/></small>
            <div className='d-flex justify-content-between'>
                <Link to={`/sale-acts/details/${saleAct.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deleteSaleAct}
                    entity={{...saleAct, name:saleAct.date}}
                    path='sale-acts'
                    requiredPermission={UserPermissions.CRUD_STORAGE}
                />   
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default SaleActListItem;