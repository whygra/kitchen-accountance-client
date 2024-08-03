import { createContext } from "react"
import { GetDishIngredientDTO, GetDishWithIngredientsDTO } from "../api/dishes"
import { IngredientTypeDTO } from "../api/ingredientTypes"
import { GetIngredientWithProductsDTO } from "../api/ingredients"
import { DISH_FORM_INIT_STATE, DishFormState, DishIngredientFormState } from "../models/DishFormState"
import { INGREDIENT_FORM_INIT_STATE, IngredientFormState, IngredientProductFormState } from "../models/IngredientFormState"
import { ProductDTO } from "../api/products"
import { DISTRIBUTOR_FORM_INIT_STATE, DistributorFormState } from "../models/DistributorFormState"
import { PurchaseOptionFormState } from "../models/DistributorFormState"
import { GetDistributorWithPurchaseOptionsDTO } from "../api/distributors"
import { UnitDTO } from "../api/units"

// контекст формы блюда
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



  // контекст формы ингредиента
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


  interface DistributorFormContext {
    formState: DistributorFormState
    products: ProductDTO[]
    units: UnitDTO[]
    addPurchaseOptionForm: ()=>void
    setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>void
    removePurchaseOptionForm: (key:string)=>void    
    requestFn:()=>Promise<GetDistributorWithPurchaseOptionsDTO|null>
    setName:(name:string)=>void
  }  

  export const distributorFormContext = createContext<DistributorFormContext>({
    formState: DISTRIBUTOR_FORM_INIT_STATE,
    products: [],
    units: [],
    addPurchaseOptionForm: ()=>{},
    setPurchaseOptionFormState: (state:PurchaseOptionFormState)=>{},
    removePurchaseOptionForm: (key:string)=>{},
    requestFn:async()=>null,
    setName:(name:string)=>{},
  })

  
  // контекст приложения
  interface AppContext {
    // отображение модального элемента с требуемым содержанием
    showModal: (component: JSX.Element)=>void
    hideModal: ()=>void
    // отображение оповещений

    // 
  }
  
  export const appContext = createContext<AppContext>({
    showModal: (component: JSX.Element)=>{},
    hideModal: ()=>{},
  });

