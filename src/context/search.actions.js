// @flow

export const SearchActionTypes: {[string]: string} = {
    SET_SEARCH: "SET_SEARCH",
    SET_STARTTIME: "SET_STARTTIME",
    SET_ENDTIME: "SET_ENDTIME",
    SET_MINMAGNITUDE: "SET_MINMAGNITUDE",
    SET_MAXRADIUSKM: "SET_MAXRADIUSKM"
}

export const SearchActions = {
    SET_SEARCH: (payload: any): {type: any, payload: string} => {
        return {type: SearchActionTypes.SET_SEARCH, payload}
    },
    SET_STARTTIME: (payload: any): {type: any, payload: Date} => {
        return {type: SearchActionTypes.SET_STARTTIME, payload}
    },
    SET_ENDTIME: (payload: any): {type: any, payload: Date} => {
        return {type: SearchActionTypes.SET_ENDTIME, payload}
    },
    SET_MINMAGNITUDE: (payload: any): {type: any, payload: number} => {
        return {type: SearchActionTypes.SET_MINMAGNITUDE, payload}
    },
    SET_MAXRADIUSKM: (payload: any): {type: any, payload: number} => {
        return {type: SearchActionTypes.SET_MAXRADIUSKM, payload}
    }
}
