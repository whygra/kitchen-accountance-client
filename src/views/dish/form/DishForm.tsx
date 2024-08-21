import DishIngredientFormList from './DishIngredientFormList';
import NameInput from './DishNameInput';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DishWithIngredientsDTO } from '../../../api/dishes';
import SelectCreateGroup from '../../selectCreateGroup/SelectCreateGroup';
import { dishCostCalculatorContext } from '../../../context/DishCostCalculatorContext';
import { dishFormContext } from '../../../context/DishFormContext';
import { appContext } from '../../../context/AppContextProvider';


function DishForm() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const {showModal} = useContext(appContext)

  const {
    formState, requestFn, setName,
    categories, setCategoryDataAction, 
    setCategoryId, setCategoryName
  } = useContext(dishFormContext);

  function hasIngredients() : boolean {
    // есть хотя бы один ингредиент
    return formState.dishIngredientForms.length > 0
  }

  async function commit() {
    if (!hasIngredients()){
      showModal(<>Необходимо выбрать хотя-бы один ингредиент</>)
      return
    }

    setDisabled(true)
    try{
      const res = await requestFn()
      showModal(<>{res?.id} {res?.name}</>)
      navigate(`/dishes/details/${res?.id}`)
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
          <Form.Label><b>Название блюда</b></Form.Label>
          <NameInput name={formState.name} setName={setName}/>
        </Form.Group>
        <Form.Group className='mb-3'>
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
        <DishIngredientFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </>)
}

export default DishForm