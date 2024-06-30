import { combineReducers } from "redux";
import componentFormReducer from "./componentFormReducer"

const reducers = combineReducers({
    componentFormState: componentFormReducer
})

export default reducers;