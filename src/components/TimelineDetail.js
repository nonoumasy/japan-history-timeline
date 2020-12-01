import React, { useState, useEffect, useRef} from 'react'
import { useHistory, useParams, Link} from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx';
import { useForm } from 'react-hook-form'
import Map from './Map'
import { FlyToInterpolator } from 'react-map-gl';

import { ProgressBar } from 'scrolling-based-progressbar'
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { SimpleMenu } from './shared/SimpleMenu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Avatar, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Footer from './Footer'

import './TimelineDetail.css'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
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
        marginBottom: 30,
        margin: '0 auto'
    },
    title: {
        marginTop: 0,
        marginBottom: -10,
        marginRight: 10,
    },
    metadata: {
        marginLeft: '4rem',
        display: 'flex',
    },
    thumbUpIcon: {
        fontSize: '16px',
        marginRight: 4,
    },
    numItems: {
        fontSize: '16px',
    },
    user: {
        fontSize: '12px',
        marginBottom: 0,
        marginTop: 0,
    },
    tags: {
        margin: 0,
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
    },
    cardsContainer: {
        marginTop: 40,
        marginBottom: 120,
    },
    cardEventContainer: {
        cursor: 'pointer',    
        padding: 0,
    },
    media: {
        height: 'auto',
        objectFit: 'cover',
        borderRadius: 7,
        transition: '0.4s',
        marginBottom: 40,
    },
    video: {
        height: 240,
        width:'100%',
        outline: 0,
        border: 0,
        padding: 0,
        borderRadius: 7,
        marginBottom: 40,
    },
    year: {
        display: 'inline',
        borderRadius: 4,
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: 700,
        color: '#333',
        backgroundColor: "#dfdfdf",
        marginLeft: '1rem',
    },
    eventTitle: {

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
    numLikes: {
        display: 'inline',
        borderRadius: 4,
        fontSize: '16px',
        fontWeight: 700,
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
}));

const TimelineDetail = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const { id } = useParams()
    const { register, handleSubmit } = useForm()
    const ref = useRef()

    const [data, setData] = useState([])
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [eventComment, setEventComment] = useState('')
    const [popup, setPopup] = useState(null)
    const [eventId, setEventId] = useState(null)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 160,
        zoom: 1,
        bearing: 0,
        pitch: 0,
        width: "60vw",
        height: "100vh",
    })

    // get timeline by id
    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:5000/timeline/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data)
                setIsLoading(false)
            })
    }, [])

    useEffect(eventId => {
        console.log(eventId)
        ref.current &&
        ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
        })
    }, [eventId])

    const deleteTimelineHandler = (id) => {
        axios.delete(`https://japan-history-timeline-api.herokuapp.com/timeline/${id}`)
        history.push('/')
    }

    const deleteEventHandler = async (id) => {
        await axios.delete(`https://japan-history-timeline-api.herokuapp.com/timeline/event/${id}`)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const eventHandler = (id) => {
        history.push(`/timeline/${id}/addEvent`)
    }

    const flyTo = (item) => {
        item.eventLatitude && item.eventLongitude ?
        setViewport({
            ...viewport,
            longitude: item.eventLongitude,
            latitude: item.eventLatitude,
            pitch: 90,
            zoom: 15.5,
            transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
            transitionDuration: 'auto'
        })
        :
        setTimeout(() => {
            <p>No location</p>
        }, 2000)    
    };

    const eventClickHandler = async (id) => {
        const item = await data.event.find(item => item._id === id)
        item.eventLatitude && item.eventLongitude &&
        await flyTo(item)
        await window.setTimeout(setPopup(item), 1000)
    }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className='sidebar'>
                    <ProgressBar height="4px" color="#666" />
                    <Tooltip arrow placement='left' title='Add New Event' >
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={() => eventHandler(id)}
                            className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <div>
                        
                        <div style={{ margin: '0px auto', padding: 0 }}>
                            <div className='headerArea'>
                                <div className={classes.flexCol}>
                                    <div><Avatar alt="" src={data.timelineImageUrl} className={classes.avatar}/></div>
                                    <div><p className={classes.user}>nonoumasy</p></div>
                                    <div className={classes.flexRowBetween}>
                                        <div>
                                            
                                            <h2 className={classes.title}>{data.timelineTitle}</h2>
                                        </div>


                                        <SimpleMenu props={props}>
                                                <MenuItem onClick={props.handleClose}>
                                                <EditIcon fontSize='small' style={{ marginRight: 16 }}  />
                                                    <Link
                                                        className={classes.link}
                                                        to={`/editTimeline/${id}`}
                                                    >
                                                        Edit
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem onClick={props.handleClose}>
                                                    <DeleteIcon fontSize='small' style={{ marginRight: 16 }} />
                                                    <Link
                                                        className={classes.link}
                                                        onClick={() => deleteTimelineHandler(data._id)}
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
                                                        to={`/import/${data._id}`}>
                                                        Import Data
                                                </Link>
                                                </MenuItem>
                                                <MenuItem onClick={props.handleClose}>
                                                    <ArrowUpwardIcon fontSize='small' style={{ marginRight: 16 }} />
                                                    <a
                                                        href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                                            JSON.stringify(data)
                                                        )}`}
                                                        download={ data.timelineTitle && `${(data.timelineTitle).split(' ').join('_')}.json`}
                                                        // download='filename.json'
                                                        className={classes.link}>
                                                        Export Data as Json
                                                    </a>
                                                </MenuItem>
                                        </SimpleMenu>

                                    </div>
                                    <div className={classes.flexRow} >
                                        <div><p className={classes.numItems}>{data.event && data.event.length} items</p></div>
                                        <div>
                                            <IconButton style={{marginLeft: 10}}>
                                                <ThumbUpAltIcon />
                                            </IconButton>
                                            <Typography className={classes.numLikes}>
                                                <p className={classes.numLikes}>2k</p>
                                                </Typography>
                                        </div>
                                    </div>
                                    <p className={classes.tags}>Tags:{data.tags}</p>
                                </div>

                            </div>

                            {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}
                        </div>
                        <div className={classes.cardsContainer}>
                            {data.event && data.event.map((item) => (
                                <div 
                                    style={{ margin: '0 auto' }} 
                                    key={item._id}  
                                    >     
                                    <div className="Card" ref={ref}>
                                        <div className={classes.imageContainer}>
                                            {item.eventImageUrl && item.eventImageUrl.includes('youtube.com') ?
                                                <iframe
                                                    // component='video'
                                                    // controls
                                                    className={classes.video}
                                                    src={item.eventImageUrl}
                                                    allowFullScreen
                                                    mozallowfullscreen="mozallowfullscreen"
                                                    msallowfullscreen="msallowfullscreen"
                                                    oallowfullscreen="oallowfullscreen"
                                                    webkitallowfullscreen="webkitallowfullscreen"
                                                    allow="accelerometer"
                                                    title={item.year}
                                                        type="*"
                                                ></iframe>
                                                :
                                                item.eventImageUrl &&
                                                <CardMedia
                                                    className={classes.media}
                                                    component='img'
                                                    image={item.eventImageUrl}
                                                    alt=''
                                                />
                                            }
                                        </div>

                                        <CardContent
                                            onClick={() => eventClickHandler(item._id)} className={classes.cardEventContainer}>
                                            {item.eventYear &&
                                                <Typography variant="body2" color="textSecondary" className={classes.year}>
                                                {item.eventYear}
                                                </Typography>
                                            }
                                            {item.eventTitle &&
                                            <Typography className={classes.eventTitle}>
                                                {item.eventTitle}
                                            </Typography>}
                                            <Typography className={classes.event}>
                                                {item.eventDescription}
                                            </Typography>
                                            {item.eventLink &&
                                                <Link
                                                    // target='_blank'
                                                    className={classes.more}
                                                    onClick={() => window.open(item.eventLink, "_blank")}>
                                                    More Details
                                                </Link>
                                            }

                                        </CardContent>

                                        <CardActions className={classes.actions}>

                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded,
                                                })}
                                                onClick={handleExpandClick}
                                                aria-expanded={expanded}
                                                aria-label="show more"
                                            >
                                                <ChatBubbleIcon />
                                            </IconButton>

                                            <SimpleMenu props={props}>
                                                <MenuItem onClick={props.handleClose}>
                                                    <EditIcon fontSize='small' style={{ marginRight: 16 }} />
                                                    <Link
                                                        className={classes.link}
                                                        to={`/editEvent/${item._id}`}>
                                                        Edit
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem onClick={props.handleClose}>
                                                    <DeleteIcon fontSize='small' style={{ marginRight: 16 }} />
                                                    <Link
                                                        className={classes.link}
                                                        onClick={() => deleteEventHandler(item._id)}
                                                    >
                                                        Delete
                                                    </Link>
                                                </MenuItem>
                                            </SimpleMenu>
                                        </CardActions>
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <Divider light />
                                            <CardContent className={classes.actions} style={{ marginTop: 20, marginBottom: 0 }}>
                                                <div >
                                                    <Avatar alt="Freya" src="https://pbs.twimg.com/media/B-d6yG4IIAAM7Wt.png" />
                                                </div>
                                                <div>
                                                    <Typography gutterBottom>
                                                        I love Japanese History.
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                            <CardContent className={classes.actions} style={{ marginTop: 0 }}>
                                                <div >
                                                    <Avatar alt="Freya" src="https://vhx.imgix.net/criterionchannelchartersu/assets/6d3d0ab1-77a0-4520-a6b4-b2703f80f78f-a81c655b.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640" />
                                                </div>
                                                <div>
                                                    <Typography gutterBottom>
                                                        Thanks. I will.
                                            </Typography>
                                                </div>
                                            </CardContent>
                                            <CardContent>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    name="eventComment"
                                                    label="eventComment"
                                                    type="text"
                                                    value={eventComment}
                                                    onChange={e => setEventComment(e.target.value)}
                                                    id="eventComment"
                                                    inputRef={register}
                                                    className={classes.commentForm}
                                                />
                                            </CardContent>
                                        </Collapse>
                                    </div>      
                            </div>
                            ))}
                            <Footer />
                        </div>
                    </div>
                </div>
                <div >
                    <div className='map'>
                        <Map 
                            data={data} 
                            viewport={viewport}
                            setViewport={setViewport} 
                            flyTo={flyTo} 
                            popup={popup} 
                            setPopup={setPopup}
                            eventId={eventId}
                            setEventId={setEventId}
                            />
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default TimelineDetail
