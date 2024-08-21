import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { DishWithIngredientsDTO, deleteDish as requestDeleteDish } from '../../../api/dishes';
import DishIngredientsTable from '../details/DishIngredientsTable';
import DishWeight from '../details/DishWeight';
import { useContext, useState } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../ConfirmationDialog';


interface DishListItemProps {
    dish: DishWithIngredientsDTO
    onDelete: ()=>void
  }

function DishListItem({dish, onDelete}: DishListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteDish = (id: number) => {
        requestDeleteDish(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${dish.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col md={2} sm={2} className='text-end'>{dish.id}</Col>
                <Col md={8} sm={8} className='text-center'>{dish.name}</Col>
                <Col md={2} sm={2} className='text-center'><DishWeight dish={dish}/></Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><DishIngredientsTable dish={dish}/></small>

                <div className='d-flex justify-content-between'>
                    <Button variant='info'><Link to={`/dishes/details/${dish.id}`}>Подробнее</Link></Button>
                    <Button variant='secondary'><Link to={`/dishes/create/copy/${dish.id}`}>Копировать</Link></Button>
                    <Button variant='warning'><Link to={`/dishes/edit/${dish.id}`}>Редактировать</Link></Button>
                    <Button variant='danger' onClick={ () =>
                        showModal(
                            <ConfirmationDialog 
                                onConfirm={()=>deleteDish(dish.id)}
                                onCancel={()=>hideModal()}
                                prompt={`Вы уверены, что хотите удалить блюдо "${dish.id}. ${dish.name}" и все связи?`}
                            />
                        )
                    }>Удалить</Button>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DishListItem;