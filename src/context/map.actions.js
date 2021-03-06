// @flow
export const MapActionTypes: {[string]: string} = {
    SET_MAP_CENTER: "SET_MAP_CENTER",
    SET_QUAKES: "SET_QUAKES",
    SET_META: "SET_META",
}

export const MapActions = {
    SET_MAP_CENTER: (payload: any): {type: any, payload: any} => {
        return {type: MapActionTypes.SET_MAP_CENTER, payload}
    },
    SET_QUAKES: (payload: any): {type: any, payload: any} => {
        return {type: MapActionTypes.SET_QUAKES, payload}
    },
    SET_META: (payload: any): {type: any, payload: any} => {
        return {type: MapActionTypes.SET_META, payload}
    }
}
