import { Card, CardBody } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { authContext } from '../../../context/AuthContextProvider';


function UserDetails() 
{  

  const {user}=useContext(authContext)

  useEffect(()=>{
      document.title = "Профиль"}
  , [user])

  return (
      <Card className='pt-5'>
        <CardBody className='mb-4'>
            <p><b>Имя пользователя</b></p>
            <p>{user?.name}</p>
            <p><b>Адрес почты</b></p>
            <p>{user?.email}</p>
        </CardBody>

      </Card>)
}

export default UserDetails