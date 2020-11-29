import React, { useState, useEffect} from 'react'
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
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    fab: {
        position: 'fixed',
        top: '85%',
        left: '1.5%',
        zIndex: 1000
    },
    headerArea: {
        width: '85%',
        margin: '0 auto',
        padding: 0
    },
    avatar: {
        marginTop: 10,
        marginBottom: 30,
        margin: '0 auto'
    },
    title: {
        margin: 0,
    },
    metadata: {
        marginLeft: '4rem',
        display: 'flex',
    },
    numItems: {
        fontSize: '12px',
    },
    thumbUpIcon: {
        fontSize: '16px',
        marginRight: 4,
    },
    numLikes: {
        fontSize: '12px',
    },
    user: {
        fontSize: '12px',
        marginBottom: 2,
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
    },
    card: {
        width: '85%',
        margin:'0 auto',
        padding: 0,
        marginTop: 20,
    },
    media: {
        height: 'auto',
        objectFit: 'cover',
        // paddingTop: '56.25%', 
        transition: '0.4s',
        '&:hover': {
            transformOrigin: '50% 50%',
            transform: 'scale(1.1)',
        },
        marginBottom: 20,
    },
    year: {
        display: 'inline',
        borderRadius: 4,
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: 700,
        color: '#333',
        marginLeft: '1rem',
        backgroundColor: "#dfdfdf"
    
    },
    event: {
        marginLeft: '1rem',
        marginTop: 10,
        marginBottom: 20,
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
        padding: '0 30px 20px'
    },
    imageContainer: {
        margin: 0,
        padding: 0,
        overflow: 'hidden'
    },
    video: {
        outline: 0,
        border: 0,
        padding: 0,
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
        marginLeft: 'auto',
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

    const [data, setData] = useState([])
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [eventComment, setEventComment] = useState('')
    const [popup, setPopup] = useState(null)
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 6,
        bearing: 0,
        pitch: 0,
        width: "75vw",
        height: "100vh",
    })

    // get timeline by id
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://japan-history-timeline-api.herokuapp.com/timeline/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data)
                setIsLoading(false)
            })
    }, [])

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
        setViewport({
            ...viewport,
            longitude: item.eventLongitude,
            latitude: item.eventLatitude,
            pitch: 90,
            zoom: 15,
            transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
            transitionDuration: 'auto'
        });
    };

    const eventClickHandler = async (id) => {
        const item = await data.event.find(item => item._id === id)
        flyTo(item)
        window.setTimeout(setPopup(item), 1000)
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
                            <div className={classes.headerArea}>
                                <div className={classes.flexCol}>
                                    <div><Avatar alt="" src={data.timelineImageUrl} className={classes.avatar}/></div>
                                    <div className={classes.flexRowBetween}>
                                        <div>
                                            <div><p className={classes.user}>nonoumasy</p></div>
                                            <h2 className={classes.title}>{data.timelineTitle}</h2>
                                        </div>


                                        <SimpleMenu props={props}>
                                                <MenuItem onClick={props.handleClose}>
                                                        <EditIcon fontSize='small' style={{ marginRight: 16 }}/>
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
                                                        download="filename.json"
                                                        className={classes.link}>
                                                        Export Data as Json
                                                    </a>
                                                </MenuItem>
                                        </SimpleMenu>

                                    </div>
                                    <div className={classes.flexRow} >
                                        <div><p className={classes.numItems}>{data.event && data.event.length} items</p></div>
                                        <div style={{ marginLeft: 20 }} className={classes.flexRow}><ThumbUpAltIcon className={classes.thumbUpIcon} /><p className={classes.numLikes}>2k</p></div>
                                        {/* <div><p className={classes.user}>nonoumasy</p></div> */}
                                    </div>
                                    <p className={classes.tags}>Tags:{data.tags}</p>
                                </div>

                            </div>

                            {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}
                        </div>
                        <div className={classes.cardsContainer}>
                            {data.event && data.event.map((item) => (
                                <div style={{ margin: '0 auto' }} key={item._id}>     
                                    <Card className={classes.card}>
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
                                                    width='100%'
                                                    height='200'
                                                    allow="accelerometer"
                                                    title={item.year}
                                                // type="*"
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
                                            <div>
                                                <IconButton>
                                                    <ThumbUpAltIcon />
                                                </IconButton>
                                                100
                                            </div>

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
                                        <Divider light />
                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                                    </Card>      
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
                            setPopup={setPopup}/>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default TimelineDetail
