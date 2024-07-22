import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import IngredientForm from '../views/ingredient/form/IngredientForm';
import { setIngredientId, setIngredientName } from '../redux/actions/ingredientFormActions';
import { GetIngredientWithProductsDTO, getIngredientWithProducts, getIngredientsWithProducts, postIngredientWithProducts, putIngredientWithProducts } from '../api/ingredientWithProducts';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, useEffect, useState } from 'react';
import { DISH_FORM_INIT_STATE, DishIngredientFormState, DishFormState } from '../models/DishFormState';
import { GetDishWithIngredientsDTO, getDishWithIngredients, postDishWithIngredients, putDishWithIngredients } from '../api/dishWithIngredients';
import { IngredientTypeDTO, getIngredientTypes } from '../api/ingredientTypes';
import { IngredientDTO, getIngredients } from '../api/ingredients';
import DishForm from '../views/dish/form/DishForm';

interface DishFormControllerProps{
  action: DataAction
}

function getDishIngredientFormInitState() : DishIngredientFormState
{return {
    id: 0,
    dataAction: DataAction.Create,
    ingredientDataAction: DataAction.None,
    ingredientRawWeight: 1,
    wastePercentage: 0,
    key: uuid(),
    ingredientName: "", 
    ingredientTypeId: 1, 
    ingredientId: 1, 
}}

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

// создание контекста для передачи данных в дочерние элементы
const context = createContext<DishFormContext>({
  addDishIngredientForm:()=>{},
  setDishIngredientFormState:(state:DishIngredientFormState)=>{},
  removeDishIngredientForm:(key:string)=>{},
  requestFn:async()=>null,
  setName:(name:string)=>{},
  formState:DISH_FORM_INIT_STATE,
  ingredientTypes:[],
  ingredients:[]
});

function DishFormController({action}:DishFormControllerProps) 
{  
  const [formState, setFormState] = useState<DishFormState>(DISH_FORM_INIT_STATE)
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([])
  const [ingredients, setIngredients]= useState<GetIngredientWithProductsDTO[]>([])

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  

  async function initialize() {
    setIsLoading(true)
    if(action==DataAction.Update) loadIngredient()
    
    setIngredientTypes(await getIngredientTypes()??[])
    setIngredients(await getIngredientsWithProducts()??[])
    setIsLoading(false)
  }

  async function loadIngredient() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const dish = await getDishWithIngredients(parseInt(id??'0'))

    if (dish === null)
        throw Error("Не удалось получить данные о блюде")

    setFormState({
        dataAction: DataAction.Update,
        id: dish.id,
        name: dish.name,
        dishIngredientForms: dish.dishes_ingredients
          .map(d=>{ return {
              dataAction: DataAction.None,
              key: uuid(),
              id: d.id,
              ingredientId: d.ingredient.id,
              ingredientName: d.ingredient.name,
              ingredientDataAction: DataAction.None,
              ingredientTypeId: d.ingredient.type.id,
              ingredientRawWeight: d.ingredient_raw_weight,
              wastePercentage: d.waste_percentage
          }}),

    })
        
  }


  function setName(name: string) {
    setFormState({...formState, name:name})
  }

  function addDishIngredientForm() {
    setFormState({
      ...formState, 
      dishIngredientForms:
        [
          ...formState.dishIngredientForms,
          getDishIngredientFormInitState()
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
              ? {...s, dataAction: DataAction.Delete} 
              : s
            })
      })
  }

  function update() {
    return putDishWithIngredients({
      id: formState.id,
      name: formState.name,
      dishes_ingredients: formState.dishIngredientForms
        .map(d=>{return {
          data_action: d.dataAction.valueOf(),
          ingredient_data_action: d.ingredientDataAction.valueOf(),
          id: d.id,
          dish_id: formState.id,
          ingredient_id: d.ingredientId, 
          ingredient_name: d.ingredientName,
          ingredient_type_id: d.ingredientTypeId,
          ingredient_raw_weight: d.ingredientRawWeight,
          waste_percentage: d.wastePercentage,
        }})
    })
  }

  function create() {
    return postDishWithIngredients({
        name: formState.name,
        dishes_ingredients: formState.dishIngredientForms
          .map(s=>{return {
            ingredient_data_action: s.ingredientDataAction.valueOf(),
            id: s.id,
            dish_id: formState.id,
            ingredient_id: s.ingredientId, 
            ingredient_name: s.ingredientName,
            ingredient_type_id: s.ingredientTypeId,
            ingredient_raw_weight: s.ingredientRawWeight, 
            waste_percentage: s.wastePercentage,
          }})
      })
  }
  
  return isLoading ? (<>Loading...</>) : (
    <context.Provider value={{
      ingredients: ingredients,
      ingredientTypes: ingredientTypes,
      addDishIngredientForm: addDishIngredientForm,
      setDishIngredientFormState: setDishIngredientFormState,
      removeDishIngredientForm: removeDishIngredientForm,
      formState: formState,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    <DishForm/>
    </context.Provider>
  )
}

export default DishFormController

export {context}