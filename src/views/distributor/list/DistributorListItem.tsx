import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DistributorPurchaseOptionsTable from '../details/PurchaseOptionsTable';
import { useContext } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../ConfirmationDialog';
import { DistributorWithPurchaseOptionsDTO } from '../../../api/distributors';
import { deleteDistributor as requestDeleteDistributor } from '../../../api/distributors';


interface DistributorListItemProps {
    onDelete: ()=>void
    distributor: DistributorWithPurchaseOptionsDTO
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
        <>
        <Accordion.Item eventKey={`${distributor.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col xs={2} className='text-end'>{distributor.id}</Col>
                <Col xs={10} className='text-center'>{distributor.name}</Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>
            <small><DistributorPurchaseOptionsTable distributor={distributor}/></small>

                <div className='d-flex justify-content-between'>
                    <Button variant='info'><Link to={`/distributors/details/${distributor.id}`}>Подробнее</Link></Button>
                    <Button variant='secondary'><Link to={`/distributors/create/copy/${distributor.id}`}>Копировать</Link></Button>
                    <Button variant='warning'><Link to={`/distributors/edit/${distributor.id}`}>Редактировать</Link></Button>
                    <Button variant='danger' onClick={ () =>
                        showModal(
                            <ConfirmationDialog 
                                onConfirm={()=>deleteDistributor(distributor.id)}
                                onCancel={()=>hideModal()}
                                prompt={`Вы уверены, что хотите удалить данные поставщика "${distributor.id}. ${distributor.name}" и все связи?`}
                            />
                        )
                    }>Удалить</Button>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default DistributorListItem;