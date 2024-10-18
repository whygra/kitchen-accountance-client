import { Button, Card, CardBody, Container, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/IngredientFormContext';
import { getCurrent, signUp, UserDTO } from '../../../api/users';
import { setCookie } from '../../../cookies';
import { useErrorBoundary } from 'react-error-boundary';
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
            <p><b>Роль:</b></p>
            <ul>
                {user?.roles?.map(r=><li>{r.name}</li>)}
            </ul>
        </CardBody>

      </Card>)
}

export default UserDetails