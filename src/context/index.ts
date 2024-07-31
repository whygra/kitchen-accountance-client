import { createContext } from "react"
import { GetDishIngredientDTO, GetDishWithIngredientsDTO } from "../api/dishWithIngredients"
import { IngredientTypeDTO } from "../api/ingredientTypes"
import { GetIngredientWithProductsDTO } from "../api/ingredientWithProducts"
import { DISH_FORM_INIT_STATE, DishFormState, DishIngredientFormState } from "../models/DishFormState"
import { INGREDIENT_FORM_INIT_STATE, IngredientFormState, IngredientProductFormState } from "../models/IngredientFormState"
import { ProductDTO } from "../api/products"

interface DishFormContext {
    addDishIngredientForm: ()=>void
    setDishIngredientFormState: (state:DishIngredientFormState)=>void
    removeDishIngredientForm: (key:string)=>void
    requestFn: ()=>Promise<GetDishWithIngredientsDTO|null>
    setName: (name:string)=>void
    formState: DishFormState
    ingredientTypes:IngredientTypeDTO[]
    ingredients:GetIngredientWithProductsDTO[]
  }
  
  // контекст формы блюда
export const dishFormContext = createContext<DishFormContext>({
    addDishIngredientForm:()=>{},
    setDishIngredientFormState:(state:DishIngredientFormState)=>{},
    removeDishIngredientForm:(key:string)=>{},
    requestFn:async()=>null,
    setName:(name:string)=>{},
    formState:DISH_FORM_INIT_STATE,
    ingredientTypes:[],
    ingredients:[]
  });



  interface IngredientFormContext {
    castToValidPercentages: ()=>void
    addIngredientProductForm: ()=>void
    setIngredientProductFormState: (state:IngredientProductFormState)=>void
    removeIngredientProductForm: (key:string)=>void
    requestFn: ()=>Promise<GetIngredientWithProductsDTO|null>
    setTypeId: (id:number)=>void
    setName: (name:string)=>void
    formState: IngredientFormState
    ingredientTypes: IngredientTypeDTO[]
    products: ProductDTO[]
  }
  
  // контекст формы ингредиента
  export const ingredientContext = createContext<IngredientFormContext>({
    castToValidPercentages:()=>{},
    addIngredientProductForm:()=>{},
    setIngredientProductFormState:(state:IngredientProductFormState)=>{},
    removeIngredientProductForm:(key:string)=>{},
    requestFn:async()=>null,
    setTypeId:(id:number)=>{},
    setName:(name:string)=>{},
    formState:INGREDIENT_FORM_INIT_STATE,
    ingredientTypes:[],
    products: []
  });

  interface AppContext {
    // отображение модального элемента с требуемым содержанием
    showModal: (component: JSX.Element)=>void
    hideModal: ()=>void
    // отображение оповещений

    // 
  }
  
  // контекст приложения
  export const appContext = createContext<AppContext>({
    showModal: (component: JSX.Element)=>{},
    hideModal: ()=>{},
  });

