import { Accordion, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { IngredientWithProductsDTO, getIngredientWithProducts } from '../../../api/ingredients';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ProductsWeightsCalculator from './ProductsWeightsCalculator';
import IngredientProductsTable from './IngredientProductsTable';
import { appContext } from '../../../context/AppContextProvider';


function IngredientDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredient, setIngredient] = useState<IngredientWithProductsDTO|null>(null)
    const {showModal} = useContext(appContext)
    const {id} = useParams()

    useEffect(()=>{loadIngredient()}, [])

    async function loadIngredient() {
        try{
            if (id === undefined)
                throw Error("Ошибка загрузки данных: отсутствует id ингредиента")
            
            setIsLoading(true)
            const ingredient = await getIngredientWithProducts(parseInt(id??'0'))
            
            if (ingredient === null)
                throw Error("Не удалось получить данные о ингредиенте")
            
            setIngredient(ingredient)
        } catch(error: Error | any){
            showModal(<>{error?.message}</>)
        } finally {
            setIsLoading(false)
        }
    }

    return isLoading ? (<>Loading...</>) : 
           ingredient===null ? (<>Не удалось получить ингредиент</>) : (
        <>
            <Row className='mt-5'>
            <h3 className='text-center'>{`${ingredient.id}. ${ingredient.name} ${ingredient.type.name}`}</h3>
            <div className='d-flex justify-content-end'>
                <Link to={`/ingredients/edit/${ingredient.id}`}><small>Редактировать...</small></Link>
            </div>
            <Col lg={6} md={12} sm={12}>
                <Card className="p-3">

                <IngredientProductsTable ingredient={ingredient}/>
                </Card>
            </Col>
            <Col lg={6} md={12} sm={12}>
                <Card className="p-3">

                <ProductsWeightsCalculator ingredient={ingredient}/>
                </Card>
            </Col>
            </Row>
        </>
    )
}

export default IngredientDetails;