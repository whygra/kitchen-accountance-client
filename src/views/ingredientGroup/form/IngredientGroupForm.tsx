import IngredientGroupIngredientFormList from './IngredientGroupIngredientFormList';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingredientGroupFormContext } from '../../../context/ingredient/IngredientGroupFormContext';
import { appContext } from '../../../context/AppContextProvider';
import { UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import { projectContext } from '../../../context/ProjectContextProvider';

function IngredientGroupForm() 
{  
  const {hasPermission} = useContext(projectContext)

  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_INGREDIENTS))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])
  
  const navigate = useNavigate()
  
  const [disabled, setDisabled] = useState(false)
  
  const {showModal} = useContext(appContext)
  
  const {
    formState, requestFn, setName,
    history, reloadState
  } = useContext(ingredientGroupFormContext);
  
  async function commit() {

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/ingredient-groups/details/${res?.id}`)
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
        <Form aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
        <Col sm={12} md={6} lg={7}>
        <Form.Group className='mb-3'>
          <Form.Label><b>Название Группы</b></Form.Label>
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
        <IngredientGroupIngredientFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
      </>)
}

export default IngredientGroupForm