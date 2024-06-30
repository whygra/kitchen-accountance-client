import { ComponentFormActionType } from "../constants/action-types"
import { ComponentFormState, ComponentProductFormState } from "../reducers/componentFormReducer"

export type ComponentFormAction = {
    type: ComponentFormActionType
    payload: any
}

// передать полные данные формы
export const setFormState = (formData: ComponentFormState) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_FORM_STATE,
        payload: formData,
    }
}

// передать наименование компонента
export const setComponentName = (name: string) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_COMPONENT_NAME,
        payload: name,
    }
}

// передать id типа компонента
export const setComponentTypeId = (componentTypeId: number) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_COMPONENT_TYPE_ID,
        payload: componentTypeId,
    }
}

// добавить в коллекцию новые данные формы "Компонент-продукт"
export const addComponentProductForm = (formState: ComponentProductFormState) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.ADD_COMPONENT_PRODUCT_FORM,
        payload: formState,
    }
}

// удалить из коллекции данные формы "Компонент-продукт" по ключу
export const markOnDeleteComponentProductForm = (key: string, isMarkedForDelete: boolean) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.MARK_ON_DELETE_COMPONENT_PRODUCT_FORM,
        payload: {key:key, isMarkedForDelete:isMarkedForDelete},
    }
}

// обновить в коллекции данных форму "Компонент-продукт"
export const setComponentProductFormState = (formState: ComponentProductFormState) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_COMPONENT_PRODUCT_FORM_STATE,
        payload: formState,
    }
}

// передать процент отхода в данные формы "Компонент-продукт" по ключу
export const setWastePercentageByFormKey = (key: string, wastePercentage: number) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_WASTE_PERCENTAGE,
        payload: {key:key, wastePercentage:wastePercentage},
    }
}

// передать процент содержания в данные формы "Компонент-продукт" по ключу
export const setContentPercentageByFormKey = (key: string, contentPercentage: number) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_CONTENT_PERCENTAGE,
        payload: {key:key, contentPercentage:contentPercentage},
    }
}

// передать id продукта в данные формы "Компонент-продукт" по ключу
export const setProductIdByFormKey = (key: string, productId: number) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_PRODUCT_ID,
        payload: {key:key, productId:productId},
    }
}

// передать наименование нового продукта в данные формы "Компонент-продукт" по ключу
export const setNewProductNameByFormKey = (key: string, newProductName: string) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_NEW_PRODUCT_NAME,
        payload: {key:key, newProductName:newProductName},
    }
}

// передать признак "создать продукт" в данные формы "Компонент-продукт" по ключу
export const setIsCreateNewByFormKey = (key: string, isCreateProduct: boolean) : ComponentFormAction => {
    return {
        type: ComponentFormActionType.SET_IS_CREATE_PRODUCT,
        payload: {key:key, isCreateProduct:isCreateProduct},
    }
}
