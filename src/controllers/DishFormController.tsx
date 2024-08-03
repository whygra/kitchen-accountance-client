import { GetIngredientWithProductsDTO, getIngredientsWithProducts } from '../api/ingredients';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { useEffect, useState } from 'react';
import { DISH_FORM_INIT_STATE, DishIngredientFormState, DishFormState } from '../models/DishFormState';
import { getDishWithIngredients, postDishWithIngredients, putDishWithIngredients } from '../api/dishes';
import { IngredientTypeDTO, getIngredientTypes } from '../api/ingredientTypes';
import { dishFormContext } from '../context';
import DishForm from '../views/dish/form/DishForm';

interface DishFormControllerProps{
  action: DataAction,
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
    if(id!==undefined || action==DataAction.Update) 
      loadDish()
    
    setIngredientTypes(await getIngredientTypes()??[])
    setIngredients(await getIngredientsWithProducts()??[])
    setIsLoading(false)
  }

  async function loadDish() {
    if (id === undefined)
      throw Error("Ошибка загрузки данных: отсутствует id блюда")

    const dish = await getDishWithIngredients(parseInt(id))

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
          ingredient:{
            id: d.ingredientId,
            name: d.ingredientName,
            type_id: d.ingredientTypeId
          },
          ingredient_raw_weight: d.ingredientRawWeight,
          waste_percentage: d.wastePercentage,
        }})
    })
  }

  function create() {
    return postDishWithIngredients({
        name: formState.name,
        dishes_ingredients: formState.dishIngredientForms
          .map(d=>{return {
            ingredient_data_action: d.ingredientDataAction.valueOf(),
            id: d.id,
            dish_id: formState.id,
            ingredient:{
              id: d.ingredientId,
              name: d.ingredientName,
              type_id: d.ingredientTypeId
            },
            ingredient_raw_weight: d.ingredientRawWeight, 
            waste_percentage: d.wastePercentage,
          }})
      })
  }
  
  return isLoading ? (<>Loading...</>) : (
    <dishFormContext.Provider value={{
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
    </dishFormContext.Provider>
  )
}

export default DishFormController