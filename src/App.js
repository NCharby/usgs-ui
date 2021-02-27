import { useState, useEffect } from "react"
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMapContext, MapActions } from "./context/map.provider"
import { useSearchContext } from './context/search.provider'

import { fetchQuakes } from './api/quake.api'
import { type $UIRequestSearch } from './api/quake.types'

import AppLoaded from './containers/AppLoaded/AppLoaded.container'
import InitialLoader from './containers/InitialLoader/InitialLoader.container'

import { Snackbar } from "@material-ui/core"

function App() {
  const [ isLoading, setLoading ] = useState(true)
  const [ detailOpen, setDetailOpen ] = useState(false)
  const [ hasError, setError ] = useState(null)
  const [ helpText, setHelpText ] = useState('')
  const [, dispatch ] = useMapContext()
  const [ searchState ] = useSearchContext()

  const testConfig = () =>{ return !!window.CONFIG }
  //did the script include resolve yet?
  if(testConfig && isLoading){
    setLoading(false)
  } else if(isLoading) {
    //useEffect isn't designed to do this
    const ticker = setInterval(() => {
      //recheck in the window var is there every few ms
      if(testConfig){
        setLoading(false)
        //stop checking
        clearInterval(ticker)
      }
    }, 100);
    //TODO: timeout and error state
  }

  const detailToggle = (): void => {
    setDetailOpen(!detailOpen)
  }

  const fetchQuakeData = async (opts: $UIRequestSearch) => {
    const [ error, data ] = await fetchQuakes(opts)
    setError(false)
    setDetailOpen(false)
    if(error){
      setError(true)
      setHelpText("A network error has occured. Please try that again.")
    }
    
    if(data){
      dispatch(MapActions.SET_MAP_CENTER(data.coordinates))
      dispatch(MapActions.SET_QUAKES(data.quakes))
      dispatch(MapActions.SET_META(data.meta))
      if(!data.quakes.length) {
        setError(true)
        setHelpText("No quakes found for that search")
      } else {
        setDetailOpen(true)
      }
    }
  }

  //ask for the browser coords
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function ({coords}) {
        const { longitude, latitude } = coords
        fetchQuakeData({
          ...searchState,
          search: `${longitude}, ${latitude}`
        })
      })
    }
  }, [dispatch])
  
  return (
    <div className="App">
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
          open={!!hasError}
          message={helpText}/>
        {isLoading?
          <InitialLoader />
        :
          <AppLoaded 
            detailToggle={detailToggle}
            detailOpen={detailOpen}
            fetchQuakeData={fetchQuakeData}
          />
        }
    </div>
  );
}

export default App;
