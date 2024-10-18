import { Accordion, Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PurchaseOptionGramCost from './PurchaseOptionGramCost';
import PurchaseOptionProductsTable from './PurchaseOptionProductsTable';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import { deletePurchaseOption, getPurchaseOptions, getPurchaseOptionsWithProducts, getPurchaseOptionWithProducts, PurchaseOptionDTO } from '../../../api/purchaseOptions';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';


function PurchaseOptionDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [purchaseOption, setPurchaseOption] = useState<PurchaseOptionDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    useEffect(()=>{
        document.title = `Позиция закупки "${purchaseOption?.id}. ${purchaseOption?.name}"`}
    , [purchaseOption])

    useEffect(()=>{loadProduct()}, [])

    const navigate = useNavigate()

    async function loadProduct() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id позиции закупки")
            
            setIsLoading(true)
            const purchaseOption = await getPurchaseOptionWithProducts(parseInt(id))
            
            if (purchaseOption === null)
                throw Error("Не удалось получить данные позиции закупки")
            
            setPurchaseOption(purchaseOption)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deletePurchaseOption(id)
        navigate('/purchase-options/all')
    }

    return isLoading ? (<Loading/>) : 
           purchaseOption===null ? (<>Не удалось получить данные позиции закупки</>) : (
        <>
            <div className='d-flex justify-content-between'>
            <h3 className='text-center'>{`${purchaseOption.id}. ${purchaseOption.name}`}</h3>
                <CUDButtons
                    deleteFn={deleteFn}
                    entity={purchaseOption}
                    path='purchase-options'
                    requiredPermission={UserPermissions.CRUD_DISTRIBUTORS}
                />   
            </div>
            <Row className='mt-5'>
            <Col lg={6} md={12}>
                <Card className="p-3">
                    <Table>
                        <tbody>
                        <tr><th className='text-start'>Код</th><td className='text-end'>{purchaseOption.code}</td></tr>
                        <tr><th className='text-start'>Поставщик</th><td className='text-end'><Link to={`/distributors/details/${purchaseOption.distributor?.id}`}>{purchaseOption.distributor?.name}</Link></td></tr>
                        <tr><th className='text-start'>Масса нетто</th><td className='text-end'>{purchaseOption.net_weight}</td></tr>
                        <tr><th className='text-start'>Цена</th><td className='text-end'>{purchaseOption.price} ₽</td></tr>
                        <tr><th className='text-start'>Единица измерения</th><td className='text-end'>{purchaseOption.unit.long}</td></tr>
                        <tr><th className='text-start'>Стоимость 1 грамма</th><td className='text-end'><PurchaseOptionGramCost purchaseOption={purchaseOption}/> ₽</td></tr>
                        </tbody>
                    </Table>
                </Card>
            </Col>
            <Col lg={6} md={12}>
                <Card className="p-3">

                <PurchaseOptionProductsTable purchaseOption={purchaseOption}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default PurchaseOptionDetails;