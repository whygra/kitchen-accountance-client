import { getIngredientWithProducts, IngredientWithProductsDTO, postIngredientWithProducts, putIngredientWithProducts } from '../api/ingredients';
import { constructIngredientForm, constructIngredientProductForm, IngredientFormState, ingredientFormToDTO, IngredientProductFormState } from '../models/IngredientFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { IngredientTypeDTO, getIngredientTypes } from '../api/ingredientTypes';
import { ProductDTO, getProducts } from '../api/products';
import { IngredientCategoryDTO, getIngredientCategories } from '../api/ingredientCategories';

// контекст формы ингредиента
interface IngredientFormContext {
  castToValidPercentages: ()=>void
  addIngredientProductForm: ()=>void
  setIngredientProductFormState: (state:IngredientProductFormState)=>void
  removeIngredientProductForm: (key:string)=>void
  requestFn: ()=>Promise<IngredientWithProductsDTO|null>
  setTypeId: (id:number)=>void
  setName: (name:string)=>void
  setCategoryName: (name:string)=>void
  setCategoryId: (id:number)=>void
  setCategoryDataAction: (action:DataAction)=>void
  setItemWeight: (weight:number)=>void,
  setIsItemMeasured: (value:boolean)=>void,
  categories:IngredientCategoryDTO[]
  formState: IngredientFormState
  ingredientTypes: IngredientTypeDTO[]
  products: ProductDTO[]
}

export const ingredientContext = createContext<IngredientFormContext>({
  castToValidPercentages:()=>{},
  addIngredientProductForm:()=>{},
  setIngredientProductFormState:(state:IngredientProductFormState)=>{},
  removeIngredientProductForm:(key:string)=>{},
  requestFn:async()=>null,
  setTypeId:(id:number)=>{},
  setName:(name:string)=>{},
  setCategoryName: (name:string)=>{},
  setCategoryId: (id:number)=>{},
  setCategoryDataAction: (action:DataAction)=>{},
  setItemWeight: (weight:number)=>{},
  setIsItemMeasured: (value:boolean)=>{},
  categories:[],
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
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([]) 
  const [categories, setCategories]= useState<IngredientCategoryDTO[]>([])
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadIngredient()

    setIngredientTypes(await getIngredientTypes()??[]);
    setProducts(await getProducts()??[]);
    setCategories(await getIngredientCategories()??[])
    setIsLoading(false)
  }

  async function loadIngredient() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const ingredient = await getIngredientWithProducts(parseInt(id))

    if (ingredient === null)
        throw Error("Не удалось получить данные об ингредиенте")

    setFormState(constructIngredientForm(ingredient))
  }

  function setTypeId(id: number) {
    setFormState({...formState, typeId:id})
  }

  function setName(name: string) {
    setFormState({...formState, name:name})
  }

  function setCategoryId(categoryId: number) {
    setFormState({...formState, categoryId:categoryId})
  }

  function setCategoryName(categoryName: string) {
    setFormState({...formState, categoryName:categoryName})
  }

  function setCategoryDataAction(dataAction: DataAction) {
    setFormState({...formState, categoryDataAction:dataAction})
  }

  function setItemWeight(weight: number) {
    setFormState({...formState, itemWeight:weight})
  }

  function setIsItemMeasured(value: boolean) {
    setFormState({...formState, isItemMeasured:value})
  }

  function addIngredientProductForm() {
    setFormState({
      ...formState, 
      ingredientProductForms:
        [
          ...formState.ingredientProductForms,
          constructIngredientProductForm()
        ]})
  }

function setIngredientProductFormState(state:IngredientProductFormState) {
  setFormState({
    ...formState,
    ingredientProductForms: formState.ingredientProductForms
    .map(s=>s.key == state.key ? state : s)
  })
}

  function removeIngredientProductForm(key:string){
    const index = formState.ingredientProductForms.findIndex(s=>s.key==key)

    // если id <= 0 записи нет в бд - просто убираем из коллекции
    if (formState.ingredientProductForms[index].id <= 0)
      setFormState({
        ...formState,
        ingredientProductForms: 
          formState.ingredientProductForms
          .filter((s, i)=>i!=index)
      })
      
    // иначе - помечаем на удаление
    else 
      setFormState({
        ...formState,
        ingredientProductForms: 
          formState.ingredientProductForms
          .map((s, i)=>{
            return i==index 
              ? {...s, productDataAction: DataAction.Delete} 
              : s
            })
      })
  }

  function castToValidPercentages() {
    const productSharesSum = formState.ingredientProductForms
      .filter(p=>p.productDataAction!=DataAction.Delete)
      .reduce((total, current)=>total+current.rawContentPercentage, 0)
    const coefficient = 100 / productSharesSum
    setFormState({...formState, ingredientProductForms:formState.ingredientProductForms
      .map(c => {return c.productDataAction==DataAction.Delete ? c : {...c, rawContentPercentage:Math.round(c.rawContentPercentage*coefficient*10)/10}})}
    )
  }

  async function update() {
    return await putIngredientWithProducts(ingredientFormToDTO(formState))
  }

  async function create() {
    return await postIngredientWithProducts(ingredientFormToDTO(formState))
  }
  
  return isLoading ? (<>Loading...</>) : (
    <ingredientContext.Provider value={{
      castToValidPercentages: castToValidPercentages,
      addIngredientProductForm: addIngredientProductForm,
      setIngredientProductFormState: setIngredientProductFormState,
      removeIngredientProductForm: removeIngredientProductForm,
      setCategoryDataAction: setCategoryDataAction,
      setCategoryId: setCategoryId,
      setCategoryName: setCategoryName,
      setItemWeight: setItemWeight,
      setIsItemMeasured: setIsItemMeasured,
      categories: categories,
      formState: formState,
      ingredientTypes: ingredientTypes,
      products: products,
      setTypeId: setTypeId,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </ingredientContext.Provider>
  )
}

export default IngredientFormContextProvider