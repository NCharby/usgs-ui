// @flow
import React, { useContext, useReducer, createContext} from 'react'
import type { Node } from 'react';

import { MapActions, MapActionTypes } from './map.actions'

const MapStateContext = createContext()
const MapDispatchContext = createContext()

const initialState = {
    //TODO: store browser location in localstorage
    center: [100, 37]
}

function MapReducer(state, action) {
  switch (action.type) {
    case MapActionTypes.SET_MAP_CENTER: {
      return {...state, center: action.payload}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function MapProvider({children}: {children?: Node}): Node {
  const [state, dispatch] = useReducer(MapReducer, initialState)
  return (
    <MapStateContext.Provider value={state}>
      <MapDispatchContext.Provider value={dispatch}>
        {children}
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  )
}

//TODO: Make this reusable
//NOTE: This is my first time using this paradigm, I don't have time to perfect it now
function useMapContext(lookup: string | Array<string>): [{[string]: any}, any] {
    const ctx = useContext(MapStateContext)
    const dispatch = useContext(MapDispatchContext)
    if (ctx === undefined) {
        throw new Error('useMapContext must be used within a MapProvider')
    }

    if(!!lookup){
        if(Array.isArray(lookup)){
            //if items in lookup are in state
            let states = lookup.reduce( (acc, cur: string) => {
                const j = ctx[cur] || null
                //$FlowFixMe It's okay, flow. I promise it'll be a string
                if(!!j) return acc[cur] = j
                return acc
            }, {})
            //return them as object with dispatch
            //$FlowFixMe Chill flow
            return [states, dispatch]
        } else {
            const s = ctx[lookup] || null
            return [{[lookup]: s}, dispatch]
        }
    }
    return [ctx, dispatch]
}

export { MapActions, MapProvider, useMapContext} 