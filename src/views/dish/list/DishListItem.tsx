import { Accordion, Button, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { calcDishWeight, DishDTO, deleteDish as requestDeleteDish } from '../../../api/dishes';
import DishIngredientsTable from '../details/DishIngredientsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';

interface DishListItemProps {
    dish: DishDTO
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
            <Row className='w-100 text-center pe-3'>
                <Col xs={1}>
                    <Image style={{width:40, height:40}} src={`${(dish.image?.url ?? '') == '' ? '/icons/dish-image-placeholder.png' : dish.image?.url}`}/>
                </Col>
                <Col xs={3}>{dish.id}. {dish.name}</Col>
                <Col xs={3}>{dish.category?.name??'без категории'}</Col>
                <Col xs={3}>{dish.group?.name??'без группы'}</Col>
                <Col xs={2}>{calcDishWeight(dish).toFixed()} г.</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><DishIngredientsTable dish={dish}/></small>
                <div className='d-flex justify-content-between'>
                <Link to={`/dishes/details/${dish.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteDish}
                        entity={dish}
                        path='dishes'
                        requiredPermission={UserPermissions.CRUD_DISHES}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DishListItem;