import React, {useState} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl} from 'react-map-gl';

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 46.8625,
        longitude: 103.8467,
        zoom: 3,
        bearing: 0,
        pitch: 45,
        width: "100vw",
        height: "100vh"
    })

    // console.log(props)

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapStyle="mapbox://styles/nonoumasy/ckfbuedoy4pwp19t9sdx07c0o"
                onViewportChange={viewport => setViewport(viewport)}>

                <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    padding: '10px'
                }}>
                    <FullscreenControl />
                </div>

                <div style={{
                    position: 'absolute',
                    top: 46,
                    right: 0,
                    padding: '10px'
                }}>
                    <NavigationControl />
                </div>

                {props.event && (props.event.map(item => (
                        <Marker
                            key={item._id}
                            longitude={item.eventLongitude}
                            latitude={item.eventLatitude}
                            offsetLeft={-20} offsetTop={-10}>
                            <div>askldflkdflajsfl</div>
                        </Marker>
                    )))
                }
                
            </ReactMapGL>

            
        </>
    )
}

export default Map
