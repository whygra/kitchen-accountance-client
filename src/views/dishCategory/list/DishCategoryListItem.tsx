import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DishCategoryDTO, deleteDishCategory as requestDeleteDishCategory } from '../../../api/dishCategories';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import DishesTableHeader from '../../dish/list/DishesTableHeader';
import useDishesTableHeader from '../../../hooks/useDishesTableHeader';
import { DishField } from '../../../hooks/sort/useSortDishes';
import DishesTableItem from '../../dish/list/DishesTableItem';
import DishesTable from '../../dish/list/DishTable';

interface DishCategoryListItemProps {
    dishCategory: DishCategoryDTO
    onDelete: ()=>void
  }

function DishCategoryListItem({dishCategory, onDelete}: DishCategoryListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteDishCategory = (id: number) => {
        requestDeleteDishCategory(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }


    return (
        <>
        <Accordion.Item eventKey={`${dishCategory.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100 text-center pe-3'>
                <Col xs={4}>{dishCategory.id}</Col>
                <Col xs={8}>{dishCategory.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <DishesTable dishes={dishCategory.dishes??[]} fieldsToExclude={[DishField.Category]}/>
            </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/dish-categories/details/${dishCategory.id}`}><Button variant='info'>Подробнее</Button></Link>
                    <CUDButtons
                        deleteFn={deleteDishCategory}
                        entity={dishCategory}
                        path='dish-categories'
                        requiredPermission={UserPermissions.CRUD_DISHES}
                    />
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DishCategoryListItem;