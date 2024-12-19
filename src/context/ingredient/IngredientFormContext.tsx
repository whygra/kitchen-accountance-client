import { getIngredientWithProducts, IngredientDTO, postIngredientWithProducts, putIngredientWithProducts } from '../../api/ingredients';
import { constructIngredientForm, constructIngredientProductForm, IngredientFormState, ingredientFormToDTO, IngredientProductFormState } from '../../models/ingredient/IngredientFormState';
import { DataAction } from '../../models';
import { useParams } from 'react-router-dom';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { IngredientTypeDTO, getIngredientTypes } from '../../api/ingredientTypes';
import { ProductDTO, getProducts } from '../../api/products';
import { IngredientCategoryDTO, getIngredientCategories } from '../../api/ingredientCategories';
import { useErrorBoundary } from 'react-error-boundary';
import { Image } from 'react-bootstrap';
import Loading from '../../views/shared/Loading';
import { getIngredientGroups, IngredientGroupDTO } from '../../api/ingredientGroups';

// контекст формы ингредиента
interface IngredientFormContext {
  history: {canUndo: boolean, undo: ()=>void}
  reloadState: ()=>void
  getWeightToPercentageCoefficient: ()=>number
  addIngredientProductForm: ()=>void
  setIngredientProductFormState: (state:IngredientProductFormState)=>void
  removeIngredientProductForm: (key:string)=>void
  removeAllIngredientProductForms:()=>void,
  requestFn: ()=>Promise<IngredientDTO|null>
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  setDescription: (description:string)=>void
  setCategoryName: (name:string)=>void
  setCategoryId: (id:number)=>void
  setCategoryDataAction: (action:DataAction)=>void
  setGroupName: (name:string)=>void
  setGroupId: (id:number)=>void
  setGroupDataAction: (action:DataAction)=>void
  setItemWeight: (weight:number)=>void,
  setIsItemMeasured: (value:boolean)=>void,
  categories:IngredientCategoryDTO[]
  groups:IngredientCategoryDTO[]
  formState: IngredientFormState
  ingredientTypes: IngredientTypeDTO[]
  products: ProductDTO[]
}

export const ingredientContext = createContext<IngredientFormContext>({
  history: {canUndo: false, undo: ()=>{}},
  reloadState: ()=>{},
  getWeightToPercentageCoefficient:()=>1,
  addIngredientProductForm:()=>{},
  setIngredientProductFormState:(state:IngredientProductFormState)=>{},
  removeIngredientProductForm:(key:string)=>{},
  removeAllIngredientProductForms:()=>{},
  requestFn:async()=>null,
  setTypeId:(id:number)=>{},
  setName:(name:string)=>{},
  setDescription:(description:string)=>{},
  setCategoryName: (name:string)=>{},
  setCategoryId: (id:number)=>{},
  setCategoryDataAction: (action:DataAction)=>{},
  setGroupName: (name:string)=>{},
  setGroupId: (id:number)=>{},
  setGroupDataAction: (action:DataAction)=>{},
  setItemWeight: (weight:number)=>{},
  setIsItemMeasured: (value:boolean)=>{},
  categories:[],
  groups:[],
  formState:constructIngredientForm(),
  ingredientTypes:[],
  products: []
});

interface IngredientFormContextProviderProps{
    action: DataAction
    children: ReactElement
}

