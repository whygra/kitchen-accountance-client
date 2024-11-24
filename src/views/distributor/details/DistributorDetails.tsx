import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDistributor, DistributorDTO as DistributorDTO, getDistributorWithPurchaseOptions } from '../../../api/distributors';
import DistributorPurchaseOptionsTable from '../../purchase_option/table/PurchaseOptionsTable';
import PurchaseOptionsTable from '../../purchase_option/table/PurchaseOptionsTable';
import { getIngredientWithProducts } from '../../../api/ingredients';
import { appContext } from '../../../context/AppContextProvider';
import BtnShowFileUploadForm from '../form/BtnShowFileUploadForm';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import CUDButtons from '../../shared/CUDButtons';
import { PurchaseOptionField } from '../../../hooks/sort/useSortPurchaseOptions';
import Loading from '../../shared/Loading';


function DistributorDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [distributor, setDistributor] = useState<DistributorDTO|null>(null)
    
    const navigate = useNavigate()

    const {id} = useParams()

    const {showModal} = useContext(appContext)

    useEffect(()=>{
        document.title = `Поставщик "${distributor?.id}. ${distributor?.name}"`}
    , [distributor])

    useEffect(()=>{loadDistributor()}, [])

    async function loadDistributor() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id поставщика")
            
            setIsLoading(true)
            const res = await getDistributorWithPurchaseOptions(parseInt(id??'0'))
            
            if (res === null)
                throw Error("Не удалось получить данные о поставщике")
            
            setDistributor(res)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteFn(id: number) {
        await deleteDistributor(id)
        navigate('/distributors/all')
    } 

    return isLoading ? (<Loading/>) : 
           distributor===null ? (<>Не удалось получить данные поставщика</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${distributor.id}. ${distributor.name}`}</h3>
            
            <CUDButtons
                deleteFn={deleteFn}
                entity={distributor}
                path='distributors'
                requiredPermission={UserPermissions.CRUD_DISTRIBUTORS}
            />   
            <Col md={12}>
                
                <Card className="p-3">
                
                <div className="me-auto">
                    <BtnShowFileUploadForm onSuccess={loadDistributor} distributorId={distributor.id}/>
                </div>
                <PurchaseOptionsTable 
                    purchaseOptions={distributor?.purchase_options??[]} 
                    fieldsToExclude={[PurchaseOptionField.Distributor]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DistributorDetails;