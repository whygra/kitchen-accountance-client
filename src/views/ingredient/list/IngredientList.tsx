import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { IngredientWithProductsDTO, getIngredientsWithProducts } from '../../../api/ingredients';
import IngredientListItem from './IngredientListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';

function IngredientList() 
{
  
    const [ingredients, setIngredients] = useState(new Array<IngredientWithProductsDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {showModal} = useContext(appContext)
    const {showBoundary} = useErrorBoundary()
  
    async function loadIngredients() {
        setIsLoading(true)    
        try{
          const res = await getIngredientsWithProducts()
          setIngredients(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{loadIngredients()},[])
  
    return isLoading ? (<>Loading...</>) : (
        <>
        <Link to={'/ingredients/create'}>Создать</Link>
        <Row className='ps-3 pe-5'>
            <Col md={2} sm={2} className='text-end'><b>id</b></Col>
            <Col md={8} sm={8} className='text-center'><b>Название ингредиента</b></Col>
            <Col md={2} sm={2} className='text-center'><b>Тип</b></Col>
        </Row>
        <Accordion>
            {ingredients.map(c=>
                <IngredientListItem ingredient={c} onDelete={async()=>{await loadIngredients()}}/>
            )}
        </Accordion>
        </>
    )
}

export default IngredientList;