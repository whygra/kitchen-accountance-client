import IngredientForm from '../views/ingredient/form/IngredientForm';
import { getIngredientWithProducts, postIngredientWithProducts, putIngredientWithProducts } from '../api/ingredientWithProducts';
import { IngredientFormState, INGREDIENT_FORM_INIT_STATE, IngredientProductFormState } from '../models/IngredientFormState';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { useEffect, useState } from 'react';
import { IngredientTypeDTO, getIngredientTypes } from '../api/ingredientTypes';
import { ProductDTO, getProducts } from '../api/products';
import { ingredientContext } from '../context';

interface IngredientFormControllerProps{
    action: DataAction
}

function getIngredientProductFormInitState() : IngredientProductFormState
{return {
    id: 0,
    dataAction: DataAction.Create,
    productDataAction: DataAction.None,
    rawContentPercentage: 1,
    wastePercentage: 0,
    key: uuid(),
    productName: "", 
    productId: 1, 
}}

function IngredientFormController({action}:IngredientFormControllerProps) 
{  
  const [formState, setFormState] = useState<IngredientFormState>(INGREDIENT_FORM_INIT_STATE)
  const [isLoading, setIsLoading] = useState(false) 
  const [ingredientTypes, setIngredientTypes] = useState<IngredientTypeDTO[]>([]) 
  const [products, setProducts] = useState<ProductDTO[]>([]) 

  const {id} = useParams()

  useEffect(()=>{initialize()}, [])
  
  async function initialize() {
    setIsLoading(true)
    if(id!==undefined || action==DataAction.Update) 
      loadIngredient()

    setIngredientTypes(await getIngredientTypes()??[]);
    setProducts(await getProducts()??[]);

    setIsLoading(false)
  }

  async function loadIngredient() {
    if (id === undefined)
        throw Error("Ошибка загрузки данных: отсутствует id ингредиента")

    const ingredient = await getIngredientWithProducts(parseInt(id))

    if (ingredient === null)
        throw Error("Не удалось получить данные об ингредиенте")

    setFormState({
        submitAction: DataAction.Update,
        id: ingredient.id,
        name: ingredient.name,
        ingredientTypeId: ingredient.type.id,
        ingredientProductForms: ingredient.ingredients_products
            .map(c=>{ return {
                dataAction: DataAction.None,
                key: uuid(),
                id: c.id,
                productId: c.product.id,
                productName: c.product.name,
                productDataAction: DataAction.None,
                rawContentPercentage: c.raw_content_percentage,
                wastePercentage: c.waste_percentage
            }}),
    })
  }

  function setTypeId(id: number) {
    setFormState({...formState, ingredientTypeId:id})
  }

  function setName(name: string) {
    setFormState({...formState, name:name})
  }

  function addIngredientProductForm() {
    setFormState({
      ...formState, 
      ingredientProductForms:
        [
          ...formState.ingredientProductForms,
          getIngredientProductFormInitState()
        ]})
  }

function setIngredientProductFormState(state:IngredientProductFormState) {
  // пометить на обновление
  state.dataAction = DataAction.Update
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
              ? {...s, dataAction: DataAction.Delete} 
              : s
            })
      })
  }

  function castToValidPercentages() {
    let coefficient = 100 / formState.ingredientProductForms.reduce((total, current)=>total+current.rawContentPercentage, 0)
    setFormState({...formState, ingredientProductForms:formState.ingredientProductForms
      .map(c => {return {...c, rawContentPercentage:Math.round(c.rawContentPercentage*coefficient*10)/10}})}
    )
  }

  function update() {
    return putIngredientWithProducts({
        id: formState.id,
        name: formState.name,
        type_id: formState.ingredientTypeId,
        ingredients_products: formState.ingredientProductForms
          .map(s=>{return {
            data_action: s.dataAction.valueOf(),
            product_data_action: s.productDataAction.valueOf(),
            id: s.id,
            ingredient_id: formState.id,
            product_id: s.productId, 
            product_name: s.productName,
            raw_content_percentage: s.rawContentPercentage, 
            waste_percentage: s.wastePercentage,
          }})
    })
  }

  function create() {
    return postIngredientWithProducts({
        name: formState.name,
        type_id: formState.ingredientTypeId,
        ingredients_products: formState.ingredientProductForms
          .map(s=>{return {
            product_data_action: s.productDataAction.valueOf(),
            id: s.id,
            ingredient_id: formState.id,
            product_id: s.productId, 
            product_name: s.productName,
            raw_content_percentage: s.rawContentPercentage, 
            waste_percentage: s.wastePercentage,
          }})
      })
  }
  
  return isLoading ? (<>Loading...</>) : (
    <ingredientContext.Provider value={{
      castToValidPercentages: castToValidPercentages,
      addIngredientProductForm: addIngredientProductForm,
      setIngredientProductFormState: setIngredientProductFormState,
      removeIngredientProductForm: removeIngredientProductForm,
      formState: formState,
      ingredientTypes: ingredientTypes,
      products: products,
      setTypeId: setTypeId,
      setName: setName,
      requestFn: action==DataAction.Update ? update : create
    }}>

    <IngredientForm/>
    </ingredientContext.Provider>
  )
}

export default IngredientFormController

export {ingredientContext}