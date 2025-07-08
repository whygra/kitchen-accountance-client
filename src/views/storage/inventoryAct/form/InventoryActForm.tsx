import InventoryActProductFormList from './InventoryActProductFormList';
import { Button, Container, Form } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPermissions } from '../../../../models';
import { appContext } from '../../../../context/AppContextProvider';
import { inventoryActContext } from '../../../../context/forms/storage/InventoryActFormContext';
import HistoryNav from '../../../shared/HistoryNav';
import { projectContext } from '../../../../context/ProjectContextProvider';
import InventoryActIngredientFormList from './InventoryActIngredientFormList';


function InventoryActForm() 
{  
  const {hasPermission} = useContext(projectContext)
  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_STORAGE))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])
  
  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)
  const dateNow = new Date()

  const {showModal} = useContext(appContext)
  const {
    formState, history, reloadState,
    requestFn, setDate
  } = useContext(inventoryActContext);

  function hasProducts() : boolean {
    // есть хотя бы один продукт
    return formState.productForms.length > 0
  }

  useEffect(()=>{
    if(formState.date == '')
      setDate(new Date().toISOString().slice(0, 10))
  }, [])

  
  async function commit() {
    if (!hasProducts()){
      showModal(<>Необходимо выбрать хотя-бы один продукт</>)
      return
    }

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.date}</>)
      navigate(`/inventory-acts/details/${res?.id}`)
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

  return (
      <div className='pt-5'>
        
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        <Form className='pb-5' aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className='mb-4'>
          <Form.Label><b>Дата</b></Form.Label>
          <Form.Control
            required
            type="date"
            value={formState.date}
            onChange={e=>setDate(e.target.value)}
          />
          
          <Form.Control.Feedback type="invalid">
            введите дату
          </Form.Control.Feedback>
        </Form.Group>
        <InventoryActProductFormList/>
        <InventoryActIngredientFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
      </div>)
}

export default InventoryActForm