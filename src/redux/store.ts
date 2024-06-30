import { EnhancedStore, configureStore } from '@reduxjs/toolkit'
import { ComponentFormState } from './reducers/componentFormReducer'
import { Store, Action } from 'redux'
import reducers from './reducers/index'

export type AppState = {
  componentFormState: ComponentFormState
}

const store: Store<AppState, Action> = 
configureStore({
  reducer: reducers,
});

export default store;