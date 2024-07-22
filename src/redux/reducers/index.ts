import { combineReducers } from "redux";
import ingredientFormReducer from "./ingredientFormReducer"

const reducers = combineReducers({
    ingredientFormState: ingredientFormReducer
})

export default reducers;