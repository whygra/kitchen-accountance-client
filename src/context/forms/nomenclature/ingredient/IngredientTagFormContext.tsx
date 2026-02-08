import { getIngredientsWithProducts, IngredientDTO } from '../../../../api/nomenclature/ingredients';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { IngredientTagIngredientFormState, IngredientTagFormState, constructIngredientTagForm, constructIngredientTagIngredientForm, ingredientTagFormToDTO } from '../../../../models/ingredient/IngredientTagFormState';
import { IngredientTypeDTO, getIngredientTypes } from '../../../../api/nomenclature/ingredientTypes';
import { IngredientTagDTO, getIngredientTags, postIngredientTag, putIngredientTag, deleteIngredientTag, getIngredientTagWithIngredients, putIngredientTagWithIngredients, postIngredientTagWithIngredients } from '../../../../api/nomenclature/ingredientTags';
import Loading from '../../../../views/shared/Loading';


// контекст формы блюда
interface IngredientTagFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addIngredientTagIngredientForm: (ingredient?: IngredientDTO)=>void
  setIngredientTagIngredientFormState: (state:IngredientTagIngredientFormState)=>void
  removeIngredientTagIngredientForm: (key:string)=>void
  removeAllIngredientTagIngredientForms: ()=>void
  requestFn: ()=>Promise<IngredientTagDTO|null>
  setName: (name:string)=>void
  formState: IngredientTagFormState
  ingredients:IngredientDTO[]
}

export const ingredientTagFormContext = createContext<IngredientTagFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addIngredientTagIngredientForm:(ingredient?: IngredientDTO)=>{},
  setIngredientTagIngredientFormState:(state:IngredientTagIngredientFormState)=>{},
  removeIngredientTagIngredientForm:(key:string)=>{},
  removeAllIngredientTagIngredientForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructIngredientTagForm(),
  ingredients:[]
});

interface IngredientTagFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function IngredientTagFormContextProvider({action, children}:IngredientTagFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<IngredientTagFormState>(constructIngredientTagForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<IngredientTagFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredients, setIngredients]= useState<IngredientDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание группы ингредиентов'
      :`Редактирование группы ингредиентов "${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadIngredientTag()
    else
      setFormState(constructIngredientTagForm())

    setFormStateHistory([])
    
    setIngredients(await getIngredientsWithProducts()??[])
    
    setIsLoading(false)
  }

  async function loadIngredientTag() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id группы ингредиентов")

    const ingredientTag = await getIngredientTagWithIngredients(parseInt(id))

    if (ingredientTag === null)
      throw Error("Не удалось получить данные группы ингредиентов")
    setFormState(constructIngredientTagForm(ingredientTag))
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

  function addIngredientTagIngredientForm(ingredient?: IngredientDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      ingredientTagIngredientForms:
        [
          ...formState.ingredientTagIngredientForms,
          constructIngredientTagIngredientForm(ingredient)
        ]})
  }

  function setIngredientTagIngredientFormState(state:IngredientTagIngredientFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientTagIngredientForms: formState.ingredientTagIngredientForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeIngredientTagIngredientForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientTagIngredientForms: 
        formState.ingredientTagIngredientForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllIngredientTagIngredientForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientTagIngredientForms: []
    })
  }

  async function update() {
    let dto = ingredientTagFormToDTO(formState)
    return await putIngredientTagWithIngredients(dto)
  }

  async function create() {
    let dto = ingredientTagFormToDTO(formState)
    return await postIngredientTagWithIngredients(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <ingredientTagFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      ingredients: ingredients,
      formState: formState,
      reloadState: initialize,
      addIngredientTagIngredientForm: addIngredientTagIngredientForm,
      setIngredientTagIngredientFormState: setIngredientTagIngredientFormState,
      removeIngredientTagIngredientForm: removeIngredientTagIngredientForm,
      removeAllIngredientTagIngredientForms: removeAllIngredientTagIngredientForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </ingredientTagFormContext.Provider>
  )
}

export default IngredientTagFormContextProvider