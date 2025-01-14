import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteDishCategory, DishCategoryDTO, getDishCategoryWithDishes } from '../../../api/dishCategories';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import DishesTable from '../../dish/list/DishesTable';
import { DishField } from '../../../hooks/sort/useSortDishes';
import UpdatedAt from '../../shared/UpdatedAt';


function DishCategoryDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [dishCategory, setDishCategory] = useState<DishCategoryDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Категория блюд "${dishCategory?.name}"`}
    , [dishCategory])

    useEffect(()=>{loadDishCategory()}, [])

    async function loadDishCategory() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id категории блюд")
        
        setIsLoading(true)
        const dishCategory = await getDishCategoryWithDishes(parseInt(id??'0'))
                
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
                <Link className='text-secondary' to='/dish-categories/all'>&lt; Все категории блюд...</Link>

                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-3 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={dishCategory}
                        path='dish-categories'
                        requiredPermission={UserPermissions.CRUD_DISHES}
                    /> 
                </div>

                <h3 className='col col-12 col-sm-9 order-sm-1 mt-3'>{`${dishCategory.name}`}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={dishCategory}/>
                </Col>
            <Col md={12}>
                
                <Card className="p-3">
                <h2 className='w-100 text-center'>Блюда</h2>
                <DishesTable dishes={dishCategory.dishes??[]} fieldsToExclude={[DishField.Category, DishField.Id]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default DishCategoryDetails;