// @flow
import React, { useContext, useReducer, createContext} from 'react'
import type { Node } from 'react'

import { SearchActions, SearchActionTypes } from './search.actions'

const SearchStateContext = createContext()
const SearchDispatchContext = createContext()

const initialState = {
    starttime: new Date('2010-12-17T03:24:00'),
    endtime: new Date(),
    minmagnitude: "4",
    maxradiuskm: '100',
    search: ''
}

function SearchReducer(state, action) {
  switch (action.type) {
    case SearchActionTypes.SET_SEARCH: {
      return {...state, search: action.payload}
    }
    case SearchActionTypes.SET_STARTTIME: {
      return {...state, starttime: action.payload.toISOString().split('T')[0]}
    }
    case SearchActionTypes.SET_ENDTIME: {
      return {...state, endtime: action.payload.toISOString().split('T')[0]}
    }
    case SearchActionTypes.SET_MINMAGNITUDE: {
      return {...state, minmagnitude: action.payload}
    }
    case SearchActionTypes.SET_MAXRADIUSKM: {
      return {...state, maxradiuskm: action.payload}
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SearchProvider({children}: {children?: Node}): Node {
  const [state, dispatch] = useReducer(SearchReducer, initialState)
  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}

//TODO: Make this reusable
//NOTE: This is my first time using this paradigm, I don't have time to perfect it now
function useSearchContext(lookup?: string | Array<string>): [{[string]: any}, any] {
    const ctx = useContext(SearchStateContext)
    const dispatch = useContext(SearchDispatchContext)
    if (ctx === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider')
    }
    
    if(!!lookup){
        if(Array.isArray(lookup)){
            //if items in lookup are in state
            let states = lookup.reduce( (acc, cur: string) => {
                //$FlowFixMe
                const j = ctx[cur] || null
                if(!!j) return acc[cur] = j
                return acc
            }, {})
            //return them as object with dispatch
            return [states, dispatch]
        } else {
            //$FlowFixMe
            const s = ctx[lookup] || null
            return [{[lookup]: s}, dispatch]
        }
    }
    return [ctx, dispatch]
}

export { SearchActions, SearchProvider, useSearchContext} 