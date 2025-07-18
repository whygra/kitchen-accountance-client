import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IngredientGroupDTO, deleteIngredientGroup as requestDeleteIngredientGroup } from '../../../api/nomenclature/ingredientGroups';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import IngredientsTableHeader from '../../ingredient/list/IngredientsTableHeader';
import useIngredientsTableHeader from '../../../hooks/useIngredientsTableHeader';
import { IngredientField } from '../../../hooks/sort/useSortIngredients';
import IngredientsTableItem from '../../ingredient/list/IngredientsTableItem';
import IngredientsTable from '../../ingredient/list/IngredientTable';
import IngredientGroupsTableItem from './IngredientGroupTableItem';

interface IngredientGroupListItemProps {
    ingredientGroup: IngredientGroupDTO
    onDelete: ()=>void
  }

function IngredientGroupListItem({ingredientGroup, onDelete}: IngredientGroupListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteIngredientGroup = (id: number) => {
        requestDeleteIngredientGroup(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${ingredientGroup.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 text-center'>
                <IngredientGroupsTableItem ingredientGroup={ingredientGroup}/>
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <h5 className='w-100 text-center'>Ингредиенты</h5>
                <IngredientsTable ingredients={ingredientGroup.ingredients??[]} fieldsToExclude={[IngredientField.Group]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/ingredient-groups/details/${ingredientGroup.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteIngredientGroup}
                        entity={ingredientGroup}
                        path='ingredient-groups'
                        requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default IngredientGroupListItem;