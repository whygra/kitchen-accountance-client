import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import ComponentForm from '../components/component/form/ComponentForm';
import { setComponentId, setComponentName } from '../redux/actions/comoponentFormActions';
import { GetComponentWithProductsDTO, getComponentWithProducts, getComponentsWithProducts, postComponentWithProducts, putComponentWithProducts } from '../api/componentWithProducts';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, useEffect, useState } from 'react';
import { DISH_FORM_INIT_STATE, DishComponentFormState, DishFormState } from '../models/DishFormState';
import { GetDishWithComponentsDTO, getDishWithComponents, postDishWithComponents, putDishWithComponents } from '../api/dishWithComponents';
import { ComponentTypeDTO, getComponentTypes } from '../api/componentTypes';
import { ComponentDTO, getComponents } from '../api/components';
import DishForm from '../components/dish/form/DishForm';

interface DishFormControllerProps{
  action: DataAction
}

function getDishComponentFormInitState() : DishComponentFormState
{return {
    id: 0,
    dataAction: DataAction.Create,
    componentDataAction: DataAction.None,
    componentRawWeight: 1,
    wastePercentage: 0,
    key: uuid(),
    componentName: "", 
    componentTypeId: 1, 
    componentId: 1, 
}}

interface DishFormContext {
  addDishComponentForm: ()=>void
  setDishComponentFormState: (state:DishComponentFormState)=>void
  removeDishComponentForm: (key:string)=>void
  requestFn: ()=>Promise<GetDishWithComponentsDTO|null>
  setName: (name:string)=>void
  formState: DishFormState
  componentTypes:ComponentTypeDTO[]
  components:GetComponentWithProductsDTO[]
}

// создание контекста для передачи данных в дочерние элементы
const context = createContext<DishFormContext>({
  addDishComponentForm:()=>{},
  setDishComponentFormState:(state:DishComponentFormState)=>{},
  removeDishComponentForm:(key:string)=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState:DISH_FORM_INIT_STATE,
  componentTypes:[],
  components:[]
});

function DishFormController({action}:DishFormControllerProps) 
{  
  const [formState, setFormState] = useState<DishFormState>(DISH_FORM_INIT_STATE)
  const [isLoading, setIsLoading] = useState(false) 
  const [componentTypes, setComponentTypes] = useState<ComponentTypeDTO[]>([])
  const [components, setComponents]= useState<GetComponentWithProductsDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  

  async function initialize() {
    setIsLoading(true)
    if(action==DataAction.Update) loadComponent()
    
    setComponentTypes(await getComponentTypes()??[])
    setComponents(await getComponentsWithProducts()??[])
    setIsLoading(false)
  }

  async function loadComponent() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const dish = await getDishWithComponents(parseInt(id??'0'))

    if (dish === null)
        throw Error("Не удалось получить данные о блюде")

    setFormState({
        dataAction: DataAction.Update,
        id: dish.id,
        name: dish.name,
        dishComponentForms: dish.dishes_components
          .map(d=>{ return {
              dataAction: DataAction.None,
              key: uuid(),
              id: d.id,
              componentId: d.component.id,
              componentName: d.component.name,
              componentDataAction: DataAction.None,
              componentTypeId: d.component.type.id,
              componentRawWeight: d.component_raw_weight,
              wastePercentage: d.waste_percentage
          }}),

    })
        
  }


  function setName(name: string) {
    setFormState({...formState, name:name})
  }

  function addDishComponentForm() {
    setFormState({
      ...formState, 
      dishComponentForms:
        [
          ...formState.dishComponentForms,
          getDishComponentFormInitState()
        ]})
  }

function setDishComponentFormState(state:DishComponentFormState) {
  setFormState({
    ...formState,
    dishComponentForms: formState.dishComponentForms
    .map(s=>s.key == state.key ? state : s)
  })
}

  function removeDishComponentForm(key:string){
    const index = formState.dishComponentForms.findIndex(s=>s.key==key)

    // если id <= 0 записи нет в бд - просто убираем из коллекции
    if (formState.dishComponentForms[index].id <= 0)
      setFormState({
        ...formState,
        dishComponentForms: 
          formState.dishComponentForms
          .filter((s, i)=>i!=index)
      })
      
    // иначе - помечаем на удаление
    else 
      setFormState({
        ...formState,
        dishComponentForms: 
          formState.dishComponentForms
          .map((s, i)=>{
            return i==index 
              ? {...s, dataAction: DataAction.Delete} 
              : s
            })
      })
  }

  function update() {
    return putDishWithComponents({
      id: formState.id,
      name: formState.name,
      dishes_components: formState.dishComponentForms
        .map(d=>{return {
          data_action: d.dataAction.valueOf(),
          component_data_action: d.componentDataAction.valueOf(),
          id: d.id,
          dish_id: formState.id,
          component_id: d.componentId, 
          component_name: d.componentName,
          component_type_id: d.componentTypeId,
          component_raw_weight: d.componentRawWeight,
          waste_percentage: d.wastePercentage,
        }})
    })
  }

  function create() {
    return postDishWithComponents({
        name: formState.name,
        dishes_components: formState.dishComponentForms
          .map(s=>{return {
            component_data_action: s.componentDataAction.valueOf(),
            id: s.id,
            dish_id: formState.id,
            component_id: s.componentId, 
            component_name: s.componentName,
            component_type_id: s.componentTypeId,
            component_raw_weight: s.componentRawWeight, 
            waste_percentage: s.wastePercentage,
          }})
      })
  }
  
  return isLoading ? (<>Loading...</>) : (
    <context.Provider value={{
      components: components,
      componentTypes: componentTypes,
      addDishComponentForm: addDishComponentForm,
      setDishComponentFormState: setDishComponentFormState,
      removeDishComponentForm: removeDishComponentForm,
      formState: formState,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    <DishForm/>
    </context.Provider>
  )
}

export default DishFormController

export {context}