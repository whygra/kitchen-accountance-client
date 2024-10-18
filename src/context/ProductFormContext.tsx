import ProductForm from '../views/product/form/ProductForm';
import { ProductDTO, getProductWithPurchaseOptions, postProductWithPurchaseOptions, putProductWithPurchaseOptions } from '../api/products';
import { 
  constructProductForm, 
  constructProductPurchaseOptionForm, 
  ProductFormState, 
  productFormToDTO, 
  PurchaseOptionFormState 
} from '../models/ProductFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { UnitDTO, getUnits } from '../api/units';
import { getPurchaseOptions, PurchaseOptionDTO } from '../api/purchaseOptions';
import { getProductCategories, ProductCategoryDTO } from '../api/productCategories';
import TableSelect from '../views/shared/selectCreateGroup/TableSelect';
import { Image, Modal } from 'react-bootstrap';
import useSortPurchaseOptions, { PurchaseOptionField } from '../hooks/sort/useSortPurchaseOptions';
import useFilterPurchaseOptions from '../hooks/filter/useFilterPurchaseOptions';
import PurchaseOptionsTableItem from '../views/purchase_option/table/PurchaseOptionsTableItem';
import PurchaseOptionsTableHeader from '../views/purchase_option/table/PurchaseOptionsTableHeader';
import usePurchaseOptionsTableHeader from '../hooks/usePurchaseOptionsTableHeader';
import Loading from '../views/shared/Loading';

  
interface ProductFormContext {
  formState: ProductFormState
  purchaseOptions: PurchaseOptionDTO[]
  categories: ProductCategoryDTO[]
  history: {canUndo: boolean, undo: ()=>void},
  reloadState: ()=>Promise<void>
  setName: (name:string) => void
  setCategoryId: (id:number) => void
  setCategoryAction : (action:DataAction) => void
  setCategoryName: (name:string) => void
  addPurchaseOptionForm: (purchaseOption?: PurchaseOptionFormState)=>void
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>void
  removePurchaseOptionForm: (key:string)=>void    
  removeAllPurchaseOptionForms: ()=>void    
  requestFn:()=>Promise<ProductDTO|null>
}  

export const productFormContext = createContext<ProductFormContext>({
  formState: constructProductForm(),
  purchaseOptions: [],
  categories: [],
  history: {canUndo: false, undo: ()=>{}},
  reloadState: async()=>{},
  setName: (name:string) => {},
  setCategoryId: (id:number) => {},
  setCategoryName: (name:string) => {},
  setCategoryAction : (action:DataAction) => {},
  addPurchaseOptionForm: (purchaseOption?: PurchaseOptionFormState)=>{},
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>{},
  removePurchaseOptionForm: (key:string)=>{},
  removeAllPurchaseOptionForms: ()=>{},    
  requestFn:async()=>null,
})

interface ProductFormContextProviderProps{
  action: DataAction
  children: ReactElement
}

function ProductFormContextProvider({action, children}:ProductFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<ProductFormState>(constructProductForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<ProductFormState[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [purchaseOptions, setPurchaseOptions] = useState<PurchaseOptionDTO[]>([]) 
  const [categories, setCategories] = useState<ProductCategoryDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание продукта'
      :`Редактирование продукта "${formState.id}. ${formState.name}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadProduct()
    else
      setFormState(constructProductForm())

    setFormStateHistory([])

    setPurchaseOptions(await getPurchaseOptions()??[]);
    setCategories([{id:0,name:'без категории'}, ...(await getProductCategories()??[])]);

    setIsLoading(false)
  }

  async function loadProduct() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id продукта")

    const product = await getProductWithPurchaseOptions(parseInt(id))

    if (product === null)
      throw Error("Не удалось получить данные о поставщике")

    setFormState(
      constructProductForm(product)
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
    setFormState({
      ...formState, 
      name:name
    })
  }

  function setCategoryId(id:number) {
    saveToHistory()
    setFormState({
      ...formState, 
      categoryId:id
    })
  }

  function setCategoryName(name:string) {
    saveToHistory()
    setFormState({
      ...formState, 
      categoryName:name
    })
  }

  function setCategoryAction(action:DataAction) {
    saveToHistory()
    setFormState({
      ...formState, 
      categoryDataAction:action
    })
  }

  function addPurchaseOptionForm(purchaseOptionForm?: PurchaseOptionFormState) {
    saveToHistory()
      console.log(purchaseOptionForm)
    setFormState({
      ...formState, 
      purchaseOptionForms:
        [
          ...formState.purchaseOptionForms,
          purchaseOptionForm ?? constructProductPurchaseOptionForm()
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

  function removeAllPurchaseOptionForms() {
    saveToHistory()
    setFormState({
      ...formState,
      purchaseOptionForms: []
    })
  }

  async function update() {
    return await putProductWithPurchaseOptions(productFormToDTO(formState))
  }

  async function create() {
    return await postProductWithPurchaseOptions(productFormToDTO(formState))
  }
  
  return isLoading ? (<Loading/>) : (
    <productFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      addPurchaseOptionForm: addPurchaseOptionForm,
      setPurchaseOptionFormState: setPurchaseOptionFormState,
      removePurchaseOptionForm: removePurchaseOptionForm,
      removeAllPurchaseOptionForms: removeAllPurchaseOptionForms,
      setName: setName,
      setCategoryAction: setCategoryAction,
      setCategoryId: setCategoryId,
      setCategoryName: setCategoryName,
      categories: categories,
      purchaseOptions: purchaseOptions,
      formState: formState,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </productFormContext.Provider>
  )
}

export default ProductFormContextProvider
