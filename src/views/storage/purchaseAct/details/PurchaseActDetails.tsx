import { Accordion, Button, Card, Col, Form, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { PurchaseActDTO, deletePurchaseAct, getPurchaseActWithItems } from '../../../../api/storage/purchaseActs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { UserPermissions } from '../../../../models';
import CUDButtons from '../../../shared/CUDButtons';
import Loading from '../../../shared/Loading';
import UpdatedAt from '../../../shared/UpdatedAt';
import PurchaseActItemsTable from './PurchaseActItemsTable';


function PurchaseActDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [purchaseAct, setPurchaseAct] = useState<PurchaseActDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        document.title = `Акт инвентаризации "${purchaseAct?.date}"`}
    , [purchaseAct])

    useEffect(()=>{loadPurchaseAct()}, [])

    async function loadPurchaseAct() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id акта инвентаризации")
            
            setIsLoading(true)
            const purchaseAct = await getPurchaseActWithItems(parseInt(id??'0'))
            
            if (purchaseAct === null)
                throw Error("Не удалось получить данные акта инвентаризации")
            

            setPurchaseAct(purchaseAct)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deletePurchaseAct(id)
        navigate('/purchase-acts/all')
    }

    return isLoading ? (<Loading/>) : 
           purchaseAct===null ? (<>Не удалось получить данные акта инвентаризации</>) : (
        <>
            <Row className='mt-5'>
                
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={{...purchaseAct, name:purchaseAct.date}}
                        path='purchase-acts'
                        requiredPermission={UserPermissions.CRUD_STORAGE}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{purchaseAct.date}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={purchaseAct}/>
                </Col>
                

                    <Table>
                        <tbody>
                            <tr><th>Поставщик:</th><th>Общая стоимость:</th></tr>
                            <tr><td>{purchaseAct.distributor?.name}</td><td>{purchaseAct.total_cost} руб.</td></tr>
                        </tbody>
                    </Table>

                <Col md={12}>
                    <PurchaseActItemsTable purchaseAct={purchaseAct}/>
                </Col>
                
            </Row>
        </>
    )
}

export default PurchaseActDetails;