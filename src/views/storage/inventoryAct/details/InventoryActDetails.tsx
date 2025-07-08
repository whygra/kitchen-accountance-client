import { Accordion, Button, Card, Col, Form, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { InventoryActDTO, deleteInventoryAct, getInventoryActWithItems } from '../../../../api/storage/inventoryActs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { UserPermissions } from '../../../../models';
import CUDButtons from '../../../shared/CUDButtons';
import Loading from '../../../shared/Loading';
import UpdatedAt from '../../../shared/UpdatedAt';
import InventoryActProductsTable from './InventoryActProductsTable';
import InventoryActIngredientsTable from './InventoryActIngredientsTable';


function InventoryActDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [inventoryAct, setInventoryAct] = useState<InventoryActDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        document.title = `Акт инвентаризации "${inventoryAct?.date}"`}
    , [inventoryAct])

    useEffect(()=>{loadInventoryAct()}, [])

    async function loadInventoryAct() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id акта инвентаризации")
            
            setIsLoading(true)
            const inventoryAct = await getInventoryActWithItems(parseInt(id??'0'))
            
            if (inventoryAct === null)
                throw Error("Не удалось получить данные акта инвентаризации")
            

            setInventoryAct(inventoryAct)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deleteInventoryAct(id)
        navigate('/inventory-acts/all')
    }

    return isLoading ? (<Loading/>) : 
           inventoryAct===null ? (<>Не удалось получить данные акта инвентаризации</>) : (
        <>
            <Row className='mt-5'>
                
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={{...inventoryAct, name:inventoryAct.date}}
                        path='inventory-acts'
                        requiredPermission={UserPermissions.CRUD_STORAGE}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{inventoryAct.date}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={inventoryAct}/>
                </Col>
                
                <Col md={12}>
                    <InventoryActProductsTable inventoryAct={inventoryAct}/>
                </Col>
                
                <Col md={12}>
                    <InventoryActIngredientsTable inventoryAct={inventoryAct}/>
                </Col>
            </Row>
        </>
    )
}

export default InventoryActDetails;