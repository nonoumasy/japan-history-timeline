import React, {useState} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl, WebMercatorViewport} from 'react-map-gl';

import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    marker: {
        width: 'auto',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
    },
}))

const Map = (props) => {

    // const applyToArray = (func, array) => func.apply(Math, array) 
    // const getBounds = (props) => {
            
    //     // Calculate corner values of bounds
    //     const eventLong = props.props.event && props.props.event.map(item => item.eventLongitude && item.eventLongitude)
    //     const eventLat = props.props.event && props.props.event.map(item => item.eventLatitude && item.eventLatitude)
    //     const cornersLongLat = [
    //         [applyToArray(Math.min, eventLong), applyToArray(Math.min, eventLat)],
    //         [applyToArray(Math.max, eventLong), applyToArray(Math.max, eventLat)]
    //     ]
        
    //     console.log(cornersLongLat[0], cornersLongLat[1])
    //     // Use WebMercatorViewport to get center longitude/latitude and zoom
    //     const viewport = new WebMercatorViewport({ width: 1440, height: 900 })
    //         .fitBounds([[12.3, 31.7683], [35.2137, 43]], { padding: 100 } ) 

    //     const { longitude, latitude, zoom } = viewport
    //     return { longitude, latitude, zoom }
    // }

    // const bounds = getBounds(props)

    const [viewport, setViewport] = useState({
        latitude: 36.2048,
        longitude: 138.2529,
        zoom: 5.5,
        bearing: 0,
        pitch: 30,
        width: "100vw",
        height: "100vh",
        // ...bounds
    })

    const classes = useStyles()

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
                    padding: '10px',
                    zIndex: 200
                }}>
                    <FullscreenControl />
                </div>

                <div style={{
                    position: 'absolute',
                    top: 46,
                    left: 0,
                    padding: '10px',
                    zIndex: 200
                }}>
                    <NavigationControl />
                </div>

                {props.props.event && props.props.event.map(item => (
                    item.eventLatitude && item.eventLongitude &&
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
