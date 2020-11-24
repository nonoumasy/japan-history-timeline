import React, {useState} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';

import Avatar from '@material-ui/core/Avatar';

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 46.8625,
        longitude: 103.8467,
        zoom: 3,
        bearing: 0,
        pitch: 0,
        width: "100vw",
        height: "100vh"
    })

    // console.log(props)

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/light-v9"
                onViewportChange={viewport => setViewport(viewport)}>

                {props.event && props.event.map(item => (
                        <Marker
                            key={item._id}
                            longitude={item.eventLongitude}
                            latitude={item.eventLatitude}
                            offsetLeft={-20} offsetTop={-10}>
                            <div>askldflkdflajsfl</div>
                        </Marker>
                    ))
                }
            </ReactMapGL>
        </>
    )
}

export default Map
