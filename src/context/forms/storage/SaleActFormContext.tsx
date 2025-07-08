import { getSaleActWithItems, SaleActDTO, postSaleActWithItems, putSaleActWithItems } from '../../../api/storage/saleActs';
import { constructSaleActForm, constructSaleActItemForm, SaleActFormState, saleActFormToDTO, SaleActItemFormState } from '../../../models/storage/SaleActFormState';
import { DataAction } from '../../../models';
import { useParams } from 'react-router-dom';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishDTO, getDishes } from '../../../api/nomenclature/dishes';
import { useErrorBoundary } from 'react-error-boundary';
import { Image } from 'react-bootstrap';
import Loading from '../../../views/shared/Loading';

// контекст формы акта продажи
interface SaleActFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addItemForm: ()=>void
  setItemFormState: (state:SaleActItemFormState)=>void
  removeItemForm: (key:string)=>void
  removeAllItemForms:()=>void,
  requestFn: ()=>Promise<SaleActDTO|null>
  setDate: (date:string)=>void
  formState: SaleActFormState
  dishes: DishDTO[]
}

export const saleActContext = createContext<SaleActFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addItemForm:()=>{},
  setItemFormState:(state:SaleActItemFormState)=>{},
  removeItemForm:(key:string)=>{},
  removeAllItemForms:()=>{},
  requestFn:async()=>null,
  setDate:(date:string)=>{},
  formState:constructSaleActForm(),
  dishes: [],
});

interface SaleActFormContextProviderProps{
  action: DataAction
  children: ReactElement
}

function SaleActFormContextProvider({action, children}:SaleActFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<SaleActFormState>(constructSaleActForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<SaleActFormState[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dishes, setDishes] = useState<DishDTO[]>([]) 

  const {id} = useParams()

  const {showBoundary} = useErrorBoundary()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание акта продажи'
      :`Редактирование акта продажи "${formState.date}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    try{

      if(id!==undefined || action==DataAction.Update) 
        loadSaleAct()
      else
        setFormState(constructSaleActForm())
      
      setFormStateHistory([])

      setDishes(await getDishes()??[]);

    } catch (e: any){
      showBoundary(e)
    }
    setIsLoading(false)
  }

  async function loadSaleAct() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id акта продажи")

    const saleAct = await getSaleActWithItems(parseInt(id))
    if (saleAct === null)
        throw Error("Не удалось получить данные акта продажи")

    setFormState(constructSaleActForm(saleAct))
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

  function addItemForm() {
    saveToHistory()
    setFormState({
      ...formState,
      itemForms:
        [
          ...formState.itemForms,
          constructSaleActItemForm()
        ]
    })
  }

  function setItemFormState(state:SaleActItemFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      itemForms: formState.itemForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeItemForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      itemForms: 
        formState.itemForms
        .filter((s)=>s.key!=key)
    }) 
  }

  function removeAllItemForms(){
    saveToHistory()
    setFormState({
      ...formState,
      itemForms: []
    })
  }


  async function update() {
    return await putSaleActWithItems(saleActFormToDTO(formState))
  }

  async function create() {
    return await postSaleActWithItems(saleActFormToDTO(formState))
  }
  
  return isLoading ? (<Loading/>) : (
    <saleActContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      addItemForm: addItemForm,
      setItemFormState: setItemFormState,
      removeItemForm: removeItemForm,
      removeAllItemForms: removeAllItemForms,
      formState: formState,
      dishes: dishes,
      setDate: setDate,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </saleActContext.Provider>
  )
}

export default SaleActFormContextProvider