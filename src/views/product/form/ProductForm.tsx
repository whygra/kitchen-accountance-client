import { Button, Form } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import { productFormContext } from '../../../context/product/ProductFormContext';
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import HistoryNav from '../../shared/HistoryNav';
import { projectContext } from '../../../context/ProjectContextProvider';


function ProductForm() 
{  
  const {hasPermission} = useContext(projectContext)
  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_PRODUCTS))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])

  const navigate = useNavigate()

  const {id} = useParams()

  const [disabled, setDisabled] = useState(false)

  const {showModal, hideModal} = useContext(appContext)

  const {
    formState, 
    categories,
    groups,
    requestFn, 
    setName, 
    setCategoryId, 
    setCategoryAction,
    setCategoryName,
    setGroupId, 
    setGroupAction,
    setGroupName,
    history,
    reloadState
  } = useContext(productFormContext);

  async function commit() {
    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/products/details/${res?.id}`)
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

        <Form.Group className='mb-3'>
        <Form.Label><b>Наименование продукта</b></Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Наименование продукта" 
          value={formState.name}
          onChange={e=>setName(e.target.value)}
        />        
        <Form.Control.Feedback type="invalid">
          введите наименование
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
        <SelectCreateGroup
          label='Категория'
          selectedId={formState.categoryId}
          name={formState.categoryName}
          dataAction={formState.categoryDataAction}
          setDataAction={setCategoryAction}
          setName={setCategoryName}
          setId={setCategoryId}
          items={categories}
        />
        </Form.Group>
        <Form.Group className='mb-3'>
        <SelectCreateGroup
          label='Группа'
          selectedId={formState.groupId}
          name={formState.groupName}
          dataAction={formState.groupDataAction}
          setDataAction={setGroupAction}
          setName={setGroupName}
          setId={setGroupId}
          items={groups}
        />
        </Form.Group>
        <PurchaseOptionFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
      </>)
}

export default ProductForm