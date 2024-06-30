import { act } from "react"
import { ComponentFormAction } from "../actions/comoponentFormActions"
import { ComponentFormActionType } from "../constants/action-types"

export type ComponentFormState = {
    id: number
    isNew: boolean
    name: string
    componentTypeId: number
    componentProductForms: ComponentProductFormState[]
}

export type ComponentProductFormState = {
    key: string
    id: number
    productId: number
    newProductName: string
    isCreateProduct: boolean
    isMarkedForDelete: boolean
    contentPercentage: number
    wastePercentage: number
}

const initState: ComponentFormState = {id:0, isNew:true, name:"", componentTypeId:0, componentProductForms:[]}
export default function componentFormReducer(state:ComponentFormState=initState, action: ComponentFormAction) {
    
    switch (action.type) {

        case ComponentFormActionType.SET_FORM_STATE:
            return action.payload;
            
        case ComponentFormActionType.SET_COMPONENT_TYPE_ID:
            return {...state, componentTypeId:action.payload }
            
        case ComponentFormActionType.SET_COMPONENT_NAME:
            return {...state, name:action.payload }
    
        case ComponentFormActionType.SET_COMPONENT_PRODUCT_FORM_STATE:
        {
            const newState = state
            const index = newState.componentProductForms.findIndex(e=>e.key===action.payload.key)
            newState.componentProductForms = newState.componentProductForms.splice(index, 1, action.payload)
            return newState
        }

        case ComponentFormActionType.ADD_COMPONENT_PRODUCT_FORM:
        {
            const newState = {...state, componentProductForms:[...state.componentProductForms, action.payload]}
            newState.componentProductForms = [...newState.componentProductForms, action.payload]
            return {...state, componentProductForms:[...state.componentProductForms, action.payload]}
        }

        case ComponentFormActionType.MARK_ON_DELETE_COMPONENT_PRODUCT_FORM: 
        {
            let componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            console.log(componentProductForms)
            const index = componentProductForms.findIndex(e=>e.key===action.payload.key)
            // если id == 0 (компонент-продукт отсутствует в БД - добавлен во время редактирования формы)
            if(componentProductForms[index].id == undefined || componentProductForms[index].id == 0)
                // удалить элемент из массива
                componentProductForms = componentProductForms.filter(e=>e.key!=action.payload.key)
            // иначе (компонент-продукт получен из БД)
            else {
                // пометить на удаление
                componentProductForms[index].isMarkedForDelete = action.payload.isMarkedForDelete
            }
            console.log(componentProductForms)
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

            componentProductForms[index].contentPercentage = action.payload.contentPercentage
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

            componentProductForms[index].newProductName = action.payload.newProductName
            return {...state, componentProductForms:componentProductForms}
        }
        
        case ComponentFormActionType.SET_IS_CREATE_PRODUCT:
        {
            const componentProductForms = state.componentProductForms.map(x => Object.assign({}, x))
            const index = componentProductForms.findIndex(e=>e.key==action.payload.key)

            componentProductForms[index].isCreateProduct = action.payload.isCreateProduct
            return {...state, componentProductForms:componentProductForms}
        }
        
        default:
            return state;
    }
}