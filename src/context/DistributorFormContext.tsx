import DistributorForm from '../views/distributor/form/DistributorForm';
import { DistributorWithPurchaseOptionsDTO, getDistributorWithPurchaseOptions, postDistributorWithPurchaseOptions, putDistributorWithPurchaseOptions } from '../api/distributors';
import { constructDistributorForm, constructDistributorPurchaseOptionForm, DistributorFormState, distributorFormToDTO, PurchaseOptionFormState } from '../models/DistributorFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { UnitDTO, getUnits } from '../api/units';
import { ProductDTO, getProducts } from '../api/products';

  
interface DistributorFormContext {
  formState: DistributorFormState
  products: ProductDTO[]
  units: UnitDTO[]
  addPurchaseOptionForm: ()=>void
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>void
  removePurchaseOptionForm: (key:string)=>void    
  requestFn:()=>Promise<DistributorWithPurchaseOptionsDTO|null>
  setName:(name:string)=>void
}  

export const distributorFormContext = createContext<DistributorFormContext>({
  formState: constructDistributorForm(),
  products: [],
  units: [],
  addPurchaseOptionForm: ()=>{},
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>{},
  removePurchaseOptionForm: (key:string)=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
})

interface DistributorFormContextProviderProps{
  action: DataAction
  children: ReactElement
}

function DistributorFormContextProvider({action, children}:DistributorFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<DistributorFormState>(constructDistributorForm())
  const [isLoading, setIsLoading] = useState(false)
  const [units, setUnits] = useState<UnitDTO[]>([])
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadDistributor()

    setUnits(await getUnits()??[]);
    setProducts(await getProducts()??[]);

    setIsLoading(false)
  }

  async function loadDistributor() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const distributor = await getDistributorWithPurchaseOptions(parseInt(id))

    if (distributor === null)
      throw Error("Не удалось получить данные о поставщике")

    setFormState(
      constructDistributorForm(distributor)
    )
  }

  function setName(name: string) {
    setFormState({...formState, name:name})
  }

  function addPurchaseOptionForm() {
    console.log('add')
    setFormState({
      ...formState, 
      purchaseOptionForms:
        [
          ...formState.purchaseOptionForms,
          constructDistributorPurchaseOptionForm()
        ]})
  }

function setPurchaseOptionFormState(state:PurchaseOptionFormState) {
  setFormState({
    ...formState,
    purchaseOptionForms: formState.purchaseOptionForms
    .map(s=>s.key == state.key ? state : s)
  })
}

  function removePurchaseOptionForm(key:string){
    const index = formState.purchaseOptionForms.findIndex(s=>s.key==key)

    // если id <= 0 записи нет в бд - просто убираем из коллекции
    if (formState.purchaseOptionForms[index].id <= 0)
      setFormState({
        ...formState,
        purchaseOptionForms: 
          formState.purchaseOptionForms
          .filter((s, i)=>i!=index)
      })
      
    // иначе - помечаем на удаление
    else 
      setFormState({
        ...formState,
        purchaseOptionForms: 
          formState.purchaseOptionForms
          .map((s, i)=>{
            return i==index 
              ? {...s, dataAction: DataAction.Delete} 
              : s
            })
      })
  }

  async function update() {
    return await putDistributorWithPurchaseOptions(distributorFormToDTO(formState))
  }

  async function create() {
    return await postDistributorWithPurchaseOptions(distributorFormToDTO(formState))
  }
  
  return isLoading ? (<>Loading...</>) : (
    <distributorFormContext.Provider value={{
      addPurchaseOptionForm: addPurchaseOptionForm,
      setPurchaseOptionFormState: setPurchaseOptionFormState,
      removePurchaseOptionForm: removePurchaseOptionForm,
      formState: formState,
      units: units,
      products: products,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </distributorFormContext.Provider>
  )
}

export default DistributorFormContextProvider
