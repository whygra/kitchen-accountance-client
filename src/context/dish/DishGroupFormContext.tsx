import { getDishesWithIngredients, DishDTO } from '../../api/dishes';
import { DataAction } from '../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishGroupDishFormState, DishGroupFormState, constructDishGroupForm, constructDishGroupDishForm, dishGroupFormToDTO } from '../../models/dish/DishGroupFormState';
import { DishGroupDTO, deleteDishGroup, getDishGroupWithDishes, putDishGroupWithDishes, postDishGroupWithDishes } from '../../api/dishGroups';
import Loading from '../../views/shared/Loading';
import { ServerImageData } from '../../api/constants';


// контекст формы блюда
interface DishGroupFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addDishGroupDishForm: (dish?: DishDTO)=>void
  setDishGroupDishFormState: (state:DishGroupDishFormState)=>void
  removeDishGroupDishForm: (key:string)=>void
  removeAllDishGroupDishForms: ()=>void
  requestFn: ()=>Promise<DishGroupDTO|null>
  setName: (name:string)=>void
  formState: DishGroupFormState
  dishes:DishDTO[]
}

export const dishGroupFormContext = createContext<DishGroupFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addDishGroupDishForm:(dish?: DishDTO)=>{},
  setDishGroupDishFormState:(state:DishGroupDishFormState)=>{},
  removeDishGroupDishForm:(key:string)=>{},
  removeAllDishGroupDishForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructDishGroupForm(),
  dishes:[]
});

interface DishGroupFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function DishGroupFormContextProvider({action, children}:DishGroupFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<DishGroupFormState>(constructDishGroupForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<DishGroupFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [dishes, setDishes]= useState<DishDTO[]>([])

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
      loadDishGroup()
    else
      setFormState(constructDishGroupForm())

    setFormStateHistory([])
    
    setDishes(await getDishesWithIngredients()??[])
    
    setIsLoading(false)
  }

  async function loadDishGroup() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const dishGroup = await getDishGroupWithDishes(parseInt(id))

    if (dishGroup === null)
      throw Error("Не удалось получить данные блюда")
    setFormState(constructDishGroupForm(dishGroup))
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

  function addDishGroupDishForm(dish?: DishDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      dishGroupDishForms:
        [
          ...formState.dishGroupDishForms,
          constructDishGroupDishForm(dish)
        ]})
  }

  function setDishGroupDishFormState(state:DishGroupDishFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      dishGroupDishForms: formState.dishGroupDishForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeDishGroupDishForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      dishGroupDishForms: 
        formState.dishGroupDishForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllDishGroupDishForms(){
    saveToHistory()
    setFormState({
      ...formState,
      dishGroupDishForms: []
    })
  }

  async function update() {
    let dto = dishGroupFormToDTO(formState)
    return await putDishGroupWithDishes(dto)
  }

  async function create() {
    let dto = dishGroupFormToDTO(formState)
    return await postDishGroupWithDishes(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <dishGroupFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      dishes: dishes,
      formState: formState,
      reloadState: initialize,
      addDishGroupDishForm: addDishGroupDishForm,
      setDishGroupDishFormState: setDishGroupDishFormState,
      removeDishGroupDishForm: removeDishGroupDishForm,
      removeAllDishGroupDishForms: removeAllDishGroupDishForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </dishGroupFormContext.Provider>
  )
}

export default DishGroupFormContextProvider