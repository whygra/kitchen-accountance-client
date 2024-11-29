import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteIngredientCategory, IngredientCategoryDTO, getIngredientCategoryWithIngredients } from '../../../api/ingredientCategories';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import IngredientsTable from '../../ingredient/list/IngredientTable';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import UpdatedAt from '../../shared/UpdatedAt';


function IngredientCategoryDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredientCategory, setIngredientCategory] = useState<IngredientCategoryDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Категория ингредиентов "${ingredientCategory?.id}. ${ingredientCategory?.name}"`}
    , [ingredientCategory])

    useEffect(()=>{loadIngredientCategory()}, [])

    async function loadIngredientCategory() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id блюда")
        
        setIsLoading(true)
        const ingredientCategory = await getIngredientCategoryWithIngredients(parseInt(id??'0'))
        
        console.log(ingredientCategory)
        
        if (ingredientCategory === null)
            throw Error("Не удалось получить данные о блюде")
        
        setIngredientCategory(ingredientCategory)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteIngredientCategory(id)
        navigate('/ingredient-categories/all')
    }

    return isLoading ? (<Loading/>) : 
           ingredientCategory===null ? (<>Не удалось получить данные категории</>) : (
        <>

            <Row className='mt-5'>
                <div className='d-flex flex-row justify-content-between align-items-end'>
                <div>
                <Link className='text-secondary' to='/ingredient-categories/all'>&lt; Все категории ингредиентов...</Link>
                <h3>{ingredientCategory.id}. {ingredientCategory.name}</h3>
                </div>
                
                <div>
                <CUDButtons
                    deleteFn={deleteFn}
                    entity={ingredientCategory}
                    path='ingredient-categories'
                    requiredPermission={UserPermissions.CRUD_DISHES}
                    /> 
                    <UpdatedAt entity={ingredientCategory}/>
                </div>
                </div>
            <Col md={12}>
                
                <Card className="p-3">

                <IngredientsTable ingredients={ingredientCategory.ingredients??[]} fieldsToExclude={[IngredientField.Category]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientCategoryDetails;