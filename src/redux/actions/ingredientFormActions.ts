import { IngredientFormActionType } from "../constants/action-types"
import { DataAction } from "../../models"
import { IngredientFormState, IngredientProductFormState } from "../../models/IngredientFormState"

export type IngredientFormAction = {
    type: IngredientFormActionType
    payload: any
}

// передать полные данные формы
export const setFormState = (formData: IngredientFormState) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_FORM_STATE,
        payload: formData,
    }
}

// передать наименование ингредиента
export const setIngredientName = (name: string) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_INGREDIENT_NAME,
        payload: name,
    }
}

// передать id ингредиента
export const setIngredientId = (ingredientId: number) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_INGREDIENT_ID,
        payload: ingredientId,
    }
}

// передать id типа ингредиента
export const setIngredientTypeId = (ingredientTypeId: number) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_INGREDIENT_TYPE_ID,
        payload: ingredientTypeId,
    }
}

// добавить в коллекцию новые данные формы "Ингредиент-продукт"
export const addIngredientProductForm = (formState: IngredientProductFormState) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.ADD_INGREDIENT_PRODUCT_FORM,
        payload: formState,
    }
}

// установить тип действия после подтверждения формы (создание/обновление/удаление) с ингредиент-продуктом по ключу
export const setIngredientProductFormSubmitActionType = (key: string, action: DataAction) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_INGREDIENT_PRODUCT_ACTION_TYPE,
        payload: {key:key, action:action},
    }
}

// обновить в коллекции данных форму "Ингредиент-продукт"
export const setIngredientProductFormState = (formState: IngredientProductFormState) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_INGREDIENT_PRODUCT_FORM_STATE,
        payload: formState,
    }
}

// передать процент отхода в данные формы "Ингредиент-продукт" по ключу
export const setWastePercentageByFormKey = (key: string, wastePercentage: number) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_WASTE_PERCENTAGE,
        payload: {key:key, wastePercentage:wastePercentage},
    }
}

// передать процент содержания в данные формы "Ингредиент-продукт" по ключу
export const setContentPercentageByFormKey = (key: string, contentPercentage: number) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_CONTENT_PERCENTAGE,
        payload: {key:key, contentPercentage:contentPercentage},
    }
}

// передать id продукта в данные формы "Ингредиент-продукт" по ключу
export const setProductIdByFormKey = (key: string, productId: number) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_PRODUCT_ID,
        payload: {key:key, productId:productId},
    }
}

// передать наименование нового продукта в данные формы "Ингредиент-продукт" по ключу
export const setProductNameByFormKey = (key: string, newProductName: string) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_NEW_PRODUCT_NAME,
        payload: {key:key, newProductName:newProductName},
    }
}

// передать признак "создать продукт" в данные формы "Ингредиент-продукт" по ключу
export const setProductSubmitActionType = (key: string, action: DataAction) : IngredientFormAction => {
    return {
        type: IngredientFormActionType.SET_SUBMIT_PRODUCT_ACTION_TYPE,
        payload: {key:key, action:action},
    }
}

// привести значения содержания продуктов к долям 100
export const castContentsToValidPercentages = () : IngredientFormAction => {
    return {
        type: IngredientFormActionType.CAST_CONTENTS_TO_VALID_PERCENTAGES,
        payload: {},
    }
}
