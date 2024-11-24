import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DishGroupDTO, deleteDishGroup as requestDeleteDishGroup } from '../../../api/dishGroups';
import DishGroupDishesTable from '../details/DishGroupDishesTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import DishesTable from '../../dish/list/DishTable';
import { DishField } from '../../../hooks/sort/useSortDishes';

interface DishGroupListItemProps {
    dishGroup: DishGroupDTO
    onDelete: ()=>void
  }

function DishGroupListItem({dishGroup, onDelete}: DishGroupListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteDishGroup = (id: number) => {
        requestDeleteDishGroup(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${dishGroup.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100 text-center pe-3'>
                <Col xs={4}>{dishGroup.id}</Col>
                <Col xs={8}>{dishGroup.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><DishesTable dishes={dishGroup.dishes??[]} fieldsToExclude={[DishField.Group]}/></small>
            <div className='d-flex justify-content-between'>
            <Link to={`/dish-groups/details/${dishGroup.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deleteDishGroup}
                    entity={dishGroup}
                    path='dish-groups'
                    requiredPermission={UserPermissions.CRUD_DISHES}
                />
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DishGroupListItem;