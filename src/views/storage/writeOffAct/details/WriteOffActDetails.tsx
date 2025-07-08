import { Accordion, Button, Card, Col, Form, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { WriteOffActDTO, deleteWriteOffAct, getWriteOffActWithItems } from '../../../../api/storage/writeOffActs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { UserPermissions } from '../../../../models';
import CUDButtons from '../../../shared/CUDButtons';
import Loading from '../../../shared/Loading';
import UpdatedAt from '../../../shared/UpdatedAt';
import WriteOffActProductsTable from './WriteOffActProductsTable';
import WriteOffActIngredientsTable from './WriteOffActIngredientsTable';


function WriteOffActDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [writeOffAct, setWriteOffAct] = useState<WriteOffActDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        document.title = `Акт списания "${writeOffAct?.date}"`}
    , [writeOffAct])

    useEffect(()=>{loadWriteOffAct()}, [])

    async function loadWriteOffAct() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id акта списания")
            
            setIsLoading(true)
            const writeOffAct = await getWriteOffActWithItems(parseInt(id??'0'))
            
            if (writeOffAct === null)
                throw Error("Не удалось получить данные акта списания")
            

            setWriteOffAct(writeOffAct)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deleteWriteOffAct(id)
        navigate('/write-off-acts/all')
    }

    return isLoading ? (<Loading/>) : 
           writeOffAct===null ? (<>Не удалось получить данные акта списания</>) : (
        <>
            <Row className='mt-5'>
                
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={{...writeOffAct, name:writeOffAct.date}}
                        path='write-off-acts'
                        requiredPermission={UserPermissions.CRUD_STORAGE}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{writeOffAct.date}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={writeOffAct}/>
                </Col>
                
                <Col md={12}>
                    <WriteOffActProductsTable writeOffAct={writeOffAct}/>
                </Col>
                
                <Col md={12}>
                    <WriteOffActIngredientsTable writeOffAct={writeOffAct}/>
                </Col>
            </Row>
        </>
    )
}

export default WriteOffActDetails;