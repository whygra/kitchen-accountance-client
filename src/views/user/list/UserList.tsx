import { useContext, useEffect, useState } from 'react';
import { Accordion, Col, Row, Table } from 'react-bootstrap';
import { IngredientWithProductsDTO, getIngredientsWithProducts } from '../../../api/ingredients';
import UserListItem from './UserListItem';
import { Link } from 'react-router-dom';
import { appContext } from '../../../context/AppContextProvider';
import { useErrorBoundary } from 'react-error-boundary';
import { getRoles, getUsers, UserDTO, UserRoleDTO } from '../../../api/users';

function UserList() 
{
  
    const [users, setUsers] = useState(new Array<UserDTO>)
    const [isLoading, setIsLoading] = useState(false)
    const {showModal} = useContext(appContext)
    const {showBoundary} = useErrorBoundary()
    const [roles, setRoles] = useState(new Array<UserRoleDTO>)

    async function loadRoles() {
        try{
            const res = await getRoles()
            setRoles(res ?? [])
        } catch (error: Error | any) {
            showBoundary(error)
        }
    }

    async function loadUsers() {
        try{
          const res = await getUsers()
          setUsers(res ?? [])
        }
        catch (error: Error | any) {
          showBoundary(error)
        }
    }

    async function loadData(){
        setIsLoading(true)    
        await loadUsers()
        await loadRoles()
        setIsLoading(false)
    }

    function setUserState(user:UserDTO) {
        setUsers(users.map(u=>u.id==user.id?user:u))
    }

    useEffect(()=>{
        loadData()
    },[])
  
    return isLoading ? (<>Loading...</>) : (
        <>
        <Row className='ps-3 pe-5'>
            <Col md={1} sm={1} className='text-end'><b>id</b></Col>
            <Col md={3} sm={3} className='text-center'><b>Имя пользователя</b></Col>
            <Col md={4} sm={4} className='text-center'><b>Email</b></Col>
            <Col md={4} sm={4} className='text-center'><b>Роли</b></Col>
        </Row>
        <Accordion>
            {users.map(u=>
                <UserListItem user={u} roles={roles} setState={setUserState}/>
            )}
        </Accordion>
        </>
    )
}

export default UserList;