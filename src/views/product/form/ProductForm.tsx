import { Button, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { distributorFormContext } from '../../../context/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { uploadDistributorPurchaseOptionsSpreadsheet as uploadDistributorPurchaseOptionsFile } from '../../../api/distributors';
import { DistributorPurchaseOptionColumnIndexes } from '../../../api/purchaseOptions';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import { productFormContext } from '../../../context/ProductFormContext';
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import HistoryNav from '../../shared/HistoryNav';


function ProductForm() 
{  
  const {hasPermission} = useContext(authContext)
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
    requestFn, 
    setName, 
    setCategoryId, 
    setCategoryAction,
    setCategoryName,
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

  return (<>
        <Form.Group className='mb-3'>
          
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        <Form.Label><b>Наименование продукта</b></Form.Label>
        <Form.Control
          type="text"
          placeholder="Наименование продукта" 
          value={formState.name}
          onChange={e=>setName(e.target.value)}
        />        
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
        <PurchaseOptionFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
}

export default ProductForm