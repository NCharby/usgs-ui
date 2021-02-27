import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//https://github.com/mapbox/mapbox-gl-js/issues/10173
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import { useMapContext } from '../../context/map.provider'
import { useSearchContext } from '../../context/search.provider'

import NavBarContainer from '../NavBar/NavBar.component'
import DetailPanelContainer from '../DetailPanel/DetailPanel.container'

const Map = ReactMapboxGl({
  accessToken: window.CONFIG.MAPBOX_TOKEN,
  logoPosition: "top-right"
});

//https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js
const kmToPixelsAtMaxZoom = (km, latitude) =>
  (km * 1000) / 0.075 / Math.cos(latitude * Math.PI / 180)

//#94231F

export default function AppLoadedContainer({ detailToggle, detailOpen, fetchQuakeData }) {
    const [ { center, quakes } ] = useMapContext()
    const [ searchState ] = useSearchContext()

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
                    onDragEnd={(map) => {
                        const c = map.getCenter()
                        fetchQuakeData({
                            ...searchState,
                            search: `${c.lng}, ${c.lat}`
                        })
                    }}
                >
                    {/* The search radius */}
                    <Layer type="circle" paint={{
                        'circle-radius': {
                            stops: [
                                [0, 0],
                                [20, kmToPixelsAtMaxZoom(searchState.maxradiuskm, center[1])]
                            ],
                            base: 2
                        },
                        'circle-opacity': 0,
                        'circle-stroke-color': '#1F3449',
                        'circle-stroke-width': 4,
                        'circle-stroke-opacity': 0.3

                    }}>
                        <Feature coordinates={center} />
                    </Layer>
                    <Layer type="circle" paint={{
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            6,
                            '#FCA107',
                            8,
                            '#7F3121'
                        ],
                        'circle-opacity': 0.75,
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            6,
                            20,
                            8,
                            40
                        ]
                    }}>
                        {quakes.map( q => (
                            <Feature 
                                key={q.id} 
                                properties={q.properties}
                                coordinates={q.geometry.coordinates} />
                        ))}
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