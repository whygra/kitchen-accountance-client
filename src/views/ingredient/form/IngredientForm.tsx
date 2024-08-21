import IngredientProductFormList from './IngredientProductFormList';
import NameInput from './IngredientNameInput';
import IngredientTypeSelect from './IngredientTypeSelect';
import { Button, Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectCreateCategoryGroup from '../../selectCreateGroup/SelectCreateGroup';
import { DataAction } from '../../../models';
import ItemWeightInput from './ItemWeightInput';
import { appContext } from '../../../context/AppContextProvider';
import { ingredientContext } from '../../../context/IngredientFormContext';


function IngredientForm() 
{  
  const navigate = useNavigate()

  const [disabled, setDisabled] = useState(false)

  const {showModal} = useContext(appContext)
  const {
    formState, 
    requestFn, setName, setTypeId, setCategoryId, 
    setCategoryDataAction, setCategoryName, setItemWeight, 
    setIsItemMeasured, ingredientTypes, categories
  } = useContext(ingredientContext);

  function contentPercentagesAreValid() : boolean {
    const contentPercentageSum = 
    formState.ingredientProductForms
      .filter(p=>p.productDataAction!=DataAction.Delete)
      .reduce((sum, current) => sum + current.rawContentPercentage, 0);
    // сумма процентов содержания == 100
    return contentPercentageSum == 100.
  }

  function hasProducts() : boolean {
    // есть хотя бы один продукт
    return formState.ingredientProductForms.length > 0
  }

  
  async function commit() {
    if (!hasProducts()){
      showModal(<>Необходимо выбрать хотя-бы один продукт</>)
      return
    }
    if (!contentPercentagesAreValid()){
      showModal(<>Сумма процентов содержания должна равняться 100</>)
      return
    }
    setDisabled(true)
    try{
      const res = await requestFn()
      console.log(res)
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

  return (
      <div className='pt-5'>
        <Form.Group className='mb-4'>
          <Form.Label><b>Название ингредиента</b></Form.Label>
          <NameInput name={formState.name} setName={setName}/>
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
          <SelectCreateCategoryGroup 
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
        <IngredientProductFormList/>
        <div className='d-flex'>
          <Button disabled={disabled} className='me-2' onClick={commit}>Подтвердить</Button>
          <Button disabled={disabled} className='me-2' variant='secondary' onClick={cancel}>Отмена</Button>
        </div>
      </div>)
}

export default IngredientForm