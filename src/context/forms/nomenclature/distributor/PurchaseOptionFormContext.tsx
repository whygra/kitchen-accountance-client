import { ProductDTO, getProducts } from '../../../../api/nomenclature/products';
import { 
  constructPurchaseOptionForm, 
  ProductFormState, 
  PurchaseOptionFormState, 
  purchaseOptionFormToDTO
} from '../../../../models/PurchaseOptionFormState';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { act, createContext, ReactElement, useEffect, useState } from 'react';
import { getPurchaseOptionWithProducts, postPurchaseOptionWithProducts, PurchaseOptionDTO, putPurchaseOptionWithProducts } from '../../../../api/nomenclature/purchaseOptions';
import { DistributorDTO, getDistributors } from '../../../../api/nomenclature/distributors';
import { getUnits, UnitDTO } from '../../../../api/nomenclature/units';
import Loading from '../../../../views/shared/Loading';

  
interface PurchaseOptionFormContext {
  formState: PurchaseOptionFormState
  products: ProductDTO[]
  distributors: DistributorDTO[]
  units: UnitDTO[]
  history: {canUndo: boolean, undo: ()=>void},
  setCode: (code:string)=>void 
  setIsRelevant: (value:boolean)=>void 
  setPrice: (price:number)=>void
  setUnitAction: (action:DataAction)=>void
  setUnitId: (id:number)=>void
  setUnitShort: (name:string)=>void
  setUnitLong: (name:string)=>void
  setProductId: (id:number)=>void
  setProductName: (name:string)=>void
  setProductAction: (action:DataAction)=>void
  setNetWeight: (netWeight:number)=>void
  setName: (name:string) => void
  setDistributorId: (id:number) => void
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
  setCode: (code:string)=>{},
  setIsRelevant: (value:boolean)=>{},
  setPrice: (price:number)=>{},
  setUnitAction: (action:DataAction)=>{},
  setUnitId: (id:number)=>{},
  setUnitShort: (name:string)=>{},
  setUnitLong: (name:string)=>{},
  setProductId: (id:number)=>{},
  setProductName: (name:string)=>{},
  setProductAction: (action: DataAction) => {},
  setNetWeight: (netWeight:number)=>{},
  setName: (name:string) => {},
  setDistributorId: (id:number) => {},
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
      :`Редактирование позиции закупки "${formState.name}"`
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

    console.log(purchaseOption)
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

  function setCode(code:string) {
    saveToHistory()
    setFormState({
      ...formState,
      code:code
    })
  }

  function setIsRelevant(value:boolean) {
    saveToHistory()
    setFormState({
      ...formState,
      isRelevant:value
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

  
  function setProductAction(action:DataAction){
    saveToHistory()
    setFormState({
      ...formState,
      productAction:action
    })
  }

  function setProductId(id:number){
    saveToHistory()
    setFormState({
      ...formState,
      productId:id
    })
  }

  function setProductName(name:string){
    saveToHistory()
    setFormState({
      ...formState,
      productName:name
    })
  }

  function setDistributorId(id:number){
    saveToHistory()
    setFormState({
      ...formState,
      distributorId:id
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
      setIsRelevant: setIsRelevant,
      setPrice: setPrice,
      setUnitAction: setUnitAction,
      setUnitId: setUnitId,
      setUnitShort: setUnitShort,
      setUnitLong: setUnitLong,
      setProductId: setProductId,
      setProductName: setProductName,
      setProductAction: setProductAction,
      setNetWeight: setNetWeight,
      setName: setName,
      setDistributorId: setDistributorId,
      requestFn: action==DataAction.Update ? update : create,
      reloadState: initialize,
      action: action,
    }}>

    {children}
    </purchaseOptionFormContext.Provider>
  )
}

export default PurchaseOptionFormContextProvider
