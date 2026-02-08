import { getIngredients, getIngredientWithProducts, IngredientDTO, postIngredientWithProducts, putIngredientWithProducts } from '../../../../api/nomenclature/ingredients';
import { constructIngredientForm, constructIngredientIngredientForm, constructIngredientProductForm, constructIngredientTagForm, IngredientFormState, ingredientFormToDTO, IngredientIngredientFormState, IngredientProductFormState, IngredientTagFormState } from '../../../../models/ingredient/IngredientFormState';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { IngredientTypeDTO, getIngredientTypes } from '../../../../api/nomenclature/ingredientTypes';
import { ProductDTO, getProducts } from '../../../../api/nomenclature/products';
import { useErrorBoundary } from 'react-error-boundary';
import { Image } from 'react-bootstrap';
import Loading from '../../../../views/shared/Loading';
import { getIngredientTags, IngredientTagDTO } from '../../../../api/nomenclature/ingredientTags';

// контекст формы ингредиента
interface IngredientFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  getWeightToPercentageCoefficient: ()=>number
  addIngredientProductForm: ()=>void
  setIngredientProductFormState: (state:IngredientProductFormState)=>void
  removeIngredientProductForm: (key:string)=>void
  removeAllIngredientProductForms:()=>void
  addIngredientIngredientForm: ()=>void
  setIngredientIngredientFormState: (state:IngredientIngredientFormState)=>void
  removeIngredientIngredientForm: (key:string)=>void
  removeAllIngredientIngredientForms:()=>void
  addTag: (tag:string)=>void
  removeTag: (key:string)=>void
  removeAllTags:()=>void,
  requestFn: ()=>Promise<IngredientDTO|null>
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  setDescription: (description:string)=>void
  setItemWeight: (weight:number)=>void,
  setIsItemMeasured: (value:boolean)=>void,
  tags:IngredientTagDTO[],
  formState: IngredientFormState
  ingredientTypes: IngredientTypeDTO[]
  products: ProductDTO[]
  ingredients: IngredientDTO[]
}

export const ingredientContext = createContext<IngredientFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  getWeightToPercentageCoefficient:()=>1,
  addIngredientProductForm:()=>{},
  setIngredientProductFormState:(state:IngredientProductFormState)=>{},
  removeIngredientProductForm:(key:string)=>{},
  removeAllIngredientProductForms:()=>{},
  addIngredientIngredientForm:()=>{},
  setIngredientIngredientFormState:(state:IngredientIngredientFormState)=>{},
  removeIngredientIngredientForm:(key:string)=>{},
  removeAllIngredientIngredientForms:()=>{},
  addTag:()=>{},
  removeTag:(key:string)=>{},
  removeAllTags:()=>{},
  requestFn:async()=>null,
  setTypeId:(id:number)=>{},
  setName:(name:string)=>{},
  setDescription:(description:string)=>{},
  setItemWeight: (weight:number)=>{},
  setIsItemMeasured: (value:boolean)=>{},
  tags:[],
  formState:constructIngredientForm(),
  ingredientTypes:[],
  products: [],
  ingredients: []
});

interface IngredientFormContextProviderProps{
    action: DataAction
    children: ReactElement
}

