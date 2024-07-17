import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import ComponentForm from '../components/component/form/ComponentForm';
import { setComponentId, setComponentName } from '../redux/actions/comoponentFormActions';
import { getComponentWithProducts, postComponentWithProducts, putComponentWithProducts } from '../api/componentWithProducts';
import { ComponentFormState, COMPONENT_FORM_INIT_STATE, ComponentProductFormState } from '../models/component';
import { SubmitActionType } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { useEffect, useState } from 'react';

interface ComponentFormControllerProps{
    action: SubmitActionType
}

function getComponentProductFormInitState() : ComponentProductFormState
{return {
    id: 0,
    dataAction: SubmitActionType.Create,
    productDataAction: SubmitActionType.None,
    rawContentPercentage: 1,
    wastePercentage: 0,
    key: uuid(),
    productName: "", 
    productId: 1, 
}}

function ComponentFormController({action}:ComponentFormControllerProps) 
{  
  const [formState, setFormState] = useState<ComponentFormState>(COMPONENT_FORM_INIT_STATE)
  const [isLoading, setIsLoading] = useState(false) 

  const dispatch: Dispatch<any> = useDispatch()

  const {id} = useParams()

  useEffect(()=>{if(action==SubmitActionType.Update) loadComponent()}, [])
  
  async function loadComponent() {
    setIsLoading(true)
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id компонента")

    const component = await getComponentWithProducts(parseInt(id??'0'))

    if (component === null)
        throw Error("Не удалось получить данные о компоненте")

    setFormState({
        submitAction: SubmitActionType.Update,
        id: component.id,
        name: component.name,
        componentTypeId: component.type.id,
        componentProductForms: component.components_products
            .map(c=>{ return {
                dataAction: SubmitActionType.Update,
                key: uuid(),
                id: c.id,
                productId: c.product.id,
                productName: c.product.name,
                productDataAction: SubmitActionType.None,
                rawContentPercentage: c.raw_content_percentage,
                wastePercentage: c.waste_percentage
            }}),
    })
    setIsLoading(false)
  }

  function setTypeId(id: number) {
    dispatch(setComponentId(id))
  }

  function setName(name: string) {
    dispatch(setComponentName(name))
  }

  function addComponentProductForm() {
    setFormState({
      ...formState, 
      componentProductForms:
        [
          ...formState.componentProductForms,
          getComponentProductFormInitState()
        ]})
  }

function setComponentProductFormState(state:ComponentProductFormState) {
  setFormState({
    ...formState,
    componentProductForms: formState.componentProductForms
    .map(s=>s.key == state.key ? state : s)
  })
}

  function removeComponentProductForm(key:string){
    const index = formState.componentProductForms.findIndex(s=>s.key==key)

    // если id <= 0 записи нет в бд - просто убираем из коллекции
    if (formState.componentProductForms[index].id <= 0)
      setFormState({
        ...formState,
        componentProductForms: 
          formState.componentProductForms
          .filter((s, i)=>i!=index)
      })
      
    // иначе - помечаем на удаление
    else 
      setFormState({
        ...formState,
        componentProductForms: 
          formState.componentProductForms
          .map((s, i)=>{
            return i==index 
              ? {...s, dataAction: SubmitActionType.Delete} 
              : s
            })
      })
  }

  function castToValidPercentages() {
    let coefficient = 100 / formState.componentProductForms.reduce((total, current)=>total+current.rawContentPercentage, 0)
    setFormState({...formState, componentProductForms:formState.componentProductForms
      .map(c => {return {...c, rawContentPercentage:Math.round(c.rawContentPercentage*coefficient*10)/10}})}
    )
  }

  function update() {
    return putComponentWithProducts({
        id: formState.id,
        name: formState.name,
        type_id: formState.componentTypeId,
        components_products: formState.componentProductForms
          .map(s=>{return {
            data_action: s.dataAction.valueOf(),
            product_data_action: s.productDataAction.valueOf(),
            id: s.id,
            component_id: formState.id,
            product_id: s.productId, 
            product_name: s.productName,
            raw_content_percentage: s.rawContentPercentage, 
            waste_percentage: s.wastePercentage,
          }})
    })
  }

  function create() {
    return postComponentWithProducts({
        name: formState.name,
        type_id: formState.componentTypeId,
        components_products: formState.componentProductForms
          .map(s=>{return {
            product_data_action: s.productDataAction.valueOf(),
            id: s.id,
            component_id: formState.id,
            product_id: s.productId, 
            product_name: s.productName,
            raw_content_percentage: s.rawContentPercentage, 
            waste_percentage: s.wastePercentage,
          }})
      })
  }
  
  return isLoading ? (<>Loading...</>) : (
    <ComponentForm
    castToValidPercentages={castToValidPercentages}
    addComponentProductForm={addComponentProductForm}
    setComponentProductFormState={setComponentProductFormState}
    removeComponentProductForm={removeComponentProductForm}
    formState={formState}
    setTypeId={setTypeId}
    setName={setName}
    request={action==SubmitActionType.Update ? update : create}
  />)
}

export default ComponentFormController