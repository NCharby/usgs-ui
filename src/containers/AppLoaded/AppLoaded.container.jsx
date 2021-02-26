import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {  useMapContext } from '../../context/map.provider'


// import {
//     Container
// } from "@material-ui/core"

const Map = ReactMapboxGl({
  accessToken: window.CONFIG.MAPBOX_TOKEN,
  logoPosition: "top-right"
});

export default function AppLoadedContainer(params) {
    const [ mapState ] = useMapContext()

    return (
        <div>
            <header className="App-header">
                Nav Bar
            </header>
            <main>
                <Map
                    // eslint-disable-next-line 
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                    center={mapState.center}
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