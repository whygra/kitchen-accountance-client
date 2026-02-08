import { getProductsWithPurchaseOptions, ProductDTO } from '../../../../api/nomenclature/products';
import { DataAction } from '../../../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { ProductTagProductFormState, ProductTagFormState, constructProductTagForm, constructProductTagProductForm, productTagFormToDTO } from '../../../../models/product/ProductTagFormState';
import { ProductTagDTO, getProductTags, postProductTag, putProductTag, deleteProductTag, getProductTagWithProducts, putProductTagWithProducts, postProductTagWithProducts } from '../../../../api/nomenclature/productTags';
import Loading from '../../../../views/shared/Loading';


// контекст формы блюда
interface ProductTagFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addProductTagProductForm: (product?: ProductDTO)=>void
  setProductTagProductFormState: (state:ProductTagProductFormState)=>void
  removeProductTagProductForm: (key:string)=>void
  removeAllProductTagProductForms: ()=>void
  requestFn: ()=>Promise<ProductTagDTO|null>
  setName: (name:string)=>void
  formState: ProductTagFormState
  products:ProductDTO[]
}

export const productTagFormContext = createContext<ProductTagFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addProductTagProductForm:(product?: ProductDTO)=>{},
  setProductTagProductFormState:(state:ProductTagProductFormState)=>{},
  removeProductTagProductForm:(key:string)=>{},
  removeAllProductTagProductForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructProductTagForm(),
  products:[]
});

interface ProductTagFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function ProductTagFormContextProvider({action, children}:ProductTagFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<ProductTagFormState>(constructProductTagForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<ProductTagFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [products, setProducts]= useState<ProductDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание группы продуктов'
      :`Редактирование группы продуктов "${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadProductTag()
    else
      setFormState(constructProductTagForm())

    setFormStateHistory([])
    
    setProducts(await getProductsWithPurchaseOptions()??[])
    
    setIsLoading(false)
  }

  async function loadProductTag() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id группы продуктов")

    const productTag = await getProductTagWithProducts(parseInt(id))

    if (productTag === null)
      throw Error("Не удалось получить данные группы продуктов")
    setFormState(constructProductTagForm(productTag))
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

  function addProductTagProductForm(product?: ProductDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      productTagProductForms:
        [
          ...formState.productTagProductForms,
          constructProductTagProductForm(product)
        ]})
  }

  function setProductTagProductFormState(state:ProductTagProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      productTagProductForms: formState.productTagProductForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeProductTagProductForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      productTagProductForms: 
        formState.productTagProductForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllProductTagProductForms(){
    saveToHistory()
    setFormState({
      ...formState,
      productTagProductForms: []
    })
  }

  async function update() {
    let dto = productTagFormToDTO(formState)
    return await putProductTagWithProducts(dto)
  }

  async function create() {
    let dto = productTagFormToDTO(formState)
    return await postProductTagWithProducts(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <productTagFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      products: products,
      formState: formState,
      reloadState: initialize,
      addProductTagProductForm: addProductTagProductForm,
      setProductTagProductFormState: setProductTagProductFormState,
      removeProductTagProductForm: removeProductTagProductForm,
      removeAllProductTagProductForms: removeAllProductTagProductForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </productTagFormContext.Provider>
  )
}

export default ProductTagFormContextProvider