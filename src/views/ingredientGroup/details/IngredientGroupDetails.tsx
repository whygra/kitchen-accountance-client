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


function IngredientGroupDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredientGroup, setIngredientGroup] = useState<IngredientGroupDTO|null>(null)
    
    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(()=>{
        document.title = `Группа ингредиентов "${ingredientGroup?.id}. ${ingredientGroup?.name}"`}
    , [ingredientGroup])

    useEffect(()=>{loadIngredientGroup()}, [])

    async function loadIngredientGroup() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id группы")
        
        setIsLoading(true)
        const ingredientGroup = await getIngredientGroupWithIngredients(parseInt(id??'0'))
        
        console.log(ingredientGroup)
        
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
                <Link className='text-secondary' to='/ingredient-groups/all'>Все группы ингредиентов...</Link>
                <div className='d-flex flex-row justify-content-between'>
                    <h3>{ingredientGroup.id}. {ingredientGroup.name}</h3>
                    <CUDButtons
                        deleteFn={deleteFn}
                        entity={ingredientGroup}
                        path='ingredient-groups'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    /> 
                </div>
            <Col md={12}>
                
                <Card className="p-3">

                <IngredientsTable ingredients={ingredientGroup.ingredients??[]} fieldsToExclude={[IngredientField.Group]}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientGroupDetails;