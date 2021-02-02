import React, { useState, useEffect} from 'react'
import { useHistory, useParams, Link} from 'react-router-dom'
import Map from './Map'
import { FlyToInterpolator, WebMercatorViewport } from 'react-map-gl';
import firebase from '../firebase'

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { SimpleMenu } from './shared/SimpleMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Avatar, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './Story.css'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // marginRight: 20,
    },
    flexRowBetween: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fab: {
        position: 'fixed',
        top: '85%',
        left: '3%',
        zIndex: 1000
    },
    avatar: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 20,
        margin: '0 auto'
    },
    title: {
        marginTop: 0,
        marginBottom: -10,
        // marginRight: 10,
        textAlign: 'center',
        maxWidth: '16rem',
    },
    user: {
        fontSize: '16px',
        marginBottom: 0,
        marginTop: 15,
        textAlignt: 'center',
        fontStyle: 'italic',
    },
    metadata: {
        marginLeft: '4rem',
        display: 'flex',
    },
    thumbUpIcon: {
        fontSize: '16px',
    },
    numLikes: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333',
        marginTop: 0,
    },
    summary: {

    },
    numItems: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333',
    },
    cardsContainer: {
        marginTop: 40,
        marginBottom: 120,
    },
    cardEventContainer: {
        cursor: 'pointer',    
        padding: 0,
        marginTop: 20,
    },
    media: {
        height: 'auto',
        objectFit: 'cover',
        borderRadius: 7,
        transition: '0.4s',
    },
    video: {
        height: 240,
        width:'100%',
        outline: 0,
        border: 0,
        padding: 0,
        borderRadius: 7,
    },
    year: {
        display: 'inline-block',
        borderRadius: 4,
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: 700,
        color: '#333',
        backgroundColor: "#dfdfdf",
        marginLeft: '1rem',
        marginTop: 10,
    },
    title: {
        marginLeft: '1rem',
        marginTop: 20,
        fontWeight: 700,
    },
    event: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        marginTop: 10,
        marginBottom: 10,
        color: '#666',
    },
    more: {
        marginLeft: '1rem',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 800,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333',
    },
    link: {
        // textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333',
    },
    cardaction: {
        overflow: 'hidden',
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0 10px',
        marginLeft:0,
    },
    imageContainer: {
        margin: 0,
        padding: 0,
        overflow: 'hidden'
    },
    spinner: {
        display: 'flex',
        '& > * + *': {
        },
        justifyContent: 'center',
        margin: '30px auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    commentForm: {
        margin: '0px 0px',
        padding: 0
    },
    pageNum: {
        fontSize: 12,
        margin: 0,
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    tag: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        marginRight: 5,
        padding: '5px',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: '5px',
    },
    referenceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    reference: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        width: '80%',
        marginLeft: '1rem',
    },
    collapseButton: {
        height: 20,
    },
    ol: {
        paddingRight: 40,
    }
    
}));

