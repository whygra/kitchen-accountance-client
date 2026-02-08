import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DishTagDTO, deleteDishTag as requestDeleteDishTag } from '../../../api/nomenclature/dishTags';
import DishTagDishesTable from '../details/DishTagDishesTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import DishesTable from '../../dish/list/DishesTable';
import { DishField } from '../../../hooks/sort/useSortDishes';
import DishTagsTableItem from './DishTagTableItem';

interface DishTagListItemProps {
    dishTag: DishTagDTO
    onDelete: ()=>void
  }

function DishTagListItem({dishTag, onDelete}: DishTagListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteDishTag = (id: number) => {
        requestDeleteDishTag(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <>
        <Accordion.Item eventKey={`${dishTag.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <div className='w-100 text-center'>
                <DishTagsTableItem dishTag={dishTag} />
            </div>
        </Accordion.Header>
        <Accordion.Body>
            <small>
                <h5 className='w-100 text-center'>Блюда</h5>
                <DishesTable dishes={dishTag.dishes??[]} fieldsToExclude={[DishField.Tag]}/>
            </small>
            <div className='d-flex justify-content-between'>
            <Link to={`/dish-tags/details/${dishTag.id}`}><Button variant='info'>Подробнее</Button></Link>
                <CUDButtons
                    deleteFn={deleteDishTag}
                    entity={dishTag}
                    path='dish-tags'
                    requiredPermission={UserPermissions.CRUD_DISHES}
                />
            </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DishTagListItem;