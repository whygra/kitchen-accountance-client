import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DishCategoryDTO, deleteDishCategory as requestDeleteDishCategory } from '../../../api/nomenclature/dishCategories';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import DishesTableHeader from '../../dish/list/DishesTableHeader';
import useDishesTableHeader from '../../../hooks/useDishesTableHeader';
import { DishField } from '../../../hooks/sort/useSortDishes';
import DishesTableItem from '../../dish/list/DishesTableItem';
import DishesTable from '../../dish/list/DishesTable';
import DishCategoriesTableItem from './DishCategoriesTableItem';

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
            <DishCategoriesTableItem dishCategory={dishCategory}/>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <h5 className='w-100 text-center'>Блюда</h5>
                <DishesTable dishes={dishCategory.dishes??[]} fieldsToExclude={[DishField.Category]}/>
            </small>
                <div className='d-flex justify-content-between mt-2'>
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