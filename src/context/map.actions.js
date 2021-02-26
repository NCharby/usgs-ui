// @flow
export const MapActionTypes: {[string]: string} = {
    SET_MAP_CENTER: "SET_MAP_CENTER"
}

export const MapActions = {
    SET_MAP_CENTER: (payload: any): {type: any, payload: any} => {
        return {type: MapActions.SET_MAP_CENTER, payload}
    }
}
