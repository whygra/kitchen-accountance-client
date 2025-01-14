import { getProductsWithPurchaseOptions, ProductDTO } from '../../../api/products';
import { DataAction } from '../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { ProductCategoryProductFormState, ProductCategoryFormState, constructProductCategoryForm, constructProductCategoryProductForm, productCategoryFormToDTO } from '../../../models/product/ProductCategoryFormState';
import { ProductCategoryDTO, getProductCategoryWithProducts, putProductCategoryWithProducts, postProductCategoryWithProducts } from '../../../api/productCategories';
import Loading from '../../../views/shared/Loading';


// контекст формы блюда
interface ProductCategoryFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addProductCategoryProductForm: (product?: ProductDTO)=>void
  setProductCategoryProductFormState: (state:ProductCategoryProductFormState)=>void
  removeProductCategoryProductForm: (key:string)=>void
  removeAllProductCategoryProductForms: ()=>void
  requestFn: ()=>Promise<ProductCategoryDTO|null>
  setName: (name:string)=>void
  formState: ProductCategoryFormState
  products:ProductDTO[]
}

export const productCategoryFormContext = createContext<ProductCategoryFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addProductCategoryProductForm:(product?: ProductDTO)=>{},
  setProductCategoryProductFormState:(state:ProductCategoryProductFormState)=>{},
  removeProductCategoryProductForm:(key:string)=>{},
  removeAllProductCategoryProductForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructProductCategoryForm(),
  products:[]
});

interface ProductCategoryFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function ProductCategoryFormContextProvider({action, children}:ProductCategoryFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<ProductCategoryFormState>(constructProductCategoryForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<ProductCategoryFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [products, setProducts]= useState<ProductDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание категории продуктов'
      :`Редактирование категории продуктов "${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadProductCategory()
    else
      setFormState(constructProductCategoryForm())

    setFormStateHistory([])
    
    setProducts(await getProductsWithPurchaseOptions()??[])
    
    setIsLoading(false)
  }

  async function loadProductCategory() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id категории продуктов")

    const productCategory = await getProductCategoryWithProducts(parseInt(id))

    if (productCategory === null)
      throw Error("Не удалось получить данные категории продуктов")
    setFormState(constructProductCategoryForm(productCategory))
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

  function addProductCategoryProductForm(product?: ProductDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      productCategoryProductForms:
        [
          ...formState.productCategoryProductForms,
          constructProductCategoryProductForm(product)
        ]})
  }

  function setProductCategoryProductFormState(state:ProductCategoryProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      productCategoryProductForms: formState.productCategoryProductForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeProductCategoryProductForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      productCategoryProductForms: 
        formState.productCategoryProductForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllProductCategoryProductForms(){
    saveToHistory()
    setFormState({
      ...formState,
      productCategoryProductForms: []
    })
  }

  async function update() {
    let dto = productCategoryFormToDTO(formState)
    return await putProductCategoryWithProducts(dto)
  }

  async function create() {
    let dto = productCategoryFormToDTO(formState)
    return await postProductCategoryWithProducts(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <productCategoryFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      products: products,
      formState: formState,
      reloadState: initialize,
      addProductCategoryProductForm: addProductCategoryProductForm,
      setProductCategoryProductFormState: setProductCategoryProductFormState,
      removeProductCategoryProductForm: removeProductCategoryProductForm,
      removeAllProductCategoryProductForms: removeAllProductCategoryProductForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </productCategoryFormContext.Provider>
  )
}

export default ProductCategoryFormContextProvider