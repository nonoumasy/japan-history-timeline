import React, {useState, useEffect} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl, WebMercatorViewport, Popup, FlyToInterpolator} from 'react-map-gl';

import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    marker: {
        width: 'auto',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
        margin: '0 auto'
    },
    markerVideo: {
        width: '100px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '5px',
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
        margin: '0 auto',
        outline: 0,
        border: 0,
        padding: 0,
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
    const classes = useStyles()

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
    

    useEffect(() => {
        const listener = e => {
            if (e.key === 'Escape') {
                setPopup(null)
            }
        }
        window.addEventListener('keydown', listener)

        return () => {
            window.removeEventListener('keydown', listener)
        }
    }, [])

    const flyTo = (item) => {
        setViewport({
            longitude: item.eventLongitude,
            latitude: item.eventLatitude,
            zoom: 11,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
            transitionDuration: 'auto'
        });
    };

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
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
                                    flyTo(item)
                                }}>

                                <div >
                                    {item.eventImageUrl && item.eventImageUrl.includes('youtube.com') ?
                                        <iframe
                                            // component='video'
                                            // controls
                                            className={classes.markerVideo}
                                            src={item.eventImageUrl}
                                            allowFullScreen
                                            mozallowfullscreen="mozallowfullscreen"
                                            msallowfullscreen="msallowfullscreen"
                                            oallowfullscreen="oallowfullscreen"
                                            webkitallowfullscreen="webkitallowfullscreen"
                                            // width='140'
                                            // height='100'
                                            allow="accelerometer"
                                            title={item.year}
                                        // type="*"
                                        ></iframe>
                                        :
                                        item.eventImageUrl &&
                                        <div>
                                            <img src={item.eventImageUrl} alt='' className={classes.marker} /> 
                                        </div>
                                    }
                                </div>
                            </div>

                            
                                    
                                
                            
                    </Marker>}

                        {popup ? (
                            <Popup
                                id={popup._id}
                                latitude={popup.eventLatitude}
                                longitude={popup.eventLongitude}
                                closeButton={false}
                                closeOnClick={true}
                                onClose={() => setPopup(false)}
                                className={classes.popup}
                                offsetTop={-100}
                                anchor="top"
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
