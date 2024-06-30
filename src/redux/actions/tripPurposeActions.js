import { ActionTypes } from "../constants/action-types"

export const setTripPurposes = (tripPurposes) => {
    return {
        type: ActionTypes.SET_TRIP_PURPOSES,
        payload: tripPurposes,
    }
}