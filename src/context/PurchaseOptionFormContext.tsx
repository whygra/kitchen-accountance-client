import { ProductDTO, getProducts } from '../api/products';
import { 
  constructProductForm, 
  constructPurchaseOptionForm, 
  ProductFormState, 
  PurchaseOptionFormState, 
  purchaseOptionFormToDTO
} from '../models/PurchaseOptionFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { act, createContext, ReactElement, useEffect, useState } from 'react';
import { getPurchaseOptionWithProducts, postPurchaseOptionWithProducts, PurchaseOptionDTO, putPurchaseOptionWithProducts } from '../api/purchaseOptions';
import { DistributorDTO, getDistributors } from '../api/distributors';
import { getUnits, UnitDTO } from '../api/units';
import { Image } from 'react-bootstrap';
import Loading from '../views/shared/Loading';

  
interface PurchaseOptionFormContext {
  formState: PurchaseOptionFormState
  products: ProductDTO[]
  distributors: DistributorDTO[]
  units: UnitDTO[]
  history: {canUndo: boolean, undo: ()=>void},
  setCode: (code:number)=>void 
  setPrice: (price:number)=>void
  setUnitAction: (action:DataAction)=>void
  setUnitId: (id:number)=>void
  setUnitShort: (name:string)=>void
  setUnitLong: (name:string)=>void
  setNetWeight: (netWeight:number)=>void
  setName: (name:string) => void
  setDistributorId: (id:number) => void
  removeAllForms: ()=>void
  addProductForm: (form?:ProductFormState)=>void
  setProductFormState: (state:ProductFormState)=>void
  removeProductForm: (key:string)=>void    
  requestFn:()=>Promise<PurchaseOptionDTO|null>
  reloadState: ()=>Promise<void>
  action: DataAction
}  

export const purchaseOptionFormContext = createContext<PurchaseOptionFormContext>({
  formState: constructPurchaseOptionForm(),
  products: [],
  distributors: [],
  units: [],
  history: {canUndo: false, undo: ()=>{}},
  setCode: (code:number)=>{},
  setPrice: (price:number)=>{},
  setUnitAction: (action:DataAction)=>{},
  setUnitId: (id:number)=>{},
  setUnitShort: (name:string)=>{},
  setUnitLong: (name:string)=>{},
  setNetWeight: (netWeight:number)=>{},
  setName: (name:string) => {},
  setDistributorId: (id:number) => {},
  removeAllForms: ()=>{},
  addProductForm: (form?:ProductFormState)=>{},
  setProductFormState: (state:ProductFormState)=>{},
  removeProductForm: (key:string)=>{},
  requestFn:async()=>null,
  reloadState:async()=>{},
  action: DataAction.None,
})

interface PurchaseOptionFormContextProviderProps{
  action: DataAction
  children: ReactElement
}

function PurchaseOptionFormContextProvider({action, children}:PurchaseOptionFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<PurchaseOptionFormState>(constructPurchaseOptionForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<PurchaseOptionFormState[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<ProductDTO[]>([]) 
  const [units, setUnits] = useState<UnitDTO[]>([]) 
  const [distributors, setDistributors] = useState<DistributorDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание позиции закупки'
      :`Редактирование позиции закупки "${formState.id}. ${formState.name}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadPurchaseOption()
    else
      setFormState(constructPurchaseOptionForm())

    setFormStateHistory([])

    setProducts(await getProducts()??[]);
    setDistributors(await getDistributors()??[]);
    setUnits(await getUnits()??[])

    setIsLoading(false)
  }

  async function loadPurchaseOption() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id позиции закупки")

    const purchaseOption = await getPurchaseOptionWithProducts(parseInt(id))

    if (purchaseOption === null)
      throw Error("Не удалось получить данные позиции закупки")

    setFormState(
      constructPurchaseOptionForm(purchaseOption)
    )
  }

  function saveToHistory(){
    setFormStateHistory([formState, ...formStateHistory].slice(0,historyLength))
  }

  function undo(){
    setFormState(formStateHistory[0])
    setFormStateHistory(formStateHistory.slice(1,formStateHistory.length))
  }

  function setName(name:string) {
    saveToHistory()
    setFormState({
      ...formState,
      name:name
    })
  }

  function setCode(code:number) {
    saveToHistory()
    setFormState({
      ...formState,
      code:code
    })
  }

  function setPrice(price:number){
    saveToHistory()
    setFormState({
      ...formState,
      price:price
    })
  }

  function setUnitAction(action:DataAction){
    saveToHistory()
    setFormState({
      ...formState,
      unitAction:action
    })
  }

  function setUnitId(id:number){
    saveToHistory()
    setFormState({
      ...formState,
      unitId:id
    })
  }

  function setUnitShort(name:string){
    saveToHistory()
    setFormState({
      ...formState,
      unitShort:name
    })
  }

  function setUnitLong(name:string){
    saveToHistory()
    setFormState({
      ...formState,
      unitLong:name
    })
  }

  function setNetWeight(netWeight:number){
    saveToHistory()
    setFormState({
      ...formState,
      netWeight:netWeight
    })
  }


  function setDistributorId(id:number){
    saveToHistory()
    setFormState({
      ...formState,
      distributorId:id
    })
  }

  function removeAllForms() {
    saveToHistory()
    setFormState({
      ...formState,
      productForms: []
    })
  }

  function addProductForm(form?:ProductFormState) {
    saveToHistory()
    setFormState({
      ...formState, 
      productForms:
        [
          ...formState.productForms,
          form??constructProductForm()
        ]})
  }

  function setProductFormState(state:ProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      productForms: formState.productForms
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

  async function update() {
    return await putPurchaseOptionWithProducts(purchaseOptionFormToDTO(formState))
  }

  async function create() {
    return await postPurchaseOptionWithProducts(purchaseOptionFormToDTO(formState))
  }
  
  return isLoading ? (<Loading/>) : (
    <purchaseOptionFormContext.Provider value={{
      formState: formState,
      products: products,
      units: units,
      distributors: distributors,
      history: {canUndo: formStateHistory.length>0, undo: undo},
      setCode: setCode,
      setPrice: setPrice,
      setUnitAction: setUnitAction,
      setUnitId: setUnitId,
      setUnitShort: setUnitShort,
      setUnitLong: setUnitLong,
      setNetWeight: setNetWeight,
      setName: setName,
      setDistributorId: setDistributorId,
      removeAllForms: removeAllForms,
      addProductForm: addProductForm,
      setProductFormState: setProductFormState,
      removeProductForm: removeProductForm,
      requestFn: action==DataAction.Update ? update : create,
      reloadState: initialize,
      action: action,
    }}>

    {children}
    </purchaseOptionFormContext.Provider>
  )
}

export default PurchaseOptionFormContextProvider
