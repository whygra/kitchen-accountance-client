import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDishCategory, DishCategoryDTO, getDishCategoryWithDishes } from '../../../api/dishCategories';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import DishesTable from '../../dish/list/DishTable';
import { DishField } from '../../../hooks/sort/useSortDishes';


function DishCategoryDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dishCategory, setDishCategory] = useState<DishCategoryDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Категория блюд "${dishCategory?.id}. ${dishCategory?.name}"`}
    , [dishCategory])

    useEffect(()=>{loadDishCategory()}, [])

    async function loadDishCategory() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id категории блюд")
        
        setIsLoading(true)
        const dishCategory = await getDishCategoryWithDishes(parseInt(id??'0'))
        
        console.log(dishCategory)
        
        if (dishCategory === null)
            throw Error("Не удалось получить данные о категории блюд")
        
        setDishCategory(dishCategory)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteDishCategory(id)
        navigate('/dish-categories/all')
    }

    return isLoading ? (<Loading/>) : 
           dishCategory===null ? (<>Не удалось получить данные категории блюд</>) : (
        <>

            <Row className='mt-5'>
                <Link className='text-secondary' to='/dish-categories/all'>Все категории блюд...</Link>
            <div className='d-flex flex-row justify-content-between'>
                <h3>{dishCategory.id}. {dishCategory.name}</h3>
                <CUDButtons
                    deleteFn={deleteFn}
                    entity={dishCategory}
                    path='dish-categories'
                    requiredPermission={UserPermissions.CRUD_DISHES}
                /> 
            </div>
            <Col md={12}>
                
                <Card className="p-3">

                <DishesTable dishes={dishCategory.dishes??[]} fieldsToExclude={[DishField.Category]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DishCategoryDetails;