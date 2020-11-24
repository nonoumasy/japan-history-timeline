import React, {useState} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 46.8625,
        longitude: 103.8467,
        zoom: 4,
        bearing: 0,
        pitch: 0
    });

    return (
        <ReactMapGL
            {...viewport}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/nonoumasy/ckfbuedoy4pwp19t9sdx07c0o"
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={'pk.eyJ1Ijoibm9ub3VtYXN5IiwiYSI6ImNrMTBmY3MycTA1YTEzY3F3ZHZ3eHNsdTAifQ.7r-ppKeBALXFid9Vmpa9Pw'}
        >
            {props.event && props.event.map(item => (
                <Marker 
                    key={item._id}
                    latitude={item.eventLatitude}
                    longitude={item.eventLongitude}>
                    <h2>{item.eventYear}</h2>

                </Marker>
        ))}

            
        </ReactMapGL>
        
    );
}

export default Map
