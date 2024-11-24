import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDishGroup, DishGroupDTO, getDishGroupWithDishes } from '../../../api/dishGroups';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import DishesTable from '../../dish/list/DishTable';
import { DishField } from '../../../hooks/sort/useSortDishes';


function DishGroupDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dishGroup, setDishGroup] = useState<DishGroupDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Блюдо "${dishGroup?.id}. ${dishGroup?.name}"`}
    , [dishGroup])

    useEffect(()=>{loadDishGroup()}, [])

    async function loadDishGroup() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id блюда")
        
        setIsLoading(true)
        const DishGroup = await getDishGroupWithDishes(parseInt(id??'0'))
        
        if (DishGroup === null)
            throw Error("Не удалось получить данные о блюде")
        
        setDishGroup(DishGroup)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteDishGroup(id)
        navigate('/dish-groups/all')
    }

    return isLoading ? (<Loading/>) : 
           dishGroup===null ? (<>Не удалось получить блюдо</>) : (
        <>
            <Row className='mt-5'>
            
            <Col lg={12}>
                <Link className='text-secondary' to='/dish-groups/all'>Все группы блюд...</Link>
                <div className='d-flex flex-row justify-content-between'>
                    <h3>{dishGroup.id}. {dishGroup.name}</h3>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={dishGroup}
                        path='dish-groups'
                        requiredPermission={UserPermissions.CRUD_DISHES}
                    /> 
                </div>
            </Col>
            <Col lg={12}>
                <Card className="p-3">

                <DishesTable dishes={dishGroup.dishes??[]} fieldsToExclude={[DishField.Group]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DishGroupDetails;