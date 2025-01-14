import { getIngredientsWithProducts, IngredientDTO } from '../../../api/ingredients';
import { DataAction } from '../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { IngredientGroupIngredientFormState, IngredientGroupFormState, constructIngredientGroupForm, constructIngredientGroupIngredientForm, ingredientGroupFormToDTO } from '../../../models/ingredient/IngredientGroupFormState';
import { IngredientTypeDTO, getIngredientTypes } from '../../../api/ingredientTypes';
import { IngredientGroupDTO, getIngredientGroups, postIngredientGroup, putIngredientGroup, deleteIngredientGroup, getIngredientGroupWithIngredients, putIngredientGroupWithIngredients, postIngredientGroupWithIngredients } from '../../../api/ingredientGroups';
import Loading from '../../../views/shared/Loading';


// контекст формы блюда
interface IngredientGroupFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addIngredientGroupIngredientForm: (ingredient?: IngredientDTO)=>void
  setIngredientGroupIngredientFormState: (state:IngredientGroupIngredientFormState)=>void
  removeIngredientGroupIngredientForm: (key:string)=>void
  removeAllIngredientGroupIngredientForms: ()=>void
  requestFn: ()=>Promise<IngredientGroupDTO|null>
  setName: (name:string)=>void
  formState: IngredientGroupFormState
  ingredients:IngredientDTO[]
}

export const ingredientGroupFormContext = createContext<IngredientGroupFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addIngredientGroupIngredientForm:(ingredient?: IngredientDTO)=>{},
  setIngredientGroupIngredientFormState:(state:IngredientGroupIngredientFormState)=>{},
  removeIngredientGroupIngredientForm:(key:string)=>{},
  removeAllIngredientGroupIngredientForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructIngredientGroupForm(),
  ingredients:[]
});

interface IngredientGroupFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function IngredientGroupFormContextProvider({action, children}:IngredientGroupFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<IngredientGroupFormState>(constructIngredientGroupForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<IngredientGroupFormState[]>([])
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
      loadIngredientGroup()
    else
      setFormState(constructIngredientGroupForm())

    setFormStateHistory([])
    
    setIngredients(await getIngredientsWithProducts()??[])
    
    setIsLoading(false)
  }

  async function loadIngredientGroup() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id группы ингредиентов")

    const ingredientGroup = await getIngredientGroupWithIngredients(parseInt(id))

    if (ingredientGroup === null)
      throw Error("Не удалось получить данные группы ингредиентов")
    setFormState(constructIngredientGroupForm(ingredientGroup))
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

  function addIngredientGroupIngredientForm(ingredient?: IngredientDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      ingredientGroupIngredientForms:
        [
          ...formState.ingredientGroupIngredientForms,
          constructIngredientGroupIngredientForm(ingredient)
        ]})
  }

  function setIngredientGroupIngredientFormState(state:IngredientGroupIngredientFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientGroupIngredientForms: formState.ingredientGroupIngredientForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeIngredientGroupIngredientForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientGroupIngredientForms: 
        formState.ingredientGroupIngredientForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllIngredientGroupIngredientForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientGroupIngredientForms: []
    })
  }

  async function update() {
    let dto = ingredientGroupFormToDTO(formState)
    return await putIngredientGroupWithIngredients(dto)
  }

  async function create() {
    let dto = ingredientGroupFormToDTO(formState)
    return await postIngredientGroupWithIngredients(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <ingredientGroupFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      ingredients: ingredients,
      formState: formState,
      reloadState: initialize,
      addIngredientGroupIngredientForm: addIngredientGroupIngredientForm,
      setIngredientGroupIngredientFormState: setIngredientGroupIngredientFormState,
      removeIngredientGroupIngredientForm: removeIngredientGroupIngredientForm,
      removeAllIngredientGroupIngredientForms: removeAllIngredientGroupIngredientForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </ingredientGroupFormContext.Provider>
  )
}

export default IngredientGroupFormContextProvider