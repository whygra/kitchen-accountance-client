import { Accordion, Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { appContext } from '../../../context/AppContextProvider';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { assignRole, removeFromProject, UserDTO } from '../../../api/users';
import { RoleDTO } from '../../../api/projects';
import TooltipButton from '../../shared/TooltipButton';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import { projectContext } from '../../../context/ProjectContextProvider';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import UsersTableItem from './UsersTableItem';


interface UserListItemProps {
    user: UserDTO
    roles: RoleDTO[]
    loadData: ()=>void
  }

function UserListItem({user, roles, loadData}: UserListItemProps) 
{      
    const [newRoleId, setNewRoleId] = useState(user.role?.id ?? roles[0].id)
    const {showModal, hideModal} = useContext(appContext)
    const {hasPermission} = useContext(projectContext)
    const [disabled, setDisabled] = useState(false)
    const {project} = useContext(projectContext)
    const {user:current} = useContext(authContext)

    function assign() {
        setDisabled(true)
        hideModal()
        const role = roles.find(r=>r.id==newRoleId)
        assignRole({...user, role:role})
        // оповестить об ответе
            .catch((e)=>{
                showModal(<>{e?.message}</>)
            })
            .then(()=>loadData())
            .finally(()=>setDisabled(false))
    }

    function remove() {
        setDisabled(true)
        removeFromProject(user.id)
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
        <Accordion.Header className={`${hasPermission(UserPermissions.CRUD_USERS)&&user.id != current?.id?'':'buttons-disabled'}`} style={{userSelect: 'text'}}>
            <UsersTableItem user={user}/>
        </Accordion.Header>
        <Accordion.Body>
            {user.id == current?.id || (!hasPermission(UserPermissions.CRUD_USERS))
            ? <></>
            :
        <div className='d-flex justify-content-end align-items-end w-100'>
            <div className='border-1 flex-grow-1'>
                <Form.Label>Изменить роль</Form.Label>
                <div className='d-flex justify-content-between'>
                    <Form.Select
                        value={newRoleId}
                        onChange={e=>setNewRoleId(parseInt(e.target.value))}
                        >
                        {roles.map(r=>
                            <option value={r.id}>{r.name}</option>
                        )}
                    </Form.Select>
                    
                    <BtnAskConfirmation 
                        tooltip='назначить роль'
                        disabled={disabled} variant='warning'
                        prompt={`Вы уверены, что хотите переназначить роль пользователя "${user.id}. ${user.name}"?`}
                        onConfirm={assign}
                        >
                        <i className='bi bi-check2'/>
                    </BtnAskConfirmation>
                </div>
            </div>
            <div>
                <BtnAskConfirmation
                    variant='danger'
                    disabled={disabled}
                    tooltip='исключить из проекта'
                    onConfirm={remove}
                    prompt={`Вы уверены, что хотите исключить пользователя "${user.name}" из проекта "${project?.name}"`} 
                >
                    <i className='bi bi-person-dash'/>
                </BtnAskConfirmation>
            </div>
        </div>
            }

        </Accordion.Body>
        </Accordion.Item>
        </>
    )
}

export default UserListItem;