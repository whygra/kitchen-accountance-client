import NameInput from './DistributorNameInput';
import { Button, Form } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DishDTO } from '../../../api/dishes';
import PurchaseOptionFormList from './PurchaseOptionFormList';
import { distributorFormContext } from '../../../context/DistributorFormContext';
import { appContext } from '../../../context/AppContextProvider';
import SpreadsheetUploadForm from './SpreasheetUploadForm';
import { uploadDistributorPurchaseOptionsSpreadsheet as uploadDistributorPurchaseOptionsFile } from '../../../api/distributors';
import { DistributorPurchaseOptionColumnIndexes } from '../../../api/purchaseOptions';
import BtnShowFileUploadForm from './BtnShowFileUploadForm';
import { authContext } from '../../../context/AuthContextProvider';
import { UserPermissions } from '../../../models';
import HistoryNav from '../../shared/HistoryNav';
import { projectContext } from '../../../context/ProjectContextProvider';


function DistributorForm() 
{  
  const {hasPermission} = useContext(projectContext)
  useEffect(()=>{
    if(!hasPermission(UserPermissions.CRUD_DISTRIBUTORS))
      throw {name:'403', message:'Нет прав доступа'}
  }, [])

  const navigate = useNavigate()

  const {id} = useParams()

  const [disabled, setDisabled] = useState(false)

  const {showModal, hideModal} = useContext(appContext)

  const {
    formState, 
    history,
    requestFn, 
    setName, 
    reloadState
  } = useContext(distributorFormContext);

  async function commit() {
    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/distributors/details/${res?.id}`)
    }
    catch (error: Error | any) {
      showModal(<>{error?.message}</>)
      setDisabled(false)
    }
  }

  function cancel() {
    navigate(-1)
  }

  const [isValidating, setIsValidating] = useState(false)
  
  const [validated, setValidated] = useState(true);

  const handleSubmit = (event:FormEvent) => {
    setIsValidating(true)

    event.preventDefault();

    const form = event.currentTarget as any;
    if (form.checkValidity() === false) {
      event.stopPropagation();      
      setValidated(true);
      setIsValidating(false)
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
        <Form.Label><b>Название организации</b></Form.Label>
        
          <Form.Control
            required
            type="text"
            placeholder="Название организации" 
            value={formState.name}
            onChange={e=>setName(e.target.value)}
          />
          
          <Form.Control.Feedback type="invalid">
            введите название
          </Form.Control.Feedback>
        </Form.Group>
        
        {
          // загрузка прайс-листа
          id!==undefined
          ? <BtnShowFileUploadForm onSuccess={reloadState} distributorId={formState.id}/>
          : <></>
        }

        <PurchaseOptionFormList goToInvalid={isValidating}/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
        </>)
}

export default DistributorForm