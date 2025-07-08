import ProductForm from '../../../../views/product/form/ProductForm';
import { ProductDTO, getProductWithPurchaseOptions, postProductWithPurchaseOptions, putProductWithPurchaseOptions } from '../../../../api/nomenclature/products';
import { 
  constructProductForm, 
  constructProductPurchaseOptionForm, 
  ProductFormState, 
  productFormToDTO, 
  PurchaseOptionFormState 
} from '../../../../models/product/ProductFormState';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { UnitDTO, getUnits } from '../../../../api/nomenclature/units';
import { getPurchaseOptions, getPurchaseOptionsWithProducts, PurchaseOptionDTO } from '../../../../api/nomenclature/purchaseOptions';
import { getProductCategories, ProductCategoryDTO } from '../../../../api/nomenclature/productCategories';
import TableSelect from '../../../../views/shared/selectCreateGroup/TableSelect';
import { Image, Modal } from 'react-bootstrap';
import useSortPurchaseOptions, { PurchaseOptionField } from '../../../../hooks/sort/useSortPurchaseOptions';
import useFilterPurchaseOptions from '../../../../hooks/filter/useFilterPurchaseOptions';
import PurchaseOptionsTableItem from '../../../../views/purchase_option/table/PurchaseOptionsTableItem';
import PurchaseOptionsTableHeader from '../../../../views/purchase_option/table/PurchaseOptionsTableHeader';
import usePurchaseOptionsTableHeader from '../../../../hooks/usePurchaseOptionsTableHeader';
import Loading from '../../../../views/shared/Loading';
import { getProductGroups, ProductGroupDTO } from '../../../../api/nomenclature/productGroups';

  
interface ProductFormContext {
  formState: ProductFormState
  purchaseOptions: PurchaseOptionDTO[]
  categories: ProductCategoryDTO[]
  groups: ProductGroupDTO[]
  history: {canUndo: boolean, undo: ()=>void},
  reloadState: ()=>Promise<void>
  setName: (name:string) => void
  setCategoryId: (id:number) => void
  setCategoryAction : (action:DataAction) => void
  setCategoryName: (name:string) => void
  setGroupId: (id:number) => void
  setGroupAction : (action:DataAction) => void
  setGroupName: (name:string) => void
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
  groups: [],
  history: {canUndo: false, undo: ()=>{}},
  reloadState: async()=>{},
  setName: (name:string) => {},
  setCategoryId: (id:number) => {},
  setCategoryName: (name:string) => {},
  setCategoryAction : (action:DataAction) => {},
  setGroupId: (id:number) => {},
  setGroupName: (name:string) => {},
  setGroupAction : (action:DataAction) => {},
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
  const [groups, setGroups] = useState<ProductGroupDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание продукта'
      :`Редактирование продукта "${formState.name}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadProduct()
    else
      setFormState(constructProductForm())

    setFormStateHistory([])

    setPurchaseOptions(await getPurchaseOptionsWithProducts()??[]);
    setCategories([{id:0,name:'без категории'}, ...(await getProductCategories()??[])]);
    setGroups([{id:0,name:'без группы'}, ...(await getProductGroups()??[])]);

    setIsLoading(false)
  }

  async function loadProduct() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id продукта")

    const product = await getProductWithPurchaseOptions(parseInt(id))

    if (product === null)
      throw Error("Не удалось получить данные о продукте")

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

  function setGroupId(id:number) {
    saveToHistory()
    setFormState({
      ...formState, 
      groupId:id
    })
  }

  function setGroupName(name:string) {
    saveToHistory()
    setFormState({
      ...formState, 
      groupName:name
    })
  }

  function setGroupAction(action:DataAction) {
    saveToHistory()
    setFormState({
      ...formState, 
      groupDataAction:action
    })
  }

  function addPurchaseOptionForm(purchaseOptionForm?: PurchaseOptionFormState) {
    saveToHistory()
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
      setGroupAction: setGroupAction,
      setGroupId: setGroupId,
      setGroupName: setGroupName,
      categories: categories,
      groups: groups,
      purchaseOptions: purchaseOptions,
      formState: formState,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </productFormContext.Provider>
  )
}

export default ProductFormContextProvider
