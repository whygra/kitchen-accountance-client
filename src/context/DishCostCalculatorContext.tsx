import { getIngredientsWithProducts, IngredientDTO } from '../api/nomenclature/ingredients';
import { DataAction } from '../models';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { setCalcDishCost, calcIngredientCost, constructIngredientCostCalculator, DishCostCalculatorState, IngredientCostCalculatorModel, ProductCostCalculatorModel } from '../models/dish/DishCostCalculatorState';
import { getDishWithIngredients, getDishWithPurchaseOptions, postDishWithIngredients, putDishWithIngredients } from '../api/nomenclature/dishes';
import { constructDishCostCalculator } from '../models/dish/DishCostCalculatorState';
import DishCostCalculator from '../views/dish/details/DishCostCalculator';
import { appContext } from './AppContextProvider';
import Loading from '../views/shared/Loading';

  // контекст ккалькулятора стоимости блюда
  interface DishCostCalculator {
    model : DishCostCalculatorState
    setIngredientCalculatorState : (state:IngredientCostCalculatorModel)=>void
  }
  
  export const dishCostCalculatorContext = createContext<DishCostCalculator>({
    model: constructDishCostCalculator(),
    setIngredientCalculatorState: (state:IngredientCostCalculatorModel)=>{},
  });


interface DishCostCalculatorContextProviderProps{
  id:number,
  children: ReactElement,
}

function DishCostCalculatorContextProvider({id, children} : DishCostCalculatorContextProviderProps) {
  const [model, setModel] = useState<DishCostCalculatorState>(constructDishCostCalculator())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{loadDish()}, [])

  async function loadDish() {
      setIsLoading(true)
      const result = await getDishWithPurchaseOptions(id)
      if(result!=null)
        setModel(constructDishCostCalculator(result))
      setIsLoading(false)
      console.log(result)
  }

  function setIngredientState(ingredient: IngredientCostCalculatorModel) {
    setModel(setCalcDishCost({
      ...model,
      ingredients: model.ingredients.map(i=>i.key == ingredient.key ? ingredient : i)
    }))
  }

  return isLoading ? (<Loading/>) : (
    <dishCostCalculatorContext.Provider value={{
      model: model,
      setIngredientCalculatorState: setIngredientState,
    }}>
      {children}
    </dishCostCalculatorContext.Provider>
  )
}

export default DishCostCalculatorContextProvider