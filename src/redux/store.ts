import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import { IngredientFormState } from '../models/IngredientFormState'
import { Store, Action } from 'redux'
import reducers from './reducers/index'

export type AppState = {
  ingredientFormState: IngredientFormState
}

const store: Store<AppState, Action> = 
configureStore({
  reducer: reducers,
});

export default store;