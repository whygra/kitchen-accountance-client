import PurchaseActItemFormList from './PurchaseActItemFormList';
import { Button, Container, Form } from 'react-bootstrap';
import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPermissions } from '../../../../models';
import { appContext } from '../../../../context/AppContextProvider';
import { purchaseActContext } from '../../../../context/forms/storage/PurchaseActFormContext';
import HistoryNav from '../../../shared/HistoryNav';
import { projectContext } from '../../../../context/ProjectContextProvider';


function PurchaseActForm() 
{  
  const {hasPermission} = useContext(projectContext)
  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_STORAGE))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])
  
  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)

  const {showModal} = useContext(appContext)
  const {
    formState, history, reloadState,
    requestFn, setDate, setDistributor,distributors
  } = useContext(purchaseActContext);

  useEffect(()=>{
    setDistributor(distributors.find(d=>d.id==formState.distributor.id) ?? distributors[0])
  },[])

  function handleDistributorSelect(e: ChangeEvent<HTMLSelectElement>) {
    const distributor = distributors.find(d=>d.id==parseInt(e.target.value))
    if (distributor != undefined)
      setDistributor(distributor)
  }

  function hasItems() : boolean {
    // есть хотя бы один продукт
    return formState.itemForms.length > 0
  }

  useEffect(()=>{
    if(formState.date == '')
      setDate(new Date().toISOString().slice(0, 10))
  }, [])

  async function commit() {
    if (!hasItems()){
      showModal(<>Необходимо выбрать хотя-бы один продукт</>)
      return
    }

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.date}</>)
      navigate(`/purchase-acts/details/${res?.id}`)
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
        <Form.Group className='mb-4'>
          <Form.Label><b>Поставщик</b></Form.Label>
          <Form.Select
            value={formState.distributor.id}
            onChange={handleDistributorSelect}
          >
            {distributors.map(d=><option value={d.id}>{d.name}</option>)}
          </Form.Select>
          
          <Form.Control.Feedback type="invalid">
            выберите поставщика
          </Form.Control.Feedback>
        </Form.Group>
        <PurchaseActItemFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
      </div>)
}

export default PurchaseActForm