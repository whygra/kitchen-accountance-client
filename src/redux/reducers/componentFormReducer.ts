import {DataAction} from "../../models";
import { ComponentFormState, COMPONENT_FORM_INIT_STATE as COMPONENT_FORM_INIT_STATE } from "../../models/ComponentFormState";
import { ComponentFormAction } from "../actions/comoponentFormActions"
import { ComponentFormActionType } from "../constants/action-types"


export default function componentFormReducer(state:ComponentFormState=COMPONENT_FORM_INIT_STATE, action: ComponentFormAction) {
    
    switch (action.type) {

        case ComponentFormActionType.SET_FORM_STATE:
            return action.payload;
            
        case ComponentFormActionType.SET_COMPONENT_TYPE_ID:
            return {...state, componentTypeId:action.payload }
            
        case ComponentFormActionType.SET_COMPONENT_ID:
            return {...state, id:action.payload }
            
        case ComponentFormActionType.SET_COMPONENT_NAME:
            return {...state, name:action.payload }
            
        case ComponentFormActionType.SET_SUBMIT_ACTION_TYPE:
            return {...state, action:action.payload }
    
        case ComponentFormActionType.SET_COMPONENT_PRODUCT_FORM_STATE:
        {
            let componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key===action.payload.key)
            componentProductForms.splice(index, 1, action.payload)
            return {...state, componentProductForms: componentProductForms}
        }

        case ComponentFormActionType.ADD_COMPONENT_PRODUCT_FORM:
        {
            return {...state, componentProductForms:[...state.componentProductForms, action.payload]}
        }

        case ComponentFormActionType.SET_COMPONENT_PRODUCT_ACTION_TYPE: 
        {
            let componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key===action.payload.key)

            componentProductForms[index].dataAction = action.payload.action

            // удалить элемент с невалидным id из массива
            if(action.payload.action == DataAction.Delete
                && componentProductForms[index].id == 0)
            {
                componentProductForms.splice(index, 1)
            }

            return {...state, componentProductForms:componentProductForms}
        }
    
        case ComponentFormActionType.SET_WASTE_PERCENTAGE:
        {
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key==action.payload.key)

            componentProductForms[index].wastePercentage = action.payload.wastePercentage
            return {...state, componentProductForms:componentProductForms}
        }

        case ComponentFormActionType.SET_CONTENT_PERCENTAGE:
        {
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key==action.payload.key)

            componentProductForms[index].rawContentPercentage = action.payload.contentPercentage
            return {...state, componentProductForms:componentProductForms}
        }
    
        case ComponentFormActionType.SET_PRODUCT_ID:
        {
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key==action.payload.key)

            componentProductForms[index].productId = action.payload.productId
            return {...state, componentProductForms:componentProductForms}
        }

        case ComponentFormActionType.SET_NEW_PRODUCT_NAME:
        {
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key==action.payload.key)

            componentProductForms[index].productName = action.payload.newProductName
            return {...state, componentProductForms:componentProductForms}
        }
        
        case ComponentFormActionType.SET_SUBMIT_PRODUCT_ACTION_TYPE:
        {
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key==action.payload.key)

            componentProductForms[index].productDataAction = action.payload.action
            // если действие - создать, установить id = 0
            if (action.payload.action === DataAction.Create) 
                componentProductForms[index].productId = 0
            return {...state, componentProductForms:componentProductForms}
        }
        
        case ComponentFormActionType.CAST_CONTENTS_TO_VALID_PERCENTAGES:

            let coefficient = 100 / state.componentProductForms.reduce((total, current)=>total+current.rawContentPercentage, 0)
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            componentProductForms.forEach(c=>c.rawContentPercentage=Math.round(c.rawContentPercentage*coefficient*10)/10)
            return {...state, componentProductForms:componentProductForms}
        
        default:
            return state;
    }
}