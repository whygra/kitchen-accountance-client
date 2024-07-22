import { Accordion, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { GetIngredientProductDTO, GetIngredientWithProductsDTO, getIngredientWithProducts } from '../../../api/ingredientWithProducts';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductsWeightsCalculator from './ProductsWeightsCalculator';
import IngredientProductsTable from './IngredientProductsTable';


function IngredientDetails() 
{   
    const [isLoading, setIsLoading] = useState(false)
    const [ingredient, setIngredient] = useState<GetIngredientWithProductsDTO|null>(null)
    
    const {id} = useParams()

    useEffect(()=>{loadIngredient()}, [])

    async function loadIngredient() {
        if (id === undefined)
            throw Error("Ошибка загрузки данных: отсутствует id ингредиента")
        
        setIsLoading(true)
        const ingredient = await getIngredientWithProducts(parseInt(id??'0'))
        
        if (ingredient === null)
            throw Error("Не удалось получить данные о ингредиенте")
        
        setIngredient(ingredient)
        setIsLoading(false)
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