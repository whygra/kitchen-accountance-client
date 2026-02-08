import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IngredientTagDTO, deleteIngredientTag as requestDeleteIngredientTag } from '../../../api/nomenclature/ingredientTags';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import IngredientsTableItem from '../../ingredient/list/IngredientsTableItem';
import IngredientsTable from '../../ingredient/list/IngredientTable';
import IngredientTagsTableItem from './IngredientTagTableItem';

interface IngredientTagListItemProps {
    ingredientTag: IngredientTagDTO
    onDelete: ()=>void
  }

function IngredientTagListItem({ingredientTag, onDelete}: IngredientTagListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteIngredientTag = (id: number) => {
        requestDeleteIngredientTag(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${ingredientTag.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 text-center'>
                <IngredientTagsTableItem ingredientTag={ingredientTag}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <h5 className='w-100 text-center'>Ингредиенты</h5>
                <IngredientsTable ingredients={ingredientTag.ingredients??[]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/ingredient-tags/details/${ingredientTag.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteIngredientTag}
                        entity={ingredientTag}
                        path='ingredient-tags'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default IngredientTagListItem;