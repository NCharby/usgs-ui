import { useState, useEffect } from "react"
import './App.css'

import { useMapContext, MapActions } from "./context/map.provider"

import AppLoaded from './containers/AppLoaded/AppLoaded.container'
import InitialLoader from './containers/InitialLoader/InitialLoader.container'

function App() {
  const [ isLoading, setLoading ] = useState(false)
  const [, dispatch] = useMapContext("center")

  const testConfig = () =>{ return !!window.CONFIG }
  //did the script include resolve yet?
  if(testConfig && isLoading){
    // setLoading(false)
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

  //ask for the browser coords
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function ({coords}) {
        const { longitude, latitude } = coords
        dispatch(MapActions.SET_MAP_CENTER([longitude, latitude]))
      })
    }
  }, [dispatch])

  return (
    <div className="App">
        {isLoading?
          <InitialLoader />
        :
          <AppLoaded />
        }
    </div>
  );
}

export default App;
