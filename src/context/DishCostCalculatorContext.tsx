import { getIngredientsWithProducts, IngredientWithProductsDTO } from '../api/ingredients';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { setCalcDishCost, calcIngredientCost, constructIngredientCostCalculator, DishCostCalculatorModel, IngredientCostCalculatorModel, ProductCostCalculatorModel } from '../models/DishCostCalculatorModel';
import { getDishWithIngredients, getDishWithPurchaseOptions, postDishWithIngredients, putDishWithIngredients } from '../api/dishes';
import { IngredientTypeDTO, getIngredientTypes } from '../api/ingredientTypes';
import { DishCategoryDTO, getDishCategories } from '../api/dishCategories';
import { constructDishCostCalculator } from '../models/DishCostCalculatorModel';
import DishCostCalculator from '../views/dish/details/DishCostCalculator';
import { appContext } from './AppContextProvider';

  // контекст ккалькулятора стоимости блюда
  interface DishCostCalculator {
    model : DishCostCalculatorModel
    setIngredientCalculatorState : (state:IngredientCostCalculatorModel)=>void
    setProductCalculatorState : (ingredientId:number,state:ProductCostCalculatorModel)=>void
  }
  
  export const dishCostCalculatorContext = createContext<DishCostCalculator>({
    model: constructDishCostCalculator(),
    setIngredientCalculatorState: (state:IngredientCostCalculatorModel)=>{},
    setProductCalculatorState: (ingredientId:number,state:ProductCostCalculatorModel)=>{},
  });


interface DishCostCalculatorContextProviderProps{
  id:number,
  children: ReactElement,
}

function DishCostCalculatorContextProvider({id, children} : DishCostCalculatorContextProviderProps) {
  const [model, setModel] = useState<DishCostCalculatorModel>(constructDishCostCalculator())
  const [isLoading, setIsLoading] = useState(false)

  const {showModal} = useContext(appContext)

  useEffect(()=>{loadDish()}, [])

  async function loadDish() {
      setIsLoading(true)
      try{
          const result = await getDishWithPurchaseOptions(id)
          if(result!=null)
            setModel(constructDishCostCalculator(result))
      } catch (error : Error | any){
          showModal(error?.message)
      } finally{
          setIsLoading(false)
      }
  }

  function setIngredientState(ingredient: IngredientCostCalculatorModel) {
    setModel(setCalcDishCost({
      ...model,
      ingredients: model.ingredients.map(i=>i.id == ingredient.id ? ingredient : i)
    }))
  }

  function setProductState(ingredientId: number, product: ProductCostCalculatorModel) {
    let ingredient = {...model.ingredients.find(i=>i.id==ingredientId)!}
    ingredient = {...ingredient, products:ingredient.products.map(p=>p.id==product.id ? product:p)}
    const ingredients = model.ingredients.map(i=>
      i.id == ingredientId ? calcIngredientCost(ingredient) : i
    )
    setModel(setCalcDishCost({
      ...model,
      ingredients: ingredients
    }))
  }

  return isLoading ? (<>Loading...</>) : (
    <dishCostCalculatorContext.Provider value={{
      model: model,
      setIngredientCalculatorState: setIngredientState,
      setProductCalculatorState: setProductState,
    }}>
      {children}
    </dishCostCalculatorContext.Provider>
  )
}

export default DishCostCalculatorContextProvider