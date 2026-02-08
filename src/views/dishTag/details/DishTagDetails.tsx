import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDishTag, DishTagDTO, getDishTagWithDishes } from '../../../api/nomenclature/dishTags';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import DishesTable from '../../dish/list/DishesTable';
import { DishField } from '../../../hooks/sort/useSortDishes';
import UpdatedAt from '../../shared/UpdatedAt';


function DishTagDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dishTag, setDishTag] = useState<DishTagDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Блюдо "${dishTag?.name}"`}
    , [dishTag])

    useEffect(()=>{loadDishTag()}, [])

    async function loadDishTag() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id блюда")
        
        setIsLoading(true)
        const DishTag = await getDishTagWithDishes(parseInt(id??'0'))
        
        if (DishTag === null)
            throw Error("Не удалось получить данные о блюде")
        
        setDishTag(DishTag)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteDishTag(id)
        navigate('/dish-tags/all')
    }

    return isLoading ? (<Loading/>) : 
           dishTag===null ? (<>Не удалось получить блюдо</>) : (
        <>
            <Row className='mt-5'>
            
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-3 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={dishTag}
                        path='dish-tags'
                        requiredPermission={UserPermissions.CRUD_DISHES}
                    />
                </div>

                <h3 className='col col-12 col-sm-9 order-sm-1 mt-3'>{dishTag.name}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={dishTag}/>
                </Col>
            <Col lg={12}>
                <Card className="p-3">
                <h2 className='w-100 text-center'>Блюда</h2>

                <DishesTable dishes={dishTag.dishes??[]} fieldsToExclude={[DishField.Tag]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DishTagDetails;