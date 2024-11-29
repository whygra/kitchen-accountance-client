import { getDishesWithIngredients, DishDTO } from '../../api/dishes';
import { DataAction } from '../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishCategoryDishFormState, DishCategoryFormState, constructDishCategoryForm, constructDishCategoryDishForm, dishCategoryFormToDTO } from '../../models/dish/DishCategoryFormState';
import { DishCategoryDTO, getDishCategories, postDishCategory, putDishCategory, deleteDishCategory, getDishCategoryWithDishes, putDishCategoryWithDishes, postDishCategoryWithDishes } from '../../api/dishCategories';
import Loading from '../../views/shared/Loading';
import { ServerImageData } from '../../api/constants';


// контекст формы блюда
interface DishCategoryFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addDishCategoryDishForm: (dish?: DishDTO)=>void
  setDishCategoryDishFormState: (state:DishCategoryDishFormState)=>void
  removeDishCategoryDishForm: (key:string)=>void
  removeAllDishCategoryDishForms: ()=>void
  requestFn: ()=>Promise<DishCategoryDTO|null>
  setName: (name:string)=>void
  formState: DishCategoryFormState
  dishes:DishDTO[]
}

export const dishCategoryFormContext = createContext<DishCategoryFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addDishCategoryDishForm:(dish?: DishDTO)=>{},
  setDishCategoryDishFormState:(state:DishCategoryDishFormState)=>{},
  removeDishCategoryDishForm:(key:string)=>{},
  removeAllDishCategoryDishForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructDishCategoryForm(),
  dishes:[]
});

interface DishCategoryFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function DishCategoryFormContextProvider({action, children}:DishCategoryFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<DishCategoryFormState>(constructDishCategoryForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<DishCategoryFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [dishes, setDishes]= useState<DishDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание категори блюд'
      :`Редактирование категории блюд "${formState.id}. ${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadDishCategory()
    else
      setFormState(constructDishCategoryForm())

    setFormStateHistory([])
    
    setDishes(await getDishesWithIngredients()??[])
    
    setIsLoading(false)
  }

  async function loadDishCategory() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id категории блюд")

    const dishCategory = await getDishCategoryWithDishes(parseInt(id))

    if (dishCategory === null)
      throw Error("Не удалось получить данные категории блюд")
    setFormState(constructDishCategoryForm(dishCategory))
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

  function addDishCategoryDishForm(dish?: DishDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      dishCategoryDishForms:
        [
          ...formState.dishCategoryDishForms,
          constructDishCategoryDishForm(dish)
        ]})
  }

  function setDishCategoryDishFormState(state:DishCategoryDishFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      dishCategoryDishForms: formState.dishCategoryDishForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeDishCategoryDishForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      dishCategoryDishForms: 
        formState.dishCategoryDishForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllDishCategoryDishForms(){
    saveToHistory()
    setFormState({
      ...formState,
      dishCategoryDishForms: []
    })
  }

  async function update() {
    let dto = dishCategoryFormToDTO(formState)
    return await putDishCategoryWithDishes(dto)
  }

  async function create() {
    let dto = dishCategoryFormToDTO(formState)
    return await postDishCategoryWithDishes(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <dishCategoryFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      dishes: dishes,
      formState: formState,
      reloadState: initialize,
      addDishCategoryDishForm: addDishCategoryDishForm,
      setDishCategoryDishFormState: setDishCategoryDishFormState,
      removeDishCategoryDishForm: removeDishCategoryDishForm,
      removeAllDishCategoryDishForms: removeAllDishCategoryDishForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </dishCategoryFormContext.Provider>
  )
}

export default DishCategoryFormContextProvider