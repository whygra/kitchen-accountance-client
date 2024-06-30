import { ActionTypes } from "../constants/action-types"

export const initTrip = {
    stayingStart:'2024-05-30',
    stayingDays:1,
    countryId:1,
    tripPurposeId:1,
    clientId:16,
}
const initState = {
    all:[],
    selected:initTrip
}

export const tripsReducer = (state=initState, {type, payload }) => {
    switch (type) {

        case ActionTypes.SET_TRIPS: 
            return {...state, all: payload};

        case ActionTypes.SET_TRIP: 
            return {...state, selected: payload};

        case ActionTypes.DELETE_TRIP: 
            return {};

        default:
            return state;

    }
}