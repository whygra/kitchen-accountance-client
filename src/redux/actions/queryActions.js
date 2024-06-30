import { ActionTypes } from "../constants/action-types"

export const setQueryResult = (result) => {
    return {
        type: ActionTypes.SET_QUERY_RESULT,
        payload: result,
    }
}
