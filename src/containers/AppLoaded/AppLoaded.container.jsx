import { useContext } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { AppContext } from '../../Context'


// import {
//     Container
// } from "@material-ui/core"

const Map = ReactMapboxGl({
  accessToken: window.CONFIG.MAPBOX_TOKEN,
  logoPosition: "top-right"
});

export default function AppLoadedContainer(params) {
    const { detailsOpen } = useContext(AppContext)



    return (
        <div>
            <header className="App-header">
                Nav Bar
            </header>
            <main>
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                >

                </Map>
                <aside>
                    <div className="side-out" id="DetailPanel">

                    </div>
                </aside>
            </main>
        </div>
    )
}