import { getIngredientsWithProducts, IngredientDTO } from '../../api/ingredients';
import { DataAction } from '../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { IngredientCategoryIngredientFormState, IngredientCategoryFormState, constructIngredientCategoryForm, constructIngredientCategoryIngredientForm, ingredientCategoryFormToDTO } from '../../models/ingredient/IngredientCategoryFormState';
import { IngredientTypeDTO, getIngredientTypes } from '../../api/ingredientTypes';
import { IngredientCategoryDTO, getIngredientCategories, postIngredientCategory, putIngredientCategory, deleteIngredientCategory, getIngredientCategoryWithIngredients, putIngredientCategoryWithIngredients, postIngredientCategoryWithIngredients } from '../../api/ingredientCategories';
import Loading from '../../views/shared/Loading';
import { ServerImageData } from '../../api/constants';


// контекст формы блюда
interface IngredientCategoryFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addIngredientCategoryIngredientForm: (ingredient?: IngredientDTO)=>void
  setIngredientCategoryIngredientFormState: (state:IngredientCategoryIngredientFormState)=>void
  removeIngredientCategoryIngredientForm: (key:string)=>void
  removeAllIngredientCategoryIngredientForms: ()=>void
  requestFn: ()=>Promise<IngredientCategoryDTO|null>
  setName: (name:string)=>void
  formState: IngredientCategoryFormState
  ingredients:IngredientDTO[]
}

export const ingredientCategoryFormContext = createContext<IngredientCategoryFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addIngredientCategoryIngredientForm:(ingredient?: IngredientDTO)=>{},
  setIngredientCategoryIngredientFormState:(state:IngredientCategoryIngredientFormState)=>{},
  removeIngredientCategoryIngredientForm:(key:string)=>{},
  removeAllIngredientCategoryIngredientForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructIngredientCategoryForm(),
  ingredients:[]
});

interface IngredientCategoryFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function IngredientCategoryFormContextProvider({action, children}:IngredientCategoryFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<IngredientCategoryFormState>(constructIngredientCategoryForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<IngredientCategoryFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredients, setIngredients]= useState<IngredientDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание блюда'
      :`Редактирование блюда "${formState.id}. ${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadIngredientCategory()
    else
      setFormState(constructIngredientCategoryForm())

    setFormStateHistory([])
    
    setIngredients(await getIngredientsWithProducts()??[])
    
    setIsLoading(false)
  }

  async function loadIngredientCategory() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const ingredientCategory = await getIngredientCategoryWithIngredients(parseInt(id))

    if (ingredientCategory === null)
      throw Error("Не удалось получить данные блюда")
    setFormState(constructIngredientCategoryForm(ingredientCategory))
  }

  function saveToHistory(){
    setFormStateHistory([formState, ...formStateHistory].slice(0,historyLength))
  }

  function undo(){
    setFormState(formStateHistory[0])
    setFormStateHistory(formStateHistory.slice(1,formStateHistory.length))
  }

  function setName(name: string) {
    saveToHistory()
    setFormState({...formState, name:name})
  }

  function addIngredientCategoryIngredientForm(ingredient?: IngredientDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      ingredientCategoryIngredientForms:
        [
          ...formState.ingredientCategoryIngredientForms,
          constructIngredientCategoryIngredientForm(ingredient)
        ]})
  }

  function setIngredientCategoryIngredientFormState(state:IngredientCategoryIngredientFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientCategoryIngredientForms: formState.ingredientCategoryIngredientForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeIngredientCategoryIngredientForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientCategoryIngredientForms: 
        formState.ingredientCategoryIngredientForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllIngredientCategoryIngredientForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientCategoryIngredientForms: []
    })
  }

  async function update() {
    let dto = ingredientCategoryFormToDTO(formState)
    return await putIngredientCategoryWithIngredients(dto)
  }

  async function create() {
    let dto = ingredientCategoryFormToDTO(formState)
    return await postIngredientCategoryWithIngredients(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <ingredientCategoryFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      ingredients: ingredients,
      formState: formState,
      reloadState: initialize,
      addIngredientCategoryIngredientForm: addIngredientCategoryIngredientForm,
      setIngredientCategoryIngredientFormState: setIngredientCategoryIngredientFormState,
      removeIngredientCategoryIngredientForm: removeIngredientCategoryIngredientForm,
      removeAllIngredientCategoryIngredientForms: removeAllIngredientCategoryIngredientForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </ingredientCategoryFormContext.Provider>
  )
}

export default IngredientCategoryFormContextProvider