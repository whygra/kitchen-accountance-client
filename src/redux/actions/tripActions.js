import { ActionTypes } from "../constants/action-types"

export const setTrips = (trips) => {
    return {
        type: ActionTypes.SET_TRIPS,
        payload: trips,
    }
}

export const setTrip = (trip) => {
    return {
        type: ActionTypes.SET_TRIP,
        payload: trip,
    }
}

export const deleteTrip = (trip) => {
    return {
        type: ActionTypes.DELETE_TRIP,
        payload: trip,
    }
}