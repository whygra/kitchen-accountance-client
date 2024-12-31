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
                <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={ingredientCategory}
                        path='ingredient-categories'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>
                    {`${ingredientCategory.id}. ${ingredientCategory.name}`}
                </h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={ingredientCategory}/>
                </Col>
            <Col md={12}>
                
                <Card className="p-3">
                <h5 className='w-100 text-center'>Ингредиенты</h5>

                <IngredientsTable ingredients={ingredientCategory.ingredients??[]} fieldsToExclude={[IngredientField.Category]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientCategoryDetails;