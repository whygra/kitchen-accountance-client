import { Button, Form } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { purchaseOptionFormContext } from '../../../context/forms/nomenclature/distributor/PurchaseOptionFormContext';
import * as SelectCreateUnitGroup from '../../unit/form/SelectCreateGroup';
import { projectContext } from '../../../context/ProjectContextProvider';
import { DataAction, UserPermissions } from '../../../models';
import { appContext } from '../../../context/AppContextProvider';
import HistoryNav from '../../shared/HistoryNav';
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import IsCreateSwitch from '../../shared/selectCreateGroup/IsCreateSwitch';
import useProductSelect from '../../../hooks/tableSelect/useProductSelect';
import { ProductDTO } from '../../../api/nomenclature/products';


function PurchaseOptionForm() 
{  
  const {hasPermission} = useContext(projectContext)
  
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
    setIsRelevant,
    setNetWeight,
    setPrice,
    setUnitAction, 
    setUnitId,
    setUnitLong,
    setUnitShort,
    reloadState,
    setProductAction, 
    setProductId,
    setProductName,
    products,

    history,
    action,
  } = useContext(purchaseOptionFormContext);

  const [selectedProduct, setSelectedProduct] = useState<ProductDTO|undefined>(products.find(p=>p.id==formState.productId))
  
  function selectProduct(id: number) {
    setSelectedProduct(products.find(p=>p.id==id))
    setProductId(id)
  }

  const {modalSelect, showSelect} = useProductSelect(products, selectProduct, formState.productId)
  

  async function commit() {
    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>
        <p>{res?.id} {res?.name}</p>
      </>)
      navigate(`/purchase-options/details/${res?.id}`)
    }
    catch (error: any) {
      showModal(<>
        <p>{error?.message}</p>
        <ul>{error?.errors?.map((e:any)=><li>{e}</li>)}</ul>
      </>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  if (!distributors.find(d=>d.id==formState.distributorId))
    setDistributorId(distributors[0]?.id)

  
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
              required
            >
              {distributors.map(d=><option value={d.id}>{d.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              выберите поставщика
            </Form.Control.Feedback>
          </Form.Group>
        }
                
        <Form.Group className='mb-3'>
        <Form.Label><b>Актуальность</b></Form.Label>
        <Form.Check
          type="checkbox"
          checked={formState.isRelevant}
          onChange={e=>setIsRelevant(e.target.checked)}
        />   
        </Form.Group>
        <Form.Group className='mb-3'>
        <Form.Label><b>Код</b></Form.Label>
        <Form.Control
          type="text"
          placeholder="Код"
          value={formState.code}
          onChange={e=>setCode(e.target.value)}
        />   
        </Form.Group>     
        <Form.Group className='mb-3'>
        <Form.Label><b>Наименование</b></Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Наименование" 
          value={formState.name}
          onChange={e=>setName(e.target.value)}
        />      
        <Form.Control.Feedback type="invalid">
          введите наименование
        </Form.Control.Feedback>
        </Form.Group>  
        <Form.Group className='mb-3'>
        <Form.Label><b>Масса нетто</b></Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Масса нетто"
          min={1}
          step={1}
          value={formState.netWeight}
          onChange={e=>setNetWeight(parseInt(e.target.value))}
        />        
        <Form.Control.Feedback type="invalid">
          введите значение ( .. ≥ 1 )
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
        <Form.Label><b>Цена</b></Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Цена"
          min={1}
          step={0.01}
          value={formState.price}
          onChange={e=>setPrice(parseInt(e.target.value))}
        />        
        <Form.Control.Feedback type="invalid">
          введите значение ( .. ≥ 1 )
        </Form.Control.Feedback>
        </Form.Group>
        <SelectCreateUnitGroup.default
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
        <Form.Group className='mb-2'>
              <div className="mb-2 d-flex flex-row justify-content-between">
              <b>Продукт</b>
                <IsCreateSwitch
                  dataAction={formState.productAction}
                  setDataAction={setProductAction}
                />
              </div>
            {formState.productAction == DataAction.Create 
              ? <Form.Group>
                <Form.Control
                  required
                  value={formState.productName}
                  onChange={(e)=>setProductName(e.target.value)}
                  />  
                <Form.Control.Feedback type="invalid">
                  введите название
                </Form.Control.Feedback>
                </Form.Group>
              : <Form.Group>
                <Form.Control
                  style={{caretColor:'transparent'}}
                  type='text'
                  role="button"
                  placeholder='--не выбран--'
                  onClick={showSelect} 
                  required 
                  value={selectedProduct ? selectedProduct.name : ''} 
                  />
                <Form.Control.Feedback type="invalid">
                  выберите элемент
                </Form.Control.Feedback>
                </Form.Group>
            }
          </Form.Group>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
        {modalSelect}
      </>)
}

export default PurchaseOptionForm