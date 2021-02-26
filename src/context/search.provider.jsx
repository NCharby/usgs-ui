// @flow
import React, { useContext, useReducer, createContext} from 'react'
import type { Node } from 'react'

import { SearchActions } from './search.actions'

const SearchStateContext = createContext()
const SearchDispatchContext = createContext()

const initialState = {
    starttime: new Date(),
    endtime: new Date(),
    minmagnitude: 4,
    maxradiuskm: 200,
    query: ''
}

function SearchReducer(state, action) {
  switch (action.type) {
    case SearchActions.SET_QUERY: {
      return {query: action.payload}
    }
    case SearchActions.SET_STARTTIME: {
      return {starttime: action.payload.toISOString().split('T')[0]}
    }
    case SearchActions.SET_ENDTIME: {
      return {endtime: action.payload.toISOString().split('T')[0]}
    }
    case SearchActions.SET_MINMAGNITUDE: {
      return {endtime: action.payload}
    }
    case SearchActions.SET_MAXRADIUSKM: {
      return {endtime: action.payload}
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
function useSearchContext(lookup: string | Array<string>): [{[string]: any}, any] {
    const ctx = useContext(SearchStateContext)
    const dispatch = useContext(SearchDispatchContext)
    if (ctx === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider')
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

export { SearchActions, SearchProvider, useSearchContext} 