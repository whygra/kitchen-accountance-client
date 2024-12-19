import IngredientProductFormList from './IngredientProductFormList';
import NameInput from './IngredientNameInput';
import IngredientTypeSelect from './IngredientTypeSelect';
import { Button, Container, Form } from 'react-bootstrap';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectCreateGroup from '../../shared/selectCreateGroup/SelectCreateGroup';
import { DataAction, UserPermissions } from '../../../models';
import ItemWeightInput from './ItemWeightInput';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/ingredient/IngredientFormContext';
import { authContext } from '../../../context/AuthContextProvider';
import HistoryNav from '../../shared/HistoryNav';
import { projectContext } from '../../../context/ProjectContextProvider';


function IngredientForm() 
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
    formState, history, reloadState,
    requestFn, setName, setDescription, setTypeId, 
    setCategoryId, setCategoryDataAction, setCategoryName, 
    setGroupId, setGroupDataAction, setGroupName, 
    setItemWeight, 
    setIsItemMeasured, ingredientTypes, categories, groups
  } = useContext(ingredientContext);

  function hasProducts() : boolean {
    // есть хотя бы один продукт
    return formState.ingredientProductForms.length > 0
  }

  
  async function commit() {
    if (!hasProducts()){
      showModal(<>Необходимо выбрать хотя-бы один продукт</>)
      return
    }

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/ingredients/details/${res?.id}`)
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

  function preventSubmit(e: any) {
    var key = e.keyCode || 0;     
    if (key == 13) {
      e.preventDefault();
    }
  }

  return (
      <div className='pt-5'>
        
        <HistoryNav
          history={history}
          reloadFn={reloadState}
        />
        <Form aria-disabled={disabled} noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className='mb-4'>
          <Form.Label><b>Название ингредиента</b></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Название ингредиента" 
            value={formState.name}
            onChange={e=>setName(e.target.value)}
          />
          
          <Form.Control.Feedback type="invalid">
            введите название
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label><b>Тип ингредиента</b></Form.Label>
          <IngredientTypeSelect ingredientTypes={ingredientTypes} typeId={formState.typeId} setTypeId={setTypeId}/>
        </Form.Group>
        <Form.Group className='mb-4'>
          <ItemWeightInput
            weight={formState.itemWeight}
            isItemMeasured={formState.isItemMeasured}
            setWeight={setItemWeight}
            setIsItemMeasured={setIsItemMeasured}
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <SelectCreateGroup 
            label='Категория'
            dataAction={formState.categoryDataAction}
            items={categories} 
            name={formState.categoryName}
            selectedId={formState.categoryId} 
            setId={setCategoryId} 
            setDataAction={setCategoryDataAction}
            setName={setCategoryName}
            />
        </Form.Group>
        <Form.Group className='mb-4'>
          <SelectCreateGroup 
            label='Группа'
            dataAction={formState.groupDataAction}
            items={groups} 
            name={formState.groupName}
            selectedId={formState.groupId} 
            setId={setGroupId} 
            setDataAction={setGroupDataAction}
            setName={setGroupName}
            />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label><b>Описание</b></Form.Label>
          <textarea
            className='form-control border-1'
            onKeyDown={e=>preventSubmit(e)}
            value={formState.description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </Form.Group>
        <IngredientProductFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' type='submit'>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
        </Form>
      </div>)
}

export default IngredientForm