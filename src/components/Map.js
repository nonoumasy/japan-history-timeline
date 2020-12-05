import React, {useState, useEffect} from 'react'
import ReactMapGL, { Marker, NavigationControl, FullscreenControl, Popup, FlyToInterpolator, WebMercatorViewport} from 'react-map-gl';

import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

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
    select: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333'
    },
    marker: {
        backgroundColor: '#EC5D5D',
        color: '#fff',
        width: 32,
        height: 32,
        padding: 5,
        borderRadius: 1000,
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: '3px',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 900,
        fontSize: 12,
        boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
    },
    showAll: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 900,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333',
    }
}))

const Map = ({ viewport, setViewport, data, flyTo, popup, setPopup, setEventId, bounds, onClickMarker}) => {
    const classes = useStyles()
    const [mapboxStyle, setMapboxStyle] = useState('mapbox://styles/nonoumasy/ckdcvbt983i4k1iny85j4q087')

    const showAll =() => {
        setPopup(null)
        setViewport({
            ...viewport,
            longitude: bounds.longitude,
            latitude: bounds.latitude,
            zoom: bounds.zoom,
            bearing: 0,
            pitch: 0,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.6 }),
            transitionDuration: 'auto'
        });
    }

    

    const handleChange = (event) => {
        setMapboxStyle(event.target.value);
    };

    // minimum size for markers set to 30px
    let markerHeight
    let markerWidth
    const markerMinWidth = 40
    const markerMinHeight = 40
    viewport.zoom && (viewport.zoom ** 1.8) >= markerMinHeight ? markerHeight = (viewport.zoom ** 1.8) : markerHeight = markerMinHeight 
    viewport.zoom && (viewport.zoom ** 2) >= markerMinWidth ? markerWidth = (viewport.zoom ** 2) : markerWidth = markerMinWidth 


    return (
        <>
            <ReactMapGL
                {...viewport}
                attributionControl={true}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle={mapboxStyle}
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
                    top: 50,
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
                    right: '50%',
                    padding: '10px',
                    zIndex: 200
                }}>
                    <Button 
                        onClick={showAll}
                        variant="outlined"
                        color="default">
                        <Tooltip arrow placement='right' title='Click to show all markers' >
                            <Typography className={classes.showAll}>
                                Show All
                        </Typography> 
                        </Tooltip>
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
                            className={classes.select}
                        >
                            <MenuItem value={'mapbox://styles/mapbox/light-v9'}>Light</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/ckdcvbt983i4k1iny85j4q087'}>Light 3D</MenuItem>
                            <MenuItem value={'mapbox://styles/mapbox/dark-v9'}>Dark</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/cki2mq5hd1rfm1aqa1k4r4dmq'}>Dark 3D</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/ck80st52c24z91ip168o50043'}>Bubble</MenuItem>
                            <MenuItem value={'mapbox://styles/mapbox/outdoors-v11'}>Outdoors</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/ckfbuedoy4pwp19t9sdx07c0o'}>Old Map Style</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/cke7nfew43y9919mb1kolqmlc'}>Standard</MenuItem>
                            <MenuItem value={'mapbox://styles/nonoumasy/ckdcv8alb3hxc1io6r81wfuq6'}>Mapbox Japan</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {data.event && data.event.map((item, index) => (
                    <div key={item._id}>
                        {/* check to see if there location data */}
                        {item.eventLatitude && item.eventLongitude && (item.eventLatitude !== null) && (item.eventLongitude !== null) &&    
                        <Marker 
                            latitude={item.eventLatitude} 
                            longitude={item.eventLongitude}>
                            
                                <div 
                                    // className={classes.button}
                                    onMouseEnter={() => setPopup(item)}
                                    onMouseLeave={() => setPopup('')}
                                    onClick={(e) => onClickMarker(e, item)}>
                                    
                                    <div >
                                    {item.eventImageUrl ? item.eventImageUrl.includes('youtube.com') ?
                                        <div className={classes.marker}>
                                            {`${index + 1}`}
                                        </div>
                                            // <iframe
                                            //     // component='video'
                                            //     style={{
                                            //         width: `${markerWidth}px`,
                                            //         height: `${markerHeight}px`,
                                            //         objectFit: 'cover',
                                            //         borderRadius: 7,
                                            //         boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                                            //         margin: '0 auto',
                                            //         outline: 0,
                                            //         padding: 0
                                            //         }}
                                            //     src={item.eventImageUrl}
                                            //     allowFullScreen
                                            //     mozallowfullscreen="mozallowfullscreen"
                                            //     msallowfullscreen="msallowfullscreen"
                                            //     oallowfullscreen="oallowfullscreen"
                                            //     webkitallowfullscreen="webkitallowfullscreen"
                                            //     allow="accelerometer"
                                            //     title={item.year}
                                            // ></iframe>
                                            :
                                            <div>
                                                <img src={item.eventImageUrl} alt='' 
                                                style={{
                                                    width: `auto`,
                                                    height:`${markerHeight}px`,
                                                    // width: '50px',
                                                    // height:`50px`,
                                                    objectFit: 'cover',
                                                    borderRadius: 7,
                                                    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                                                    margin: '0 auto',
                                                }} /> 
                                            </div>
                                            :
                                            <div className={classes.marker}>
                                                {`${index + 1}`}
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
                                    {`${popup.eventDescription.substring(0, 140)}`}
                                </div>
                            </Popup>
                        ) 
                        : null}  
                    </div>
                    ))
                }
            </ReactMapGL>
        </>
    )
}

export default Map
