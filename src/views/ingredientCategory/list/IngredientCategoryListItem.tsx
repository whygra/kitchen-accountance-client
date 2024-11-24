import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IngredientCategoryDTO, deleteIngredientCategory as requestDeleteIngredientCategory } from '../../../api/ingredientCategories';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import IngredientsTableHeader from '../../ingredient/list/IngredientsTableHeader';
import useIngredientsTableHeader from '../../../hooks/useIngredientsTableHeader';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import IngredientsTableItem from '../../ingredient/list/IngredientsTableItem';
import IngredientsTable from '../../ingredient/list/IngredientTable';

interface IngredientCategoryListItemProps {
    ingredientCategory: IngredientCategoryDTO
    onDelete: ()=>void
  }

function IngredientCategoryListItem({ingredientCategory, onDelete}: IngredientCategoryListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteIngredientCategory = (id: number) => {
        requestDeleteIngredientCategory(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${ingredientCategory.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100 text-center pe-3'>
                <Col xs={4}>{ingredientCategory.id}</Col>
                <Col xs={8}>{ingredientCategory.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <IngredientsTable ingredients={ingredientCategory.ingredients??[]} fieldsToExclude={[IngredientField.Category]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/ingredient-categories/details/${ingredientCategory.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteIngredientCategory}
                        entity={ingredientCategory}
                        path='ingredient-categories'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default IngredientCategoryListItem;