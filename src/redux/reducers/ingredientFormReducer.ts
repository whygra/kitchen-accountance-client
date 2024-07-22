import {DataAction} from "../../models";
import { IngredientFormState, INGREDIENT_FORM_INIT_STATE as INGREDIENT_FORM_INIT_STATE } from "../../models/IngredientFormState";
import { IngredientFormAction } from "../actions/ingredientFormActions"
import { IngredientFormActionType } from "../constants/action-types"


export default function ingredientFormReducer(state:IngredientFormState=INGREDIENT_FORM_INIT_STATE, action: IngredientFormAction) {
    
    switch (action.type) {

        case IngredientFormActionType.SET_FORM_STATE:
            return action.payload;
            
        case IngredientFormActionType.SET_INGREDIENT_TYPE_ID:
            return {...state, ingredientTypeId:action.payload }
            
        case IngredientFormActionType.SET_INGREDIENT_ID:
            return {...state, id:action.payload }
            
        case IngredientFormActionType.SET_INGREDIENT_NAME:
            return {...state, name:action.payload }
            
        case IngredientFormActionType.SET_SUBMIT_ACTION_TYPE:
            return {...state, action:action.payload }
    
        case IngredientFormActionType.SET_INGREDIENT_PRODUCT_FORM_STATE:
        {
            let ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key===action.payload.key)
            ingredientProductForms.splice(index, 1, action.payload)
            return {...state, ingredientProductForms: ingredientProductForms}
        }

        case IngredientFormActionType.ADD_INGREDIENT_PRODUCT_FORM:
        {
            return {...state, ingredientProductForms:[...state.ingredientProductForms, action.payload]}
        }

        case IngredientFormActionType.SET_INGREDIENT_PRODUCT_ACTION_TYPE: 
        {
            let ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key===action.payload.key)

            ingredientProductForms[index].dataAction = action.payload.action

            // удалить элемент с невалидным id из массива
            if(action.payload.action == DataAction.Delete
                && ingredientProductForms[index].id == 0)
            {
                ingredientProductForms.splice(index, 1)
            }

            return {...state, ingredientProductForms:ingredientProductForms}
        }
    
        case IngredientFormActionType.SET_WASTE_PERCENTAGE:
        {
            const ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key==action.payload.key)

            ingredientProductForms[index].wastePercentage = action.payload.wastePercentage
            return {...state, ingredientProductForms:ingredientProductForms}
        }

        case IngredientFormActionType.SET_CONTENT_PERCENTAGE:
        {
            const ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key==action.payload.key)

            ingredientProductForms[index].rawContentPercentage = action.payload.contentPercentage
            return {...state, ingredientProductForms:ingredientProductForms}
        }
    
        case IngredientFormActionType.SET_PRODUCT_ID:
        {
            const ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key==action.payload.key)

            ingredientProductForms[index].productId = action.payload.productId
            return {...state, ingredientProductForms:ingredientProductForms}
        }

        case IngredientFormActionType.SET_NEW_PRODUCT_NAME:
        {
            const ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key==action.payload.key)

            ingredientProductForms[index].productName = action.payload.newProductName
            return {...state, ingredientProductForms:ingredientProductForms}
        }
        
        case IngredientFormActionType.SET_SUBMIT_PRODUCT_ACTION_TYPE:
        {
            const ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            const index = ingredientProductForms.findIndex(e=>e.key==action.payload.key)

            ingredientProductForms[index].productDataAction = action.payload.action
            // если действие - создать, установить id = 0
            if (action.payload.action === DataAction.Create) 
                ingredientProductForms[index].productId = 0
            return {...state, ingredientProductForms:ingredientProductForms}
        }
        
        case IngredientFormActionType.CAST_CONTENTS_TO_VALID_PERCENTAGES:

            let coefficient = 100 / state.ingredientProductForms.reduce((total, current)=>total+current.rawContentPercentage, 0)
            const ingredientProductForms = state.ingredientProductForms.map(x => Object.assign({}, x))
            ingredientProductForms.forEach(c=>c.rawContentPercentage=Math.round(c.rawContentPercentage*coefficient*10)/10)
            return {...state, ingredientProductForms:ingredientProductForms}
        
        default:
            return state;
    }
}