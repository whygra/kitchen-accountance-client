import { getInventoryActWithItems, InventoryActDTO, postInventoryActWithItems, putInventoryActWithItems } from '../../../api/storage/inventoryActs';
import { constructInventoryActForm, constructInventoryActIngredientForm, constructInventoryActProductForm, InventoryActFormState, inventoryActFormToDTO, InventoryActIngredientFormState, InventoryActProductFormState } from '../../../models/storage/InventoryActFormState';
import { DataAction } from '../../../models';
import { useParams } from 'react-router-dom';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { ProductDTO, getProducts } from '../../../api/nomenclature/products';
import { useErrorBoundary } from 'react-error-boundary';
import Loading from '../../../views/shared/Loading';
import { getIngredients, IngredientDTO } from '../../../api/nomenclature/ingredients';

// контекст формы акта инвентаризации
interface InventoryActFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addProductForm: ()=>void
  setProductFormState: (state:InventoryActProductFormState)=>void
  addIngredientForm: ()=>void
  setIngredientFormState: (state:InventoryActIngredientFormState)=>void
  removeProductForm: (key:string)=>void
  removeAllProductForms:()=>void,
  removeIngredientForm: (key:string)=>void
  removeAllIngredientForms:()=>void,
  requestFn: ()=>Promise<InventoryActDTO|null>
  setDate: (date:string)=>void
  formState: InventoryActFormState
  products: ProductDTO[]
  ingredients: IngredientDTO[]
}

export const inventoryActContext = createContext<InventoryActFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addProductForm:()=>{},
  setProductFormState:(state:InventoryActProductFormState)=>{},
  addIngredientForm:()=>{},
  setIngredientFormState:(state:InventoryActIngredientFormState)=>{},
  removeProductForm:(key:string)=>{},
  removeAllProductForms:()=>{},
  removeIngredientForm:(key:string)=>{},
  removeAllIngredientForms:()=>{},
  requestFn:async()=>null,
  setDate:(date:string)=>{},
  formState:constructInventoryActForm(),
  products: [],
  ingredients: []
});

interface InventoryActFormContextProviderProps{
    action: DataAction
    children: ReactElement
}

function InventoryActFormContextProvider({action, children}:InventoryActFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<InventoryActFormState>(constructInventoryActForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<InventoryActFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [products, setProducts] = useState<ProductDTO[]>([]) 
  const [ingredients, setIngredients] = useState<IngredientDTO[]>([]) 

  const {id} = useParams()

  const {showBoundary} = useErrorBoundary()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание акта инвентаризации'
      :`Редактирование акта инвентаризации "${formState.date}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    try{

      if(id!==undefined || action==DataAction.Update) 
        loadInventoryAct()
      else
        setFormState(constructInventoryActForm())
      
      setFormStateHistory([])

      setProducts(await getProducts()??[]);
      setIngredients(await getIngredients()??[]);

    } catch (e: any){
      showBoundary(e)
    }
    setIsLoading(false)
  }

  async function loadInventoryAct() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id акта инвентаризации")

    const inventoryAct = await getInventoryActWithItems(parseInt(id))
    if (inventoryAct === null)
        throw Error("Не удалось получить данные акта инвентаризации")

    setFormState(constructInventoryActForm(inventoryAct))
  }

  function saveToHistory(){
    setFormStateHistory([formState, ...formStateHistory].slice(0,historyLength))
  }

  function undo(){
    setFormState(formStateHistory[0])
    setFormStateHistory(formStateHistory.slice(1,formStateHistory.length))
  }

  function setDate(date: string) {
    saveToHistory()
    setFormState({...formState, date:date})
  }

  function addProductForm() {
    saveToHistory()
    setFormState({
      ...formState,
      productForms:
        [
          ...formState.productForms,
          constructInventoryActProductForm()
        ]})
  }

  function addIngredientForm() {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientForms:
        [
          ...formState.ingredientForms,
          constructInventoryActIngredientForm()
        ]})
  }

  function setProductFormState(state:InventoryActProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      productForms: 
        formState.productForms
        .map(s=>s.key == state.key ? state : s)
    })
  }

  function setIngredientFormState(state:InventoryActIngredientFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientForms: 
        formState.ingredientForms
        .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeProductForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      productForms: 
        formState.productForms
        .filter((s)=>s.key!=key)
    }) 
  }

  function removeIngredientForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientForms: 
        formState.ingredientForms
        .filter((s)=>s.key!=key)
    }) 
  }

  function removeAllProductForms(){
    saveToHistory()
    setFormState({
      ...formState,
      productForms: []
    })
  }
  function removeAllIngredientForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientForms: []
    })
  }

  async function update() {
    return await putInventoryActWithItems(inventoryActFormToDTO(formState))
  }

  async function create() {
    return await postInventoryActWithItems(inventoryActFormToDTO(formState))
  }
  
  return isLoading ? (<Loading/>) : (
    <inventoryActContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      addProductForm: addProductForm,
      setProductFormState: setProductFormState,
      addIngredientForm: addIngredientForm,
      setIngredientFormState: setIngredientFormState,
      removeProductForm: removeProductForm,
      removeAllProductForms: removeAllProductForms,
      removeIngredientForm: removeIngredientForm,
      removeAllIngredientForms: removeAllIngredientForms,
      formState: formState,
      products: products,
      ingredients: ingredients,
      setDate: setDate,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </inventoryActContext.Provider>
  )
}

export default InventoryActFormContextProvider