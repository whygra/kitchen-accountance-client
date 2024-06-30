import { ActionTypes } from "../constants/action-types"

const initState = {all:[], selected:{}}
export const countriesReducer = (state=initState, { type, payload }) => {
    switch (type) {

        case ActionTypes.SET_COUNTRIES: 
            return {...state, all: payload};

        default:
            return state;

    }
}