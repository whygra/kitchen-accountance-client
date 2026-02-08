import { Accordion, Button, Card, Col, Form, ListTag, ListTagItem, Row, Table } from 'react-bootstrap';
import { SaleActDTO, deleteSaleAct, getSaleActWithItems } from '../../../../api/storage/saleActs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../../../context/AppContextProvider';
import { UserPermissions } from '../../../../models';
import CUDButtons from '../../../shared/CUDButtons';
import Loading from '../../../shared/Loading';
import UpdatedAt from '../../../shared/UpdatedAt';
import SaleActItemsTable from './SaleActDishesTable';


function SaleActDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [saleAct, setSaleAct] = useState<SaleActDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        document.title = `Акт продажи "${saleAct?.date}"`}
    , [saleAct])

    useEffect(()=>{loadSaleAct()}, [])

    async function loadSaleAct() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id акта продажи")
            
            setIsLoading(true)
            const saleAct = await getSaleActWithItems(parseInt(id??'0'))
            
            if (saleAct === null)
                throw Error("Не удалось получить данные акта продажи")

            setSaleAct(saleAct)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deleteSaleAct(id)
        navigate('/sale-acts/all')
    }

    return isLoading ? (<Loading/>) : 
           saleAct===null ? (<>Не удалось получить данные акта продажи</>) : (
        <>
            <Row className='mt-5'>
                
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={{...saleAct, name:saleAct.date}}
                        path='sale-acts'
                        requiredPermission={UserPermissions.CRUD_STORAGE}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{saleAct.date}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={saleAct}/>
                </Col>
                
                <Col md={12}>
                    <SaleActItemsTable saleAct={saleAct}/>
                </Col>
            </Row>
        </>
    )
}

export default SaleActDetails;