import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { constructIngredientGroupIngredientForm, IngredientGroupIngredientFormState } from '../../../models/ingredient/IngredientGroupFormState'
import { useContext, useState } from 'react'
import { appContext } from '../../../context/AppContextProvider';
import BtnAskConfirmation from '../../shared/BtnAskConfirmation';
import TooltipButton from '../../shared/TooltipButton'
import useIngredientSelect from '../../../hooks/tableSelect/useIngredientSelect';
import { ingredientGroupFormContext } from '../../../context/ingredient/IngredientGroupFormContext';
import IngredientGroupIngredientForm from './IngredientGroupIngredientForm';

function IngredientGroupIngredientFormList() {

  const { 
    addIngredientGroupIngredientForm, 
    removeAllIngredientGroupIngredientForms,
    setIngredientGroupIngredientFormState,
    formState,
    ingredients,
  } = useContext(ingredientGroupFormContext);

  const {showModal, hideModal} = useContext(appContext)

  function deleteAll(){
    removeAllIngredientGroupIngredientForms()
    hideModal()
  }

  // выбор ингредиентов
  const [activeForm, setActiveForm] = useState<IngredientGroupIngredientFormState>()
  
  function setIngredientGroupIngredientId(id: number){
    if(!activeForm) return
    
    if(!formState.ingredientGroupIngredientForms.find(f=>f.key==activeForm.key))
      addIngredientGroupIngredientForm(ingredients.find(i=>i.id==id))
    else
      setIngredientGroupIngredientFormState({...activeForm, id:id})
  }
  
  const {modalSelect, showSelect} = useIngredientSelect(
    ingredients.filter(i=>formState.ingredientGroupIngredientForms.find(f=>f.id==i.id)==undefined), 
    setIngredientGroupIngredientId, 
    activeForm?.id??0
  )
   
  function openSelect(form:IngredientGroupIngredientFormState){
    setActiveForm(form)
    showSelect()
  }

  return (
    <>
    <Container>
      
      <Form.Label><b>Ингредиенты:</b></Form.Label>
      {
        formState.ingredientGroupIngredientForms
          .map(fs =>
            <div key={`${fs.key}`}>
              <IngredientGroupIngredientForm formState={fs}/>
            </div>
          )
      }
      <div className="d-flex flex-row-reverse">

        <TooltipButton
          tooltip='добавить ингредиент'
          variant='success'
          onClick={()=>openSelect(constructIngredientGroupIngredientForm())}
        ><i className='bi bi-plus-lg'/></TooltipButton>

        <BtnAskConfirmation
          tooltip='исключить все'
          variant="danger"
          onConfirm={deleteAll}
          prompt='исключить все ингредиенты? несохраненные данные будут утеряны'
        ><i className='bi bi-x-lg'/></BtnAskConfirmation>
      </div>
    </Container>
    {modalSelect}
    </>
  )
}

export default IngredientGroupIngredientFormList;