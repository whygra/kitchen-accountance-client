import DistributorForm from '../../../../views/distributor/form/DistributorForm';
import { DistributorDTO, getDistributorWithPurchaseOptions, postDistributorWithPurchaseOptions, putDistributorWithPurchaseOptions } from '../../../../api/nomenclature/distributors';
import { constructDistributorForm, constructDistributorPurchaseOptionForm, DistributorFormState, distributorFormToDTO, PurchaseOptionFormState } from '../../../../models/DistributorFormState';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { UnitDTO, getUnits } from '../../../../api/nomenclature/units';
import { ProductDTO, getProducts } from '../../../../api/nomenclature/products';
import { Image } from 'react-bootstrap';
import Loading from '../../../../views/shared/Loading';

  
interface DistributorFormContext {
  formState: DistributorFormState
  products: ProductDTO[]
  units: UnitDTO[]
  history: {canUndo: boolean, undo: ()=>void},
  reloadState: ()=>Promise<void>
  addPurchaseOptionForm: ()=>void
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>void
  removePurchaseOptionForm: (key:string)=>void    
  removeAllPurchaseOptionForms: ()=>void    
  requestFn:()=>Promise<DistributorDTO|null>
  setName:(name:string)=>void
}  

export const distributorFormContext = createContext<DistributorFormContext>({
  formState: constructDistributorForm(),
  products: [],
  units: [],
  history: {canUndo: false, undo: ()=>{}},
  reloadState: async()=>{},
  addPurchaseOptionForm: ()=>{},
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>{},
  removePurchaseOptionForm: (key:string)=>{},
  removeAllPurchaseOptionForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
})

interface DistributorFormContextProviderProps{
  action: DataAction
  children: ReactElement
}

function DistributorFormContextProvider({action, children}:DistributorFormContextProviderProps) 
{  
  const [initDTO, setInitDTO] = useState<DistributorDTO>()
  const [formState, setFormState] = useState<DistributorFormState>(constructDistributorForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<DistributorFormState[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [units, setUnits] = useState<UnitDTO[]>([])
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание данных поставщика'
      :`Редактирование данных поставщика "${formState.name}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      await loadDistributor()
    else
      setFormState(constructDistributorForm())

    setFormStateHistory([])

    setUnits(await getUnits()??[]);
    setProducts([{id:0, name:'нет'}, ...(await getProducts()??[])]);

    setIsLoading(false)
  }

  async function loadDistributor() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const distributor = await getDistributorWithPurchaseOptions(parseInt(id))

    if (distributor === null)
      throw Error("Не удалось получить данные поставщика")

    setInitDTO(distributor)
    setFormState(
      constructDistributorForm(distributor)
    )
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

  function addPurchaseOptionForm() {
    saveToHistory()
    setFormState({
      ...formState, 
      purchaseOptionForms:
        [
          ...formState.purchaseOptionForms,
          constructDistributorPurchaseOptionForm()
        ]})
  }

function setPurchaseOptionFormState(state:PurchaseOptionFormState) {
    saveToHistory()
    setFormState({
    ...formState,
    purchaseOptionForms: formState.purchaseOptionForms
    .map(s=>s.key == state.key ? state : s)
  })
}

  function removePurchaseOptionForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      purchaseOptionForms: 
        formState.purchaseOptionForms
        .filter((s)=>s.key!=key)
    })    
  }

  function removeAllPurchaseOptionForms(){
    saveToHistory()
    setFormState({
      ...formState,
      purchaseOptionForms: []
    })
  }

  async function update() {
    return await putDistributorWithPurchaseOptions(distributorFormToDTO(formState, initDTO))
  }

  async function create() {
    return await postDistributorWithPurchaseOptions(distributorFormToDTO(formState))
  }
  
  return (
    <distributorFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      addPurchaseOptionForm: addPurchaseOptionForm,
      setPurchaseOptionFormState: setPurchaseOptionFormState,
      removePurchaseOptionForm: removePurchaseOptionForm,
      removeAllPurchaseOptionForms: removeAllPurchaseOptionForms,
      formState: formState,
      units: units,
      products: products,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {isLoading ? <Loading/> : children}
    </distributorFormContext.Provider>
  )
}

export default DistributorFormContextProvider
