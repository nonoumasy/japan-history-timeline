import React, {useState, useEffect} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl, WebMercatorViewport, Popup, FlyToInterpolator} from 'react-map-gl';
import marker from '../marker.svg'

import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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

        // console.log('sdfsd',cornersLongLat);
        
        // Use WebMercatorViewport to get center longitude/latitude and zoom
        const viewport = cornersLongLat && new WebMercatorViewport({ width: 800, height: 600 })
            .fitBounds([[139.378484, 35.519149], [139.812484, 35.723422]], { padding: 100 })
            // .fitBounds(cornersLongLat, { padding: 100 })

        const { longitude, latitude, zoom } = viewport
        return { longitude, latitude, zoom }
    } 


    const bounds = getBounds()
    const classes = useStyles()
    const [popup, setPopup] = useState(null)
    const [mapboxStyle, setMapboxStyle] = useState('mapbox://styles/mapbox/light-v9')
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 6,
        bearing: 0,
        pitch: 0,
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
            pitch: 90,
            zoom: 16,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.6 }),
            transitionDuration: 'auto'
        });
    };

    const showAll =() => {
        setPopup(null)
        setViewport({
            ...viewport,
            longitude: 139.736867,
            latitude: 35.661005,
            zoom: 10,
            bearing: 0,
            pitch: 0,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.6 }),
            transitionDuration: 'auto'
        });
    }

    const onClickMarker = (e, item) => {
        e.preventDefault()
        flyTo(item)
        window.setTimeout(setPopup(item), 1000)
        
    }

    const handleChange = (event) => {
        setMapboxStyle(event.target.value);
    };

    // minimum size for markers set to 30px
    let markerHeight
    let markerWidth
    const markerMinWidth = 40
    const markerMinHeight = 30
    viewport.zoom && (viewport.zoom ** 2) >= markerMinHeight ? markerHeight = (viewport.zoom ** 2) : markerHeight = markerMinHeight 
    viewport.zoom && (viewport.zoom ** 2.2) >= markerMinWidth ? markerWidth = (viewport.zoom ** 2.2) : markerWidth = markerMinWidth 


    return (
        <>
            <ReactMapGL
                {...viewport}
                attributionControl='true'
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle={mapboxStyle}
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
                        onClick={showAll}
                        variant="contained"
                        color="primary">
                        <Typography className={classes.link}>
                            Show All
                        </Typography> 
                    </Button>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        left: 0,
                        padding: '10px',
                        zIndex: 200
                    }}>
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mapboxStyle}
                            onChange={handleChange}
                        >
                            <MenuItem value={'mapbox://styles/mapbox/light-v9'}>Light</MenuItem>
                            <MenuItem value={'mapbox://styles/mapbox/dark-v9'}>Dark</MenuItem>
                            <MenuItem value={'mapbox://styles/mapbox/outdoors-v11'}>Outdoors</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/ckfbuedoy4pwp19t9sdx07c0o'}>Old Map Style</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {props.props.event && props.props.event.map(item => (
                    <>
                        {/* check to see if there location data */}
                            {item.eventLatitude && item.eventLongitude &&
                        <Marker 
                            latitude={item.eventLatitude} 
                            longitude={item.eventLongitude}>
                            
                                <div 
                                    // className={classes.button}
                                    onClick={(e) => onClickMarker(e, item)}>
                                    
                                    <div >
                                    {item.eventImageUrl ? item.eventImageUrl.includes('youtube.com') ?
                                            <iframe
                                                // component='video'
                                                style={{
                                                    width: `${markerWidth}px`,
                                                    height: `${markerHeight}px`,
                                                    // height: '40px',
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
                                            <div>
                                                <img src={item.eventImageUrl} alt='' 
                                                style={{
                                                    //width: `${viewport.zoom ** 1.8}px`,
                                                    width: `auto`,
                                                    // height:`auto`,
                                                    height:`${markerHeight}px`,
                                                    objectFit: 'cover',
                                                    marginLeft: `-${viewport.zoom ** 1.9/2}px`,
                                                    borderRadius: '5px',
                                                    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                                                    margin: '0 auto'
                                                }} /> 
                                            </div>
                                            :
                                            <div>
                                                <img src={marker} alt=''/>
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
                                offsetTop={-20}
                                dynamicPosition={true}
                                anchor="bottom"
                                tipSize={0}
                            >
                                <div>
                                    {`${popup.eventDescription.substring(0, 140)}...`}
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