const Story = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const { story_id, event_id } = useParams()

    const [storyData, setStoryData] = useState('')
    const [eventData, setEventData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [popup, setPopup] = useState(null)
    const [eventId, setEventId] = useState(null)
    const [bounds, setBounds] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 0
    })
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 0,
        bearing: 0,
        pitch: 0,
        width: "50vw",
        height: "100vh"
    })
    const [open, setOpen] = useState(false);
    const {id} = useParams()

    const fetchData = async () => {
        const db = await firebase.firestore()
        const storyData = await db.collection('stories').doc(id).get()

        const data = await db.collection('stories').doc(id).collection('events').get()
        const eventData = await data.docs.map(doc => doc.data())

        console.log('item1', eventData)
        
        setStoryData(storyData.data())
        setEventData(eventData)
    }

    console.log('topEventData',eventData)
    useEffect(() => {
        fetchData()
        setIsLoading(false)
    }, [])

    

    
    const onClickMarker = (e, event) => {
        e.preventDefault()
        setEventId(event._id)
        if (event.eventLongitude && event.eventLatitude) {
            flyTo(event)
            setPopup(event)
        }
    }

    const handleClick = () => {
        setOpen(!open);
    };

    function getBounds(data) {
        // Calculate corner values of bounds
        // data.event && data.event.map(event => console.log('eventLongitude', event.eventLongitude))
        const eventLongitude = data.event && data.event.map(event => event.eventLongitude && event.eventLongitude !== 'null' && event.eventLongitude)
        const eventLatitude = data.event && data.event.map(event => event.eventLatitude && event.eventLatitude !== 'null' && event.eventLatitude)
        // console.log('checkNull',eventLongitude)

        let eventLongitudeFiltered = eventLongitude && eventLongitude.filter(function (el) {
            return el !== null
        })
        let eventLatitudeFiltered = eventLatitude && eventLatitude.filter(function (el) {
            return el != null
        });

        // console.log('eventLongitudeFiltered', eventLongitudeFiltered, eventLatitudeFiltered)

        const numvar1 = eventLongitudeFiltered && Math.min.apply(Math, eventLongitudeFiltered)
        const numvar2 = eventLatitudeFiltered && Math.min.apply(Math, eventLatitudeFiltered)
        const numvar3 = eventLongitudeFiltered && Math.max.apply(Math, eventLongitudeFiltered)
        const numvar4 = eventLatitudeFiltered && Math.max.apply(Math, eventLatitudeFiltered)

        // Use WebMercatorViewport to get center longitude/latitude and zoo
        const viewport = typeof numvar1 === 'number' && typeof numvar2 === 'number' && typeof numvar3 === 'number' && typeof numvar4 === 'number' && new WebMercatorViewport({ width: 800, height: 600 })
            .fitBounds([[numvar1, numvar2], [numvar3, numvar4]], { padding: 100 })
        // .fitBounds([[12.3, 31.7683], [35.2137, 42]], { padding: 100 })

        const { longitude, latitude, zoom } = viewport
        return { longitude, latitude, zoom }
    }

    const deleteStoryHandler = async (story_id) => {
        history.push('/')
    }

    const addEventHandler = async (story_id) => {
        
    }
    
    const deleteEventHandler = async (event_id) => {
    }

    const flyTo = async (event) => {
        event.eventLatitude && event.eventLongitude &&
        await setViewport({
            ...viewport,
            longitude: event.eventLongitude,
            latitude: event.eventLatitude,
            pitch: 90,
            zoom: 15.5,
            transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
            transitionDuration: 'auto'
        }) 
    };

    // const eventHoverHandler = async (id) => {
    //     const event = await storyData.event.find(event => event.id === id)
    //     event.eventLatitude && event.eventLongitude &&
    //     await setPopup(event)
    // }

    // const eventClickHandler = async (id) => {
    //     const event = await storyData.event.find(event => event._id === id)
    //     event.eventLatitude && event.eventLongitude &&
    //     await flyTo(event)
    //     await setPopup(event)
    // }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className='sidebar'>
                    <Tooltip arrow placement='top' title='Add New Event' >
                        <Fab
                            color="primary"
                            aria-label="add"
                            // onClick={() => addEventHandler(story_id)}
                            className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>

                    <div>
                        <div style={{ margin: '0px auto', padding: 0 }}>
                            <div className='headerArea'>
                                <div className={classes.flexCol}>
                                    <div><Avatar alt="" src={storyData.image} className={classes.avatar} /></div>
                                    <div>
                                        <h2 className={classes.title}>{storyData.title}</h2>
                                    </div>
                                    <div><p className={classes.user}>{storyData.author}</p></div>
                                    <div className={classes.flexRow} >
                                        <div className={classes.flexRow}>
                                            <Button >
                                                <ThumbUpAltIcon className={classes.thumbUpIcon} />
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={classes.numLikes}>100</p>
                                    </div>
                                    <SimpleMenu props={props}>
                                        <MenuItem onClick={props.handleClose}>
                                            <EditIcon fontSize='small' style={{ marginRight: 16 }} />
                                            <Link
                                                className={classes.link}
                                                to={`/editStory/${story_id}`}
                                            >
                                                Edit
                                                    </Link>
                                        </MenuItem>
                                        <MenuItem onClick={props.handleClose}>
                                            <DeleteIcon fontSize='small' style={{ marginRight: 16 }} />
                                            <Link
                                                className={classes.link}
                                                onClick={() => deleteStoryHandler(storyData._id)}
                                            >
                                                Delete
                                                </Link>

                                        </MenuItem>
                                        <MenuItem onClick={props.handleClose}>
                                            <ShareIcon fontSize='small' style={{ marginRight: 16 }} />
                                            <Link className={classes.link}>
                                                Share
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={props.handleClose}>
                                            <ArrowDownwardIcon fontSize='small' style={{ marginRight: 16 }} />
                                            <Link
                                                className={classes.link}
                                                to={`/import/${storyData._id}`}>
                                                Import storyData
                                                </Link>
                                        </MenuItem>
                                        <MenuItem onClick={props.handleClose}>
                                            <ArrowUpwardIcon fontSize='small' style={{ marginRight: 16 }} />
                                            <a
                                                href={`storyData:text/json;charset=utf-8,${encodeURIComponent(
                                                    JSON.stringify(storyData)
                                                )}`}
                                                download={storyData.storyTitle && `${(storyData.title).split(' ').join('_')}.json`}
                                                // download='filename.json'
                                                className={classes.link}>
                                                Export Data as Json
                                                    </a>
                                        </MenuItem>
                                    </SimpleMenu>
                                    <div className={classes.summary}>{storyData.summary}</div>
                                </div>
                            </div>

                            {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}

                            {/* eventsSection */}

                            <div className={classes.cardsContainer}>
                                {eventData && eventData?.map((event, index) => (

                                    <div style={{ margin: '0 auto' }}>
                                        <div className="Card" key={index}>
                                            <div className={classes.imageContainer}>
                                                {event?.image && event?.image?.includes('youtube.com') ?
                                                    <iframe
                                                        // component='video'
                                                        // controls
                                                        className={classes.video}
                                                        src={event.image}
                                                        allowFullScreen
                                                        mozallowfullscreen="mozallowfullscreen"
                                                        msallowfullscreen="msallowfullscreen"
                                                        oallowfullscreen="oallowfullscreen"
                                                        webkitallowfullscreen="webkitallowfullscreen"
                                                        allow="accelerometer"
                                                        title={event.title}
                                                        type="*"
                                                    ></iframe>
                                                    :
                                                    event?.image &&
                                                    <CardMedia
                                                        className={classes.media}
                                                        component='img'
                                                        image={event.image}
                                                        alt=''
                                                    />
                                                }
                                            </div>
                                            <CardContent
                                                // onMouseEnter={() => eventHoverHandler(event.id)}
                                                onMouseLeave={() => setPopup('')}
                                                // onClick={() => eventClickHandler(event.id)} className={classes.cardEventContainer}
                                                >
                                                {/* {event?.date &&
                                                    <Typography variant="body2" color="textSecondary" className={classes.date}>
                                                        {event?.date}
                                                    </Typography>
                                                } */}
                                                {event?.title &&
                                                    <Typography className={classes.title}>
                                                        {event.title}
                                                    </Typography>}
                                                <Typography className={classes.event}>
                                                    {event.description}
                                                </Typography>
                                                {event?.link &&
                                                    <Link
                                                        // target='_blank'
                                                        className={classes.more}
                                                        onClick={() => window.open(event.link, "_blank")}>
                                                        More Details
                                                    </Link>
                                                }
                                            </CardContent>
                                            <CardActions className={classes.actions}>
                                                <div style={{ marginRight: '1rem' }}></div>
                                                <div className={classes.pageNum}>{index + 1}</div>
                                                <SimpleMenu props={props}>
                                                    <MenuItem onClick={props.handleClose}>
                                                        <EditIcon fontSize='small' style={{ marginRight: 16 }} />
                                                        <Link
                                                            className={classes.link}
                                                            to={''}>
                                                            Edit
                                                    </Link>
                                                    </MenuItem>
                                                    <MenuItem onClick={props.handleClose}>
                                                        <DeleteIcon fontSize='small' style={{ marginRight: 16 }} />
                                                        <Link
                                                            className={classes.link}
                                                            onClick={() => deleteEventHandler(event.id)}
                                                        >
                                                            Delete
                                                    </Link>
                                                    </MenuItem>
                                                </SimpleMenu>
                                            </CardActions>
                                        </div>
                                    </div>
                                ))}

                                <div className='footer'>
                                    <p className={classes.reference}>Tags: </p>
                                    <div className={classes.tagsContainer}>
                                        {storyData?.tags?.map(tag => (
                                            <div className={classes.tag}>{tag}</div>
                                        ))}
                                    </div>
                                    <div className={classes.referenceContainer}>
                                        <p className={classes.reference}>References: </p>
                                        <Button onClick={handleClick} className={classes.collapseButton}>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </Button>
                                    </div>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <ol className={classes.ol}>
                                            <li>Ann Christys, Vikings in the South (London: Bloomsbury, 2015), pp. 59-60.</li>
                                            <li>Haywood, John. Northmen. Head of Zeus.</li>
                                            <li>Judith Jesch, Ships and Men in the Late Viking Age: The Vocabulary of Runic Inscriptions and Skaldic Verse (Woodbridge: Boydell, 2001), p. 88.</li>
                                        </ol>
                                    </Collapse>
                                </div>
                            </div>



                        </div>
                    </div>
                    
                </div>

                <div className='map'>
                    <Map 
                        eventData={eventData} 
                        viewport={viewport}
                        setViewport={setViewport} 
                        flyTo={flyTo} 
                        popup={popup} 
                        setPopup={setPopup}
                        eventId={eventId}
                        setEventId={setEventId}
                        bounds={bounds}
                        onClickMarker={onClickMarker}
                        />
                </div>      
                
            </div>
        </>
    )
}

export default Story