function IngredientFormContextProvider({action, children}:IngredientFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<IngredientFormState>(constructIngredientForm())
  const historyLength = 10
  const [formStateHistory, setFormStateHistory] = useState<IngredientFormState[]>([])
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([]) 
  const [categories, setCategories]= useState<IngredientCategoryDTO[]>([])
  const [groups, setGroups]= useState<IngredientGroupDTO[]>([])
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  const {showBoundary} = useErrorBoundary()

  useEffect(()=>{
    document.title = action==DataAction.Create
      ?'Создание ингредиента'
      :`Редактирование ингредиента "${formState.id}. ${formState.name}"`
  }, [formState])

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    try{

      if(id!==undefined || action==DataAction.Update) 
        loadIngredient()
      else
        setFormState(constructIngredientForm())
      
      setFormStateHistory([])

      setIngredientTypes(await getIngredientTypes()??[]);
      setProducts(await getProducts()??[]);
      setCategories([{id:0, name:'без категории'}, ...await getIngredientCategories()??[]])
      setGroups([{id:0, name:'без группы'}, ...await getIngredientGroups()??[]])

    } catch (e: any){
      showBoundary(e)
    }
    setIsLoading(false)
  }

  async function loadIngredient() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const ingredient = await getIngredientWithProducts(parseInt(id))
    if (ingredient === null)
        throw Error("Не удалось получить данные ингредиента")

    setFormState(constructIngredientForm(ingredient))
  }

  function saveToHistory(){
    setFormStateHistory([formState, ...formStateHistory].slice(0,historyLength))
  }

  function undo(){
    setFormState(formStateHistory[0])
    setFormStateHistory(formStateHistory.slice(1,formStateHistory.length))
  }

  function setTypeId(id: number) {
    saveToHistory()
    setFormState({...formState, typeId:id})
  }

  function setName(name: string) {
    saveToHistory()
    setFormState({...formState, name:name})
  }

  function setDescription(description: string) {
    saveToHistory()
    setFormState({...formState, description:description})
  }

  function setCategoryId(categoryId: number) {
    saveToHistory()
    setFormState({...formState, categoryId:categoryId})
  }

  function setCategoryName(categoryName: string) {
    saveToHistory()
    setFormState({...formState, categoryName:categoryName})
  }

  function setCategoryDataAction(dataAction: DataAction) {
    saveToHistory()
    setFormState({...formState, categoryDataAction:dataAction})
  }

  function setGroupId(groupId: number) {
    saveToHistory()
    setFormState({...formState, groupId:groupId})
  }

  function setGroupName(groupName: string) {
    saveToHistory()
    setFormState({...formState, groupName:groupName})
  }

  function setGroupDataAction(dataAction: DataAction) {
    saveToHistory()
    setFormState({...formState, groupDataAction:dataAction})
  }

  function setItemWeight(weight: number) {
    saveToHistory()
    setFormState({...formState, itemWeight:weight})
    getStateWithWeightPercentages()
  }

  function setIsItemMeasured(value: boolean) {
    saveToHistory()
    setFormState({...formState, isItemMeasured:value})
  }

  function addIngredientProductForm() {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms:
        [
          ...formState.ingredientProductForms,
          constructIngredientProductForm()
        ]})
  }

  function setIngredientProductFormState(state:IngredientProductFormState) {
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms: formState.ingredientProductForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeIngredientProductForm(key:string){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms: 
        formState.ingredientProductForms
        .filter((s)=>s.key!=key)
    }) 
  }

  function removeAllIngredientProductForms(){
    saveToHistory()
    setFormState({
      ...formState,
      ingredientProductForms: []
    })
  }

  function getWeightToPercentageCoefficient() {
    const productTotalWeight = formState.ingredientProductForms
      .filter(p=>p.productDataAction!=DataAction.Delete)
      .reduce((total, current)=>total+current.weight, 0)
    return productTotalWeight==0 ? 0 : 100 / productTotalWeight
  }

  function getStateWithWeightPercentages() : IngredientFormState {
    const coef = getWeightToPercentageCoefficient()
    return {
      ...formState,
      ingredientProductForms:formState.ingredientProductForms
        .map(f=>{return{...f, weightPercentage:f.weight*coef}})
    }
  }

  async function update() {
    return await putIngredientWithProducts(ingredientFormToDTO(getStateWithWeightPercentages()))
  }

  async function create() {
    return await postIngredientWithProducts(ingredientFormToDTO(getStateWithWeightPercentages()))
  }
  
  return isLoading ? (<Loading/>) : (
    <ingredientContext.Provider value={{
      history: {canUndo: formStateHistory.length>0, undo: undo},
      reloadState: initialize,
      getWeightToPercentageCoefficient: getWeightToPercentageCoefficient,
      addIngredientProductForm: addIngredientProductForm,
      setIngredientProductFormState: setIngredientProductFormState,
      removeIngredientProductForm: removeIngredientProductForm,
      removeAllIngredientProductForms: removeAllIngredientProductForms,
      setCategoryDataAction: setCategoryDataAction,
      setCategoryId: setCategoryId,
      setCategoryName: setCategoryName,
      setGroupDataAction: setGroupDataAction,
      setGroupId: setGroupId,
      setGroupName: setGroupName,
      setItemWeight: setItemWeight,
      setIsItemMeasured: setIsItemMeasured,
      categories: categories,
      groups: groups,
      formState: getStateWithWeightPercentages(),
      ingredientTypes: ingredientTypes,
      products: products,
      setTypeId: setTypeId,
      setName: setName,
      setDescription: setDescription,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </ingredientContext.Provider>
  )
}

export default IngredientFormContextProvider