function IngredientFormContextProvider({action, children}:IngredientFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<IngredientFormState>(constructIngredientForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<IngredientFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([]) 
  const [tags, setTags]= useState<IngredientTagDTO[]>([])
  const [products, setProducts] = useState<ProductDTO[]>([]) 
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]) 

  const {id} = useParams()

  const {showBoundary} = useErrorBoundary()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание ингредиента'
      :`Редактирование ингредиента "${formState.name}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    try{

      if(id!==undefined || action==DataAction.Update) 
        loadIngredient()
      else
        setFormState(constructIngredientForm())
      
      setFormStateHistory([])

      setIngredientTypes(await getIngredientTypes()??[]);
      setProducts(await getProducts()??[]);
      setIngredients(await getIngredients()??[]);
      setTags(await getIngredientTags()??[])

    } catch (e: any){
      showBoundary(e)
    }
    setIsLoading(false)
  }

  async function loadIngredient() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const ingredient = await getIngredientWithProducts(parseInt(id))
    if (ingredient === null)
        throw Error("Не удалось получить данные ингредиента")

    setFormState(constructIngredientForm(ingredient))
  }

  function saveToHistory(){
    setFormStateHistory([formState, ...formStateHistory].slice(0,historyLength))
  }

  function undo(){
    setFormState(formStateHistory[0])
    setFormStateHistory(formStateHistory.slice(1,formStateHistory.length))
  }

  function setTypeId(id: number) {
    saveToHistory()
    setFormState({...formState, typeId:id})
  }

  function setName(name: string) {
    saveToHistory()
    setFormState({...formState, name:name})
  }

  function setDescription(description: string) {
    saveToHistory()
    setFormState({...formState, description:description})
  }

  function setItemWeight(weight: number) {
    saveToHistory()
    setFormState({...formState, itemWeight:weight})
    getStateWithWeightPercentages()
  }

  function setIsItemMeasured(value: boolean) {
    saveToHistory()
    setFormState({...formState, isItemMeasured:value})
  }

  function addIngredientProductForm() {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms:
        [
          ...formState.ingredientProductForms,
          constructIngredientProductForm()
        ]})
  }

  function setIngredientProductFormState(state:IngredientProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms: formState.ingredientProductForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeIngredientProductForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms: 
        formState.ingredientProductForms
        .filter((s)=>s.key!=key)
    }) 
  }

  function removeAllIngredientProductForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms: []
    })
  }

  function addIngredientIngredientForm() {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientIngredientForms:
        [
          ...formState.ingredientIngredientForms,
          constructIngredientIngredientForm()
        ]})
  }

  function setIngredientIngredientFormState(state:IngredientIngredientFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientIngredientForms: formState.ingredientIngredientForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeIngredientIngredientForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientIngredientForms: 
        formState.ingredientIngredientForms
        .filter((s)=>s.key!=key)
    }) 
  }

  function removeAllIngredientIngredientForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientIngredientForms: []
    })
  }

  function getWeightToPercentageCoefficient() {
    const productTotalWeight = formState.ingredientProductForms
      .filter(p=>p.dataAction!=DataAction.Delete)
      .reduce((total, current)=>total+current.grossWeight, 0)
    return productTotalWeight==0 ? 0 : 100 / productTotalWeight
  }

  function getStateWithWeightPercentages() : IngredientFormState {
    const coef = getWeightToPercentageCoefficient()
    return {
      ...formState,
      ingredientProductForms:formState.ingredientProductForms
        .map(f=>{return{...f, weightPercentage:f.grossWeight*coef}})
    }
  }
  

  function addTag(tag: string) {
    saveToHistory()
    setFormState({
      ...formState, 
      tags:
        [
          ...formState.tags,
          tags.find(t=>t.name==tag) ?? {id:0, name:tag}
        ]})
  }

  function removeTag(tag:string){
    saveToHistory()
    setFormState({
      ...formState,
      tags: 
        formState.tags
        .filter((s)=>s.name!=tag)
    })
  }

  function removeAllTags(){
    saveToHistory()
    setFormState({
      ...formState,
      tags: []
    })
  }

  async function update() {
    return await putIngredientWithProducts(ingredientFormToDTO(getStateWithWeightPercentages()))
  }

  async function create() {
    return await postIngredientWithProducts(ingredientFormToDTO(getStateWithWeightPercentages()))
  }
  
  return isLoading ? (<Loading/>) : (
    <ingredientContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      getWeightToPercentageCoefficient: getWeightToPercentageCoefficient,
      addIngredientProductForm: addIngredientProductForm,
      setIngredientProductFormState: setIngredientProductFormState,
      removeIngredientProductForm: removeIngredientProductForm,
      removeAllIngredientProductForms: removeAllIngredientProductForms,
      addIngredientIngredientForm: addIngredientIngredientForm,
      setIngredientIngredientFormState: setIngredientIngredientFormState,
      removeIngredientIngredientForm: removeIngredientIngredientForm,
      removeAllIngredientIngredientForms: removeAllIngredientIngredientForms,
      addTag: addTag,
      removeTag: removeTag,
      removeAllTags: removeAllTags,
      setItemWeight: setItemWeight,
      setIsItemMeasured: setIsItemMeasured,
      tags: tags,
      formState: getStateWithWeightPercentages(),
      ingredientTypes: ingredientTypes,
      products: products,
      ingredients: ingredients,
      setTypeId: setTypeId,
      setName: setName,
      setDescription: setDescription,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </ingredientContext.Provider>
  )
}

export default IngredientFormContextProvider