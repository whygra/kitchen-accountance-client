import { getIngredientsWithProducts, IngredientDTO, IngredientWithProductsDTO } from '../api/ingredients';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useEffect, useState } from 'react';
import { DishIngredientFormState, DishFormState, constructDishForm, constructDishIngredientForm, dishFormToDTO } from '../models/DishFormState';
import { DishWithIngredientsDTO, getDishWithIngredients, postDishWithIngredients, putDishWithIngredients } from '../api/dishes';
import { IngredientTypeDTO, getIngredientTypes } from '../api/ingredientTypes';
import DishForm from '../views/dish/form/DishForm';
import { DishCategoryDTO, getDishCategories } from '../api/dishCategories';


// контекст формы блюда
interface DishFormContext {
  addDishIngredientForm: ()=>void
  setDishIngredientFormState: (state:DishIngredientFormState)=>void
  removeDishIngredientForm: (key:string)=>void
  requestFn: ()=>Promise<DishWithIngredientsDTO|null>
  setName: (name:string)=>void
  setCategoryName: (name:string)=>void
  setCategoryId: (id:number)=>void
  setCategoryDataAction: (action:DataAction)=>void
  categories:DishCategoryDTO[]
  formState: DishFormState
  ingredientTypes:IngredientTypeDTO[]
  ingredients:IngredientDTO[]
}

export const dishFormContext = createContext<DishFormContext>({
  addDishIngredientForm:()=>{},
  setDishIngredientFormState:(state:DishIngredientFormState)=>{},
  removeDishIngredientForm:(key:string)=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  setCategoryName: (name:string)=>{},
  setCategoryId: (id:number)=>{},
  setCategoryDataAction: (action:DataAction)=>{},
  categories:[],
  formState: constructDishForm(),
  ingredientTypes:[],
  ingredients:[]
});

interface DishFormContextProviderProps{
  action: DataAction,
  children: ReactElement,
}

function DishFormContextProvider({action, children}:DishFormContextProviderProps) 
{  
  const [formState, setFormState] = useState<DishFormState>(constructDishForm)
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([])
  const [ingredients, setIngredients]= useState<IngredientWithProductsDTO[]>([])
  const [categories, setCategories]= useState<DishCategoryDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadDish()
    
    setIngredientTypes(await getIngredientTypes()??[])
    setIngredients(await getIngredientsWithProducts()??[])
    setCategories(await getDishCategories()??[])
    setIsLoading(false)
  }

  async function loadDish() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const dish = await getDishWithIngredients(parseInt(id))

    if (dish === null)
        throw Error("Не удалось получить данные о блюде")

    setFormState(constructDishForm(dish))
        
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

  function addDishIngredientForm() {
    setFormState({
      ...formState, 
      dishIngredientForms:
        [
          ...formState.dishIngredientForms,
          constructDishIngredientForm()
        ]})
  }

  function setDishIngredientFormState(state:DishIngredientFormState) {
    setFormState({
      ...formState,
      dishIngredientForms: formState.dishIngredientForms
      .map(s=>s.key == state.key ? state : s)
    })
  }

  function removeDishIngredientForm(key:string){
    const index = formState.dishIngredientForms.findIndex(s=>s.key==key)

    // если id <= 0 записи нет в бд - просто убираем из коллекции
    if (formState.dishIngredientForms[index].id <= 0)
      setFormState({
        ...formState,
        dishIngredientForms: 
          formState.dishIngredientForms
          .filter((s, i)=>i!=index)
      })
      
    // иначе - помечаем на удаление
    else 
      setFormState({
        ...formState,
        dishIngredientForms: 
          formState.dishIngredientForms
          .map((s, i)=>{
            return i==index 
              ? {...s, ingredientDataAction: DataAction.Delete} 
              : s
            })
      })
  }

  async function update() {
    return await putDishWithIngredients(dishFormToDTO(formState))
  }

  async function create() {
    return await postDishWithIngredients(dishFormToDTO(formState))
  }
  
  return isLoading ? (<>Loading...</>) : (
    <dishFormContext.Provider value={{
      ingredients: ingredients,
      ingredientTypes: ingredientTypes,
      categories: categories,
      formState: formState,
      addDishIngredientForm: addDishIngredientForm,
      setDishIngredientFormState: setDishIngredientFormState,
      removeDishIngredientForm: removeDishIngredientForm,
      setName: setName,
      setCategoryDataAction: setCategoryDataAction,
      setCategoryId: setCategoryId,
      setCategoryName: setCategoryName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    {children}
    </dishFormContext.Provider>
  )
}

export default DishFormContextProvider