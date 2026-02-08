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
import { getPurchaseOptionsWithProducts, PurchaseOptionDTO } from '../../../../api/nomenclature/purchaseOptions';
import Loading from '../../../../views/shared/Loading';
import { getProductTags, ProductTagDTO } from '../../../../api/nomenclature/productTags';

  
interface ProductFormContext {
  formState: ProductFormState
  purchaseOptions: PurchaseOptionDTO[]
  tags: ProductTagDTO[]
  history: {canUndo: boolean, undo: ()=>void},
  reloadState: ()=>Promise<void>
  setName: (name:string) => void
  addPurchaseOptionForm: (purchaseOption?: PurchaseOptionFormState)=>void
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>void
  removePurchaseOptionForm: (key:string)=>void    
  removeAllPurchaseOptionForms: ()=>void    
  addTag: (tag: string)=>void
  removeTag: (tag:string)=>void    
  removeAllTags: ()=>void    
  requestFn:()=>Promise<ProductDTO|null>
}  

export const productFormContext = createContext<ProductFormContext>({
  formState: constructProductForm(),
  purchaseOptions: [],
  tags: [],
  history: {canUndo: false, undo: ()=>{}},
  reloadState: async()=>{},
  setName: (name:string) => {},
  addPurchaseOptionForm: (purchaseOption?: PurchaseOptionFormState)=>{},
  setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>{},
  removePurchaseOptionForm: (key:string)=>{},
  removeAllPurchaseOptionForms: ()=>{},   
  addTag: (tag: string)=>{},
  removeTag: (key:string)=>{},
  removeAllTags: ()=>{},    
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
  const [tags, setTags] = useState<ProductTagDTO[]>([]) 

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
    setTags(await getProductTags()??[]);

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

  function addTag(tag: string) {
    saveToHistory()
    setFormState({
      ...formState, 
      tags:
        [
          ...formState.tags,
          tags.find(t=>t.name==tag) ?? {id:0, name:tag}
        ]})
  }

  function removeTag(tag:string){
    saveToHistory()
    setFormState({
      ...formState,
      tags: 
        formState.tags
        .filter((s)=>s.name!=tag)
    })
  }

  function removeAllTags(){
    saveToHistory()
    setFormState({
      ...formState,
      tags: []
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
      addTag: addTag,
      removeTag: removeTag,
      removeAllTags: removeAllTags,
      setName: setName,
      tags: tags,
      purchaseOptions: purchaseOptions,
      formState: formState,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </productFormContext.Provider>
  )
}

export default ProductFormContextProvider
