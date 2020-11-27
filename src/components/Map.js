import React, {useState, useEffect} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl, WebMercatorViewport, Popup, FlyToInterpolator} from 'react-map-gl';

import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        border: 'none',
        backgroundColor: 'transparent',
        focus: 'none'
    },
    link: {
        // textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#fff'
    },
}))

const Map = (props) => {

    const getBounds = () => {
        // Calculate corner values of bounds
        const eventLongitude = props.props.event && props.props.event.map(item => Number(item.eventLongitude))
        const eventLatitude = props.props.event && props.props.event.map(item => Number(item.eventLatitude))

        const cornersLongLat = [
            [Math.min.apply(Math, (eventLongitude)), Math.min.apply(Math, eventLatitude)],
            [Math.max.apply(Math, eventLongitude), Math.max.apply(Math, eventLatitude)]
        ]
        
        // Use WebMercatorViewport to get center longitude/latitude and zoom
        const viewport = cornersLongLat && new WebMercatorViewport({ width: 800, height: 600 })
            .fitBounds([[12.3, 31.7683], [35.2137, 43]], { padding: 100 })
            // .fitBounds(cornersLongLat, { padding: 100 })

        const { longitude, latitude, zoom } = viewport
        return { longitude, latitude, zoom }
    } 

    const bounds = getBounds()
    const classes = useStyles()
    const [popup, setPopup] = useState(null)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 6,
        bearing: 0,
        pitch: 30,
        width: "75vw",
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
            ...viewport,
            longitude: item.eventLongitude,
            latitude: item.eventLatitude,
            zoom: 18,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.6 }),
            transitionDuration: 'auto'
        });
    };

    const onClickMarker = (e, item) => {
        e.preventDefault()
        setPopup(item)
        flyTo(item)
    }

    return (
        <>
            <ReactMapGL
                {...viewport}
                attributionControl='true'
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onViewportChange={viewport => setViewport(viewport)}>

                <div style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    padding: '10px',
                    zIndex: 200
                }}>
                    <FullscreenControl />
                </div>

                <div style={{
                    position: 'absolute',
                    top: 90,
                    left: 0,
                    padding: '10px',
                    zIndex: 200
                }}>
                    <NavigationControl />
                </div>

                <div 
                    style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    padding: '10px',
                    zIndex: 200
                }}>
                    <Button 
                        variant="contained"
                        color="primary">
                        <Typography className={classes.link}>Show All</Typography> 
                    </Button>
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
                                    onClick={(e) => onClickMarker(e, item)}>

                                    <div >
                                        {item.eventImageUrl && item.eventImageUrl.includes('youtube.com') ?
                                            <iframe
                                                component='video'
                                                style={{
                                                    width: `${viewport.zoom ** 2.4}px`,
                                                    height: `${viewport.zoom ** 2.1}px`,
                                                    objectFit: 'cover',
                                                    borderRadius: '5px',
                                                    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                                                    margin: '0 auto',
                                                    outline: 0,
                                                    border: 0,
                                                    padding: 0
                                                    }}
                                                src={item.eventImageUrl}
                                                allowFullScreen
                                                mozallowfullscreen="mozallowfullscreen"
                                                msallowfullscreen="msallowfullscreen"
                                                oallowfullscreen="oallowfullscreen"
                                                webkitallowfullscreen="webkitallowfullscreen"
                                                allow="accelerometer"
                                                title={item.year}
                                            ></iframe>
                                            :
                                            item.eventImageUrl &&
                                            <div>
                                                <img src={item.eventImageUrl} alt='' 
                                                style={{
                                                    width: 'auto',
                                                    height:`${viewport.zoom ** 2.3}px`,
                                                    objectFit: 'cover',
                                                    marginLeft: `-${viewport.zoom ** 2.3/1.4}px`,
                                                    marginTop: `-${viewport.zoom ** 2.3/2}px`,
                                                    borderRadius: '5px',
                                                    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                                                    margin: '0 auto'
                                                }} /> 
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
                                offsetTop={-50}
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
            </ReactMapGL>
        </>
    )
}

export default Map
