import { ActionTypes } from "../constants/action-types"

const initState = {result:[]}
export const queriesReducer = (state=initState, { type, payload }) => {
    switch (type) {

        case ActionTypes.SET_QUERY_RESULT: 
            return {...state, result: payload};

        default:
            return state;

    }
}