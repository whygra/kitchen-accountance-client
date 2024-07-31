import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { GetIngredientWithProductsDTO } from '../../../api/ingredientWithProducts';
import { Link } from 'react-router-dom';
import IngredientProductsTable from '../details/IngredientProductsTable';
import { useContext } from 'react';
import { appContext } from '../../../context';
import { deleteIngredient as requestDeleteIngredient } from '../../../api/ingredientWithProducts';
import ConfirmationDialog from '../../ConfirmationDialog';


interface IngredientListItemProps {
    ingredient: GetIngredientWithProductsDTO
  }

function IngredientListItem({ingredient}: IngredientListItemProps) 
{      
    const {showModal, hideModal} = useContext(appContext)

    const deleteIngredient = (id: number) => {
        requestDeleteIngredient(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${ingredient.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col md={2} sm={2} className='text-end'>{ingredient.id}</Col>
                <Col md={8} sm={8} className='text-center'>{ingredient.name}</Col>
                <Col md={2} sm={2} className='text-center'>{ingredient.type.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><IngredientProductsTable ingredient={ingredient}/></small>

                <div className='d-flex justify-content-between'>
                    <Button variant='info'><Link to={`/ingredients/details/${ingredient.id}`}>Подробнее</Link></Button>
                    <Button variant='secondary'><Link to={`/ingredients/create/copy/${ingredient.id}`}>Копировать</Link></Button>
                    <Button variant='warning'><Link to={`/ingredients/edit/${ingredient.id}`}>Редактировать</Link></Button>
                    {ingredient.deletion_allowed 
                    ?
                    <Button variant='danger'
                        onClick={() =>
                            showModal(
                                <ConfirmationDialog
                                    onConfirm={()=>deleteIngredient(ingredient.id)}
                                    onCancel={hideModal}
                                    prompt={`Вы уверены, что хотите удалить ингредиент "${ingredient.id}. ${ingredient.name} ${ingredient.type.name}" и все связи?`}
                                />
                            )
                        }
                    >Удалить</Button>
                    : 
                    <></>}
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default IngredientListItem;