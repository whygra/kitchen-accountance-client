import { Button, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import ProductFormList from './ProductFormList';
import { distributorFormContext } from '../../../context/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { uploadDistributorPurchaseOptionsSpreadsheet as uploadDistributorPurchaseOptionsFile } from '../../../api/distributors';
import { DistributorPurchaseOptionColumnIndexes } from '../../../api/purchaseOptions';
import { authContext } from '../../../context/AuthContextProvider';
import { DataAction, UserPermissions } from '../../../models';
import { productFormContext } from '../../../context/ProductFormContext';
import { purchaseOptionFormContext } from '../../../context/PurchaseOptionFormContext';
import SelectCreateGroup from '../../unit/form/SelectCreateGroup';
import Select from '../../shared/selectCreateGroup/Select';
import HistoryNav from '../../shared/HistoryNav';


function PurchaseOptionForm() 
{  
  const {hasPermission} = useContext(authContext)
  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_DISTRIBUTORS))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])

  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const {showModal, hideModal} = useContext(appContext)

  const {
    formState,
    distributors,
    units,
    requestFn,
    setDistributorId,
    setName, 
    setCode,
    setNetWeight,
    setPrice,
    setUnitAction, 
    setUnitId,
    setUnitLong,
    setUnitShort,
    reloadState,
    history,
    action,
  } = useContext(purchaseOptionFormContext);

  async function commit() {
    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/purchase-options/details/${res?.id}`)
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  if (!distributors.find(d=>d.id==formState.distributorId))
    setDistributorId(distributors[0].id)

  return (<>
  
        <Form.Group className='mb-3'>
          
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        </Form.Group>
        {action == DataAction.Update
          ?
          <Form.Group>
            <p><b>Поставщик</b></p>
            <p>{distributors.find(d=>d.id==formState.distributorId)?.name??''}</p>
          </Form.Group>
          :
          <Form.Group>
            <p><b>Поставщик</b></p>
            <Form.Select
              value={formState.distributorId}
              onChange={e=>setDistributorId(parseInt(e.target.value))}
            >
              {distributors.map(d=><option value={d.id}>{d.name}</option>)}
            </Form.Select>
          </Form.Group>
        }
        <Form.Group className='mb-3'>
        <Form.Label><b>Код</b></Form.Label>
        <Form.Control
          type="number"
          placeholder="Код"
          value={formState.code}
          onChange={e=>setCode(parseInt(e.target.value))}
        />   
        </Form.Group>     
        <Form.Group className='mb-3'>
        <Form.Label><b>Наименование</b></Form.Label>
        <Form.Control
          type="text"
          placeholder="Наименование" 
          value={formState.name}
          onChange={e=>setName(e.target.value)}
        />      
        </Form.Group>  
        <Form.Group className='mb-3'>
        <Form.Label><b>Масса нетто</b></Form.Label>
        <Form.Control
          type="number"
          placeholder="Масса нетто"
          value={formState.netWeight}
          onChange={e=>setNetWeight(parseInt(e.target.value))}
        />        
        </Form.Group>
        <Form.Group className='mb-3'>
        <Form.Label><b>Цена</b></Form.Label>
        <Form.Control
          type="number"
          placeholder="Цена"
          value={formState.price}
          onChange={e=>setPrice(parseInt(e.target.value))}
        />        
        </Form.Group>
        <SelectCreateGroup
          unitId={formState.unitId}
          newUnitLongName={formState.unitLong}
          newUnitShortName={formState.unitShort}
          dataAction={formState.unitAction}
          setDataAction={setUnitAction}
          setLong={setUnitLong}
          setShort={setUnitShort}
          setUnitId={setUnitId}
          units={units}
        />
        <ProductFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
}

export default PurchaseOptionForm