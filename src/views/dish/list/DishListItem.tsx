import { Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DishDTO, deleteDish as requestDeleteDish } from '../../../api/nomenclature/dishes';
import DishIngredientsTable from '../details/DishIngredientsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import DishesTableItem from './DishesTableItem';
import { DishField } from '../../../hooks/sort/useSortDishes';

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
            <DishesTableItem fieldsToExclude={[DishField.Id]} dish={dish}/>
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