import { ActionTypes } from "../constants/action-types"

const initState = {all:[], selected:{}}
export const tripPurposesReducer = (state=initState, {type, payload }) => {
    switch (type) {

        case ActionTypes.SET_TRIP_PURPOSES: 
            return {...state, all: payload};

        default:
            return state;

    }
}