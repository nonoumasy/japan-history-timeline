import React, {useState} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl} from 'react-map-gl';

import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    marker: {
        width: 'auto',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
    },
}))

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 40.5625,
        longitude: 15.4067,
        zoom: 3,
        bearing: 0,
        pitch: 30,
        width: "100vw",
        height: "100vh"
    })
    const classes = useStyles()

    // console.log(props)

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapStyle="mapbox://styles/mapbox/light-v9"
                onViewportChange={viewport => setViewport(viewport)}>

                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    padding: '10px'
                }}>
                    <FullscreenControl />
                </div>

                <div style={{
                    position: 'absolute',
                    top: 46,
                    left: 0,
                    padding: '10px'
                }}>
                    <NavigationControl />
                </div>

                {props.props.event && props.props.event.map(item => (
                    <Marker latitude={item.eventLatitude} longitude={item.eventLongitude}>
                    <img src={item.eventImageUrl} alt='' className={classes.marker} /> 
                    </Marker>
                    ))
                }
                
            </ReactMapGL>

            
        </>
    )
}

export default Map
