import { getDishesWithIngredients, DishDTO } from '../../../../api/nomenclature/dishes';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishTagDishFormState, DishTagFormState, constructDishTagForm, constructDishTagDishForm, dishTagFormToDTO } from '../../../../models/dish/DishTagFormState';
import { DishTagDTO, deleteDishTag, getDishTagWithDishes, putDishTagWithDishes, postDishTagWithDishes } from '../../../../api/nomenclature/dishTags';
import Loading from '../../../../views/shared/Loading';
import { ServerImageData } from '../../../../api/constants';


// контекст формы блюда
interface DishTagFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addDishTagDishForm: (dish?: DishDTO)=>void
  setDishTagDishFormState: (state:DishTagDishFormState)=>void
  removeDishTagDishForm: (key:string)=>void
  removeAllDishTagDishForms: ()=>void
  requestFn: ()=>Promise<DishTagDTO|null>
  setName: (name:string)=>void
  formState: DishTagFormState
  dishes:DishDTO[]
}

export const dishTagFormContext = createContext<DishTagFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addDishTagDishForm:(dish?: DishDTO)=>{},
  setDishTagDishFormState:(state:DishTagDishFormState)=>{},
  removeDishTagDishForm:(key:string)=>{},
  removeAllDishTagDishForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructDishTagForm(),
  dishes:[]
});

interface DishTagFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function DishTagFormContextProvider({action, children}:DishTagFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<DishTagFormState>(constructDishTagForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<DishTagFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [dishes, setDishes]= useState<DishDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание группы блюд'
      :`Редактирование группы блюд "${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadDishTag()
    else
      setFormState(constructDishTagForm())

    setFormStateHistory([])
    
    setDishes(await getDishesWithIngredients()??[])
    
    setIsLoading(false)
  }

  async function loadDishTag() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id группы блюд")

    const dishTag = await getDishTagWithDishes(parseInt(id))

    if (dishTag === null)
      throw Error("Не удалось получить данные группы блюд")
    setFormState(constructDishTagForm(dishTag))
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

  function addDishTagDishForm(dish?: DishDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      dishTagDishForms:
        [
          ...formState.dishTagDishForms,
          constructDishTagDishForm(dish)
        ]})
  }

  function setDishTagDishFormState(state:DishTagDishFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      dishTagDishForms: formState.dishTagDishForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeDishTagDishForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      dishTagDishForms: 
        formState.dishTagDishForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllDishTagDishForms(){
    saveToHistory()
    setFormState({
      ...formState,
      dishTagDishForms: []
    })
  }

  async function update() {
    let dto = dishTagFormToDTO(formState)
    return await putDishTagWithDishes(dto)
  }

  async function create() {
    let dto = dishTagFormToDTO(formState)
    return await postDishTagWithDishes(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <dishTagFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      dishes: dishes,
      formState: formState,
      reloadState: initialize,
      addDishTagDishForm: addDishTagDishForm,
      setDishTagDishFormState: setDishTagDishFormState,
      removeDishTagDishForm: removeDishTagDishForm,
      removeAllDishTagDishForms: removeAllDishTagDishForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </dishTagFormContext.Provider>
  )
}

export default DishTagFormContextProvider