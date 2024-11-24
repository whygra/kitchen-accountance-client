import ProductGroupProductFormList from './ProductGroupProductFormList';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productGroupFormContext } from '../../../context/product/ProductGroupFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import { projectContext } from '../../../context/ProjectContextProvider';

function ProductGroupForm() 
{  
  const {hasPermission} = useContext(projectContext)

  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_PRODUCTS))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])
  
  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)
  
  const {showModal} = useContext(appContext)
  
  const {
    formState, requestFn, setName,
    history, reloadState
  } = useContext(productGroupFormContext);
  
  async function commit() {

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/product-groups/details/${res?.id}`)
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
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        <Row>
        <Col sm={12} md={6} lg={7}>
        <Form.Group className='mb-3'>
          <Form.Label><b>Название Группы</b></Form.Label>
          <Form.Control
            required
            value={formState.name}
            onChange={(e)=>setName(e.target.value)}
          />
        </Form.Group>
        </Col>
        </Row>
        <ProductGroupProductFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
}

export default ProductGroupForm