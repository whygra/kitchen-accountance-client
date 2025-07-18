import DishCategoryDishFormList from '../form/DishCategoryDishFormList';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dishCategoryFormContext } from '../../../context/forms/nomenclature/dish/DishCategoryFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import { projectContext } from '../../../context/ProjectContextProvider';

function DishCategoryForm() 
{  
  const {hasPermission} = useContext(projectContext)

  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_DISHES))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])
  
  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)
  
  const {showModal} = useContext(appContext)
  
  const {
    formState, requestFn, setName,
    history, reloadState
  } = useContext(dishCategoryFormContext);
  
  async function commit() {

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/dish-categories/details/${res?.id}`)
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
    
    const form = event.currentTarget as any;
    if (form.checkValidity() === false) {
      event.stopPropagation();      
      setValidated(true);
      return
    }

    commit()
  };

  return (<>
    <HistoryNav
      history={history}
      reloadFn={reloadState}
    />
    <Form className='pb-5' aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>

    <Row>
    <Col sm={12} md={6} lg={7}>
    <Form.Group className='mb-3'>
      <Form.Label><b>Название категории</b></Form.Label>
      <Form.Control
        required
        value={formState.name}
        onChange={(e)=>setName(e.target.value)}
      />
      
      <Form.Control.Feedback type="invalid">
        введите название
      </Form.Control.Feedback>
    </Form.Group>
    </Col>
    </Row>
    <DishCategoryDishFormList/>
    <div className='d-flex'>
      <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
      <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
    </div>
    </Form>
    </>)
}

export default DishCategoryForm