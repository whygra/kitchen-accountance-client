import { Accordion, Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { assignRoles, UserDTO, UserRoleDTO } from '../../../api/users';


interface UserListItemProps {
    user: UserDTO
    roles: UserRoleDTO[]
    loadData: ()=>void
  }

function UserListItem({user, roles, loadData}: UserListItemProps) 
{      
    const [newRoleId, setNewRoleId] = useState(roles[0].id)
    const {showModal, hideModal} = useContext(appContext)
    const [disabled, setDisabled] = useState(false)

    function assignRole() {
        setDisabled(true)
        hideModal()
        const role = roles.find(r=>r.id==newRoleId)
        assignRoles({...user, roles:role==undefined ? [] : [role]})
        // оповестить об ответе
            .catch((e)=>{
                showModal(<>{e?.message}</>)
            })
            .then(()=>loadData())
            .finally(()=>setDisabled(false))
    }

    return (
        <>
        <Accordion.Item eventKey={`${user.id}`}>
        <Accordion.Header style={{userSelect: 'text'}}>
            <Row className='w-100'>
                <Col md={1} sm={1} className='text-end'>{user.id}</Col>
                <Col md={3} sm={3} className='text-center'>{user.name}</Col>
                <Col md={4} sm={4} className='text-center'>{user.email}</Col>
                <Col md={4} sm={4} className='text-center'><ul>{user.roles?.map(r=><li>{r.name}</li>)}</ul></Col>
            </Row>
        </Accordion.Header>
        <Accordion.Body>

                    <Form.Label>Изменить роль</Form.Label>
                <div className='d-flex justify-content-between'>
                    <Form.Select
                        value={newRoleId}
                        onChange={e=>setNewRoleId(parseInt(e.target.value))}
                    >
                        <option value={0}>-нет-</option>
                        {roles.map(r=>
                            <option value={r.id}>{r.name}</option>
                        )}
                    </Form.Select>
                    <Button disabled={disabled} variant='danger'
                        onClick={() =>
                            showModal(
                                <ConfirmationDialog
                                    onConfirm={()=>assignRole()}
                                    onCancel={hideModal}
                                    prompt={`Вы уверены, что хотите переназначить роль пользователя "${user.id}. ${user.name}"?`}
                                />
                            )
                        }
                    >Подтвердить</Button>
                </div>
        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default UserListItem;