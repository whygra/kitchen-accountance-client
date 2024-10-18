import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { IngredientDTO } from '../../../api/ingredients';
import { Link } from 'react-router-dom';
import IngredientProductsTable from '../details/IngredientProductsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { deleteIngredient as requestDeleteIngredient } from '../../../api/ingredients';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { UserPermissions } from '../../../models';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import { authContext } from '../../../context/AuthContextProvider';
import CUDButtons from '../../shared/CUDButtons';


interface IngredientListItemProps {
    onDelete: ()=>void
    ingredient: IngredientDTO
  }

function IngredientListItem({onDelete, ingredient}: IngredientListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    const deleteIngredient = (id: number) => {
        requestDeleteIngredient(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${ingredient.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='text-center w-100 pe-4'>
                <Col xs={2} className='text-center'>{ingredient.id}</Col>
                <Col xs={4} className='text-center'>{ingredient.name}</Col>
                <Col xs={2} className='text-center'>{ingredient.type.name}</Col>
                <Col xs={4} className='text-center'>{ingredient.category?.name??'без категории'}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><IngredientProductsTable ingredient={ingredient}/></small>
            <div className='d-flex justify-content-between'>
                <Link to={`/ingredients/details/${ingredient.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deleteIngredient}
                    entity={ingredient}
                    path='ingredients'
                    requiredPermission={UserPermissions.CRUD_INGREDIENTS}
                />   
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default IngredientListItem;