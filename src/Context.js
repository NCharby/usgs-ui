import { createContext } from 'react'

const initialAppState = {
    detailsOpen: false,
}

const initialMapState = {
    center: [0, 0]
}

const initalSearchState = {
    query: '',
    starttime: new Date(),
    endtime: new Date(),
    minmagnitude: 5,
    maxradiuskm: 200
}

export const AppContext = createContext(initialAppState)
export const MapContext = createContext(initialMapState)
export const SearchContext = createContext(initalSearchState)