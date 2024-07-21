import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import ComponentForm from '../components/component/form/ComponentForm';
import { GetComponentWithProductsDTO, GetProductDTO, getComponentWithProducts, postComponentWithProducts, putComponentWithProducts } from '../api/componentWithProducts';
import { ComponentFormState, COMPONENT_FORM_INIT_STATE, ComponentProductFormState } from '../models/ComponentFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, useEffect, useState } from 'react';
import { ComponentTypeDTO, getComponentTypes } from '../api/componentTypes';
import { ProductDTO, getProducts } from '../api/products';

interface ComponentFormControllerProps{
    action: DataAction
}

function getComponentProductFormInitState() : ComponentProductFormState
{return {
    id: 0,
    dataAction: DataAction.Create,
    productDataAction: DataAction.None,
    rawContentPercentage: 1,
    wastePercentage: 0,
    key: uuid(),
    productName: "", 
    productId: 1, 
}}

interface ComponentFormContext {
  castToValidPercentages: ()=>void
  addComponentProductForm: ()=>void
  setComponentProductFormState: (state:ComponentProductFormState)=>void
  removeComponentProductForm: (key:string)=>void
  requestFn: ()=>Promise<GetComponentWithProductsDTO|null>
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  formState: ComponentFormState
  componentTypes: ComponentTypeDTO[]
  products: ProductDTO[]
}

// создание контекста для передачи данных в дочерние элементы
const context = createContext<ComponentFormContext>({
  castToValidPercentages:()=>{},
  addComponentProductForm:()=>{},
  setComponentProductFormState:(state:ComponentProductFormState)=>{},
  removeComponentProductForm:(key:string)=>{},
  requestFn:async()=>null,
  setTypeId:(id:number)=>{},
  setName:(name:string)=>{},
  formState:COMPONENT_FORM_INIT_STATE,
  componentTypes:[],
  products: []
});

function ComponentFormController({action}:ComponentFormControllerProps) 
{  
  const [formState, setFormState] = useState<ComponentFormState>(COMPONENT_FORM_INIT_STATE)
  const [isLoading, setIsLoading] = useState(false) 
  const [componentTypes, setComponentTypes] = useState<ComponentTypeDTO[]>([]) 
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{if(action==DataAction.Update) loadComponent()}, [])
  
  async function loadComponent() {
    setIsLoading(true)
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id компонента")

    const component = await getComponentWithProducts(parseInt(id??'0'))

    if (component === null)
        throw Error("Не удалось получить данные о компоненте")

    setFormState({
        submitAction: DataAction.Update,
        id: component.id,
        name: component.name,
        componentTypeId: component.type.id,
        componentProductForms: component.components_products
            .map(c=>{ return {
                dataAction: DataAction.None,
                key: uuid(),
                id: c.id,
                productId: c.product.id,
                productName: c.product.name,
                productDataAction: DataAction.None,
                rawContentPercentage: c.raw_content_percentage,
                wastePercentage: c.waste_percentage
            }}),
    })

    setComponentTypes(await getComponentTypes()??[]);
    setProducts(await getProducts()??[]);

    setIsLoading(false)
  }

  function setTypeId(id: number) {
    setFormState({...formState, componentTypeId:id})
  }

  function setName(name: string) {
    setFormState({...formState, name:name})
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
  // пометить на обновление
  state.dataAction = DataAction.Update
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
              ? {...s, dataAction: DataAction.Delete} 
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
    <context.Provider value={{
      castToValidPercentages: castToValidPercentages,
      addComponentProductForm: addComponentProductForm,
      setComponentProductFormState: setComponentProductFormState,
      removeComponentProductForm: removeComponentProductForm,
      formState: formState,
      componentTypes: componentTypes,
      products: products,
      setTypeId: setTypeId,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    <ComponentForm/>
    </context.Provider>
  )
}

export default ComponentFormController

export {context}