import { Accordion, Button, Card, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteIngredientGroup, IngredientGroupDTO, getIngredientGroupWithIngredients } from '../../../api/ingredientGroups';
import { UserPermissions } from '../../../models';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';
import Loading from '../../shared/Loading';
import { BASE_URL } from '../../../api/constants';
import IngredientsTable from '../../ingredient/list/IngredientTable';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import UpdatedAt from '../../shared/UpdatedAt';


function IngredientGroupDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredientGroup, setIngredientGroup] = useState<IngredientGroupDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Группа ингредиентов "${ingredientGroup?.name}"`}
    , [ingredientGroup])

    useEffect(()=>{loadIngredientGroup()}, [])

    async function loadIngredientGroup() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id группы")
        
        setIsLoading(true)
        const ingredientGroup = await getIngredientGroupWithIngredients(parseInt(id??'0'))
                
        if (ingredientGroup === null)
            throw Error("Не удалось получить данные группы ингредиентов")
        
        setIngredientGroup(ingredientGroup)
        setIsLoading(false)
    }

    async function deleteFn(id: number) {
        await deleteIngredientGroup(id)
        navigate('/ingredient-groups/all')
    }

    return isLoading ? (<Loading/>) : 
           ingredientGroup===null ? (<>Не удалось получить данные группы</>) : (
        <>

            <Row className='mt-5'>

            <Row className='w-100 mx-0'>
                <div className='mx-0 px-0 col col-12 col-sm-4 order-sm-2 justify-content-end'>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={ingredientGroup}
                        path='ingredientGroups'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    />
                </div>

                <h3 className='col col-12 col-sm-8 order-sm-1 mt-3'>{ingredientGroup.name}</h3>
                </Row>
                
                <Col md={12}>
                    <UpdatedAt entity={ingredientGroup}/>
                </Col>
            <Col md={12}>
                
                <Card className="p-3">
                <h5 className='w-100 text-center'>Ингредиенты</h5>

                <IngredientsTable ingredients={ingredientGroup.ingredients??[]} fieldsToExclude={[IngredientField.Group]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientGroupDetails;