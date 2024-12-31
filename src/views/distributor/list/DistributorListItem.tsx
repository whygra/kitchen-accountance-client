import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PurchaseOptionsTable from '../../purchase_option/table/PurchaseOptionsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { DistributorDTO } from '../../../api/distributors';
import { deleteDistributor as requestDeleteDistributor } from '../../../api/distributors';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import CUDButtons from '../../shared/CUDButtons';
import { PurchaseOptionField } from '../../../hooks/sort/useSortPurchaseOptions';
import GridTableRow from '../../shared/GridTableRow';
import DistributorsTableItem from './DistributorsTableItem';


interface DistributorListItemProps {
    onDelete: ()=>void
    distributor: DistributorDTO
  }

function DistributorListItem({onDelete, distributor}: DistributorListItemProps) 
{   
    const {showModal, hideModal} = useContext(appContext)

    const deleteDistributor = (id: number) => {
        requestDeleteDistributor(id)
        // оповестить об ответе
            .catch()
            .then(()=>{
                onDelete()
                hideModal()
            })
    }

    return (
        <Accordion.Item eventKey={`${distributor.id}`}>
            <Accordion.Header style={{userSelect: 'text'}}>
                <div className='w-100'>
                    <DistributorsTableItem distributor={distributor}/>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <small>
                    <h5 className='w-100 text-center'>Позиции закупки</h5>
                    <PurchaseOptionsTable
                        purchaseOptions={distributor.purchase_options??[]}
                        fieldsToExclude={[PurchaseOptionField.Distributor]}
                    />
                </small>
                <div className='d-flex justify-content-between'>
                <Link to={`/distributors/details/${distributor.id}`}><Button variant='info'>Подробнее</Button></Link>
                                
                    <CUDButtons
                        deleteFn={deleteDistributor}
                        entity={distributor}
                        path='distributors'
                        requiredPermission={UserPermissions.CRUD_DISTRIBUTORS}
                    />   
                </div>

            </Accordion.Body>
        </Accordion.Item>
    )
}

export default DistributorListItem;