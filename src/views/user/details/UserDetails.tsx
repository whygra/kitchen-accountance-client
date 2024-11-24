import { Button, Card, CardBody, Container, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext';
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
        </CardBody>

      </Card>)
}

export default UserDetails