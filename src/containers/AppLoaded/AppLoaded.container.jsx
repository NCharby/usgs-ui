import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {  useMapContext } from '../../context/map.provider'

import NavBarContainer from '../NavBar/NavBar.component'
import DetailPanelContainer from '../DetailPanel/DetailPanel.container'

// import {
//     Container
// } from "@material-ui/core"

const Map = ReactMapboxGl({
  accessToken: window.CONFIG.MAPBOX_TOKEN,
  logoPosition: "top-right"
});

export default function AppLoadedContainer({ detailToggle, detailOpen }) {
    const [ mapState ] = useMapContext()

    return (
        <div className='app-container'>
            <header className="App-header">
                <NavBarContainer 
                    detailToggle={detailToggle}
                />
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
                    <DetailPanelContainer 
                        detailToggle={detailToggle}
                        detailOpen={detailOpen}
                    />
                </aside>
            </main>
        </div>
    )
}