import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useMapContext } from '../../context/map.provider'
import { useSearchContext } from '../../context/search.provider'

import NavBarContainer from '../NavBar/NavBar.component'
import DetailPanelContainer from '../DetailPanel/DetailPanel.container'

const Map = ReactMapboxGl({
  accessToken: window.CONFIG.MAPBOX_TOKEN,
  logoPosition: "top-right"
});

export default function AppLoadedContainer({ detailToggle, detailOpen, fetchQuakeData }) {
    const [ { center, quakes } ] = useMapContext()
    const [ { maxradiuskm } ] = useSearchContext()

    return (
        <div className='app-container'>
            <header className="App-header">
                <NavBarContainer 
                    detailToggle={detailToggle}
                    fetchQuakeData={fetchQuakeData}
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
                    center={center}
                >
                    <Layer type="circle" paint={{
                        'circle-radius': {
                            'base': 1.75,
                            'stops': [
                                [12, 2],
                                [22, 180]
                            ]
                        },
                        'circle-color': '#E54E52',
    'circle-opacity': 0.8
                    }}>
                        <Feature coordinates={center} />
                    </Layer>
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