import { getPurchaseActWithItems, PurchaseActDTO, postPurchaseActWithItems, putPurchaseActWithItems } from '../../../api/storage/purchaseActs';
import { constructPurchaseActForm, constructPurchaseActItemForm, PurchaseActFormState, purchaseActFormToDTO, PurchaseActItemFormState } from '../../../models/storage/PurchaseActFormState';
import { DataAction } from '../../../models';
import { useParams } from 'react-router-dom';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { ProductDTO, getProducts } from '../../../api/nomenclature/products';
import { useErrorBoundary } from 'react-error-boundary';
import { Image } from 'react-bootstrap';
import Loading from '../../../views/shared/Loading';
import { DistributorDTO, getDistributors, getDistributorsWithPurchaseOptions } from '../../../api/nomenclature/distributors';
import { getPurchaseOptions, PurchaseOptionDTO } from '../../../api/nomenclature/purchaseOptions';
import { getUnits, UnitDTO } from '../../../api/nomenclature/units';

// контекст формы акта закупки
interface PurchaseActFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addItemForm: ()=>void
  setItemFormState: (state:PurchaseActItemFormState)=>void
  removeItemForm: (key:string)=>void
  removeAllItemForms:()=>void,
  requestFn: ()=>Promise<PurchaseActDTO|null>
  setDate: (date:string)=>void
  setDistributor: (distributor: DistributorDTO) => void
  formState: PurchaseActFormState
  distributors: DistributorDTO[]
  units: UnitDTO[]
}

export const purchaseActContext = createContext<PurchaseActFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addItemForm:()=>{},
  setItemFormState:(state:PurchaseActItemFormState)=>{},
  removeItemForm:(key:string)=>{},
  removeAllItemForms:()=>{},
  requestFn:async()=>null,
  setDate:(date:string)=>{},
  setDistributor: (distributor: DistributorDTO) => {},
  formState:constructPurchaseActForm(),
  distributors: [],
  units: []
});

interface PurchaseActFormContextProviderProps{
  action: DataAction
  children: ReactElement
}

function PurchaseActFormContextProvider({action, children}:PurchaseActFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<PurchaseActFormState>(constructPurchaseActForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<PurchaseActFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [distributors, setDistributors] = useState<DistributorDTO[]>([]) 
  const [units, setUnits] = useState<UnitDTO[]>([]) 

  const {id} = useParams()

  const {showBoundary} = useErrorBoundary()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание акта закупки'
      :`Редактирование акта закупки "${formState.date}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    try{

      if(id!==undefined || action==DataAction.Update) 
        loadPurchaseAct()
      else
        setFormState(constructPurchaseActForm())
      
      setFormStateHistory([])

      setDistributors(await getDistributorsWithPurchaseOptions()??[]);
      setUnits(await getUnits()??[]);

    } catch (e: any){
      showBoundary(e)
    }
    setIsLoading(false)
  }

  async function loadPurchaseAct() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id акта закупки")

    const purchaseAct = await getPurchaseActWithItems(parseInt(id))
    if (purchaseAct === null)
        throw Error("Не удалось получить данные акта закупки")

    setFormState(constructPurchaseActForm(purchaseAct))
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

  function setDistributor(distributor: DistributorDTO) {
    saveToHistory()
    setFormState({...formState, distributor:distributor})
  }

  function addItemForm() {
    saveToHistory()
    setFormState({
      ...formState,
      itemForms:
        [
          ...formState.itemForms,
          constructPurchaseActItemForm()
        ]})
  }

  function setItemFormState(state:PurchaseActItemFormState) {
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
    return await putPurchaseActWithItems(purchaseActFormToDTO(formState))
  }

  async function create() {
    return await postPurchaseActWithItems(purchaseActFormToDTO(formState))
  }
  
  return isLoading ? (<Loading/>) : (
    <purchaseActContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      addItemForm: addItemForm,
      setItemFormState: setItemFormState,
      removeItemForm: removeItemForm,
      removeAllItemForms: removeAllItemForms,
      formState: formState,
      distributors: distributors,
      units: units,
      setDate: setDate,
      setDistributor: setDistributor,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </purchaseActContext.Provider>
  )
}

export default PurchaseActFormContextProvider