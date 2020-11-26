import React, {useState} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl, WebMercatorViewport, Popup} from 'react-map-gl';

import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    marker: {
        width: 'auto',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
        margin: '0 auto'
    },
    button: {
        border: 'none',
        backgroundColor: 'transparent',
        focus: 'none'

    }
}))

const Map = (props) => {

    const getBounds = () => {
        // Calculate corner values of bounds
        const eventLongitude = props.props.event && props.props.event.map(item => Number(item.eventLongitude))
        const eventLatitude = props.props.event && props.props.event.map(item => Number(item.eventLatitude))

        const cornersLongLat = [
            [Math.min.apply(Math, eventLongitude), Math.min.apply(Math, eventLatitude)],
            [Math.max.apply(Math, eventLongitude), Math.max.apply(Math, eventLatitude)]
        ]

        // Use WebMercatorViewport to get center longitude/latitude and zoom
        const viewport = new WebMercatorViewport({ width: 800, height: 600 })
            .fitBounds([[12.3, 31.7683], [35.2137, 43]], { padding: 100 }) 
            // .fitBounds(cornersLongLat, { padding: 100 })

        const { longitude, latitude, zoom } = viewport
        return { longitude, latitude, zoom }
        } 

    const bounds = getBounds()
    
    const [popup, setPopup] = useState(null)
    // const [showUserPopup, setShowUserPopup] = useState({})
    const [viewport, setViewport] = useState({
        latitude: 36.2048,
        longitude: 138.2529,
        zoom: 5.5,
        bearing: 0,
        pitch: 30,
        width: "100vw",
        height: "100vh",
        ...bounds
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
                    <>

                    {/* check to see if there location data */}
                        {item.eventLatitude && item.eventLongitude &&
                    <Marker 
                        latitude={item.eventLatitude} 
                        longitude={item.eventLongitude}>

                            <div 
                                className={classes.button}
                                onClick={e => {
                                    e.preventDefault()
                                    setPopup(item)
                                }}>
                                <img src={item.eventImageUrl} alt='' className={classes.marker} /> 
                            </div>
                            
                    </Marker>}

                        {popup ? (
                            <Popup
                                id={popup._id}
                                latitude={popup.eventLatitude}
                                longitude={popup.eventLongitude}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setPopup(false)}
                                className={classes.popup}
                                offsetLeft={300}
                                anchor="right"
                                tipSize={0}
                            >
                                <div>
                                    {popup.eventDescription}
                                </div>
                            </Popup>
                        ) 
                        : null}  
                    </>
                    ))
                    
                }

                {}
                
            </ReactMapGL>

            
        </>
    )
}

export default Map
