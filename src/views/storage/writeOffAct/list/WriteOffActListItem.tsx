import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { WriteOffActDTO } from '../../../../api/storage/writeOffActs';
import { Link } from 'react-router-dom';
import WriteOffActProductsTable from '../details/WriteOffActProductsTable';
import { useContext } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { deleteWriteOffAct as requestDeleteWriteOffAct } from '../../../../api/storage/writeOffActs';
import { UserPermissions } from '../../../../models';
import CUDButtons from '../../../shared/CUDButtons';
import WriteOffActTableItem from './WriteOffActTableItem';
import WriteOffActIngredientsTable from '../details/WriteOffActIngredientsTable';


interface WriteOffActListItemProps {
    onDelete: ()=>void
    writeOffAct: WriteOffActDTO
  }

function WriteOffActListItem({onDelete, writeOffAct}: WriteOffActListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    const deleteWriteOffAct = (id: number) => {
        requestDeleteWriteOffAct(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${writeOffAct.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 pe-none'>
                <WriteOffActTableItem writeOffAct={writeOffAct}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small><WriteOffActProductsTable writeOffAct={writeOffAct}/></small>
            <small><WriteOffActIngredientsTable writeOffAct={writeOffAct}/></small>
            <div className='d-flex justify-content-between'>
                <Link to={`/write-off-acts/details/${writeOffAct.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deleteWriteOffAct}
                    entity={{...writeOffAct, name:writeOffAct.date}}
                    path='write-off-acts'
                    requiredPermission={UserPermissions.CRUD_STORAGE}
                />   
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default WriteOffActListItem;