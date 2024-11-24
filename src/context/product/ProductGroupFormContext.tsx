import { getProductsWithPurchaseOptions, ProductDTO } from '../../api/products';
import { DataAction } from '../../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { ProductGroupProductFormState, ProductGroupFormState, constructProductGroupForm, constructProductGroupProductForm, productGroupFormToDTO } from '../../models/product/ProductGroupFormState';
import { ProductGroupDTO, getProductGroups, postProductGroup, putProductGroup, deleteProductGroup, getProductGroupWithProducts, putProductGroupWithProducts, postProductGroupWithProducts } from '../../api/productGroups';
import Loading from '../../views/shared/Loading';


// контекст формы блюда
interface ProductGroupFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  addProductGroupProductForm: (product?: ProductDTO)=>void
  setProductGroupProductFormState: (state:ProductGroupProductFormState)=>void
  removeProductGroupProductForm: (key:string)=>void
  removeAllProductGroupProductForms: ()=>void
  requestFn: ()=>Promise<ProductGroupDTO|null>
  setName: (name:string)=>void
  formState: ProductGroupFormState
  products:ProductDTO[]
}

export const productGroupFormContext = createContext<ProductGroupFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  addProductGroupProductForm:(product?: ProductDTO)=>{},
  setProductGroupProductFormState:(state:ProductGroupProductFormState)=>{},
  removeProductGroupProductForm:(key:string)=>{},
  removeAllProductGroupProductForms: ()=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState: constructProductGroupForm(),
  products:[]
});

interface ProductGroupFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function ProductGroupFormContextProvider({action, children}:ProductGroupFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<ProductGroupFormState>(constructProductGroupForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<ProductGroupFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [products, setProducts]= useState<ProductDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание блюда'
      :`Редактирование блюда "${formState.id}. ${formState.name}"`
  }, [formState])
  
  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadProductGroup()
    else
      setFormState(constructProductGroupForm())

    setFormStateHistory([])
    
    setProducts(await getProductsWithPurchaseOptions()??[])
    
    setIsLoading(false)
  }

  async function loadProductGroup() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const productGroup = await getProductGroupWithProducts(parseInt(id))

    if (productGroup === null)
      throw Error("Не удалось получить данные блюда")
    setFormState(constructProductGroupForm(productGroup))
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

  function addProductGroupProductForm(product?: ProductDTO) {
    saveToHistory()
    setFormState({
      ...formState, 
      productGroupProductForms:
        [
          ...formState.productGroupProductForms,
          constructProductGroupProductForm(product)
        ]})
  }

  function setProductGroupProductFormState(state:ProductGroupProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      productGroupProductForms: formState.productGroupProductForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeProductGroupProductForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      productGroupProductForms: 
        formState.productGroupProductForms
        .filter((s)=>s.key!=key)
    })
  }

  function removeAllProductGroupProductForms(){
    saveToHistory()
    setFormState({
      ...formState,
      productGroupProductForms: []
    })
  }

  async function update() {
    let dto = productGroupFormToDTO(formState)
    return await putProductGroupWithProducts(dto)
  }

  async function create() {
    let dto = productGroupFormToDTO(formState)
    return await postProductGroupWithProducts(dto)
  }
  
  return isLoading ? (<Loading/>) : (
    <productGroupFormContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      products: products,
      formState: formState,
      reloadState: initialize,
      addProductGroupProductForm: addProductGroupProductForm,
      setProductGroupProductFormState: setProductGroupProductFormState,
      removeProductGroupProductForm: removeProductGroupProductForm,
      removeAllProductGroupProductForms: removeAllProductGroupProductForms,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </productGroupFormContext.Provider>
  )
}

export default ProductGroupFormContextProvider