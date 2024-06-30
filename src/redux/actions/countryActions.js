import { ActionTypes } from "../constants/action-types"

export const setCountries = (countries) => {
    return {
        type: ActionTypes.SET_COUNTRIES,
        payload: countries,
    }
}