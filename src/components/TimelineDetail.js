import React, { useState, useEffect} from 'react'
import { useHistory, useParams, Link} from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx';
import { useForm } from 'react-hook-form'
import Map from './Map'

import { ProgressBar } from 'scrolling-based-progressbar'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
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
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',

    },
    fab: {
        position: 'fixed',
        top: '90%',
        left: '1.5%',
        zIndex: 100
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '30vw',
        overflow: 'auto',
        padding: '40px 40px',
        backgroundColor: '#efefef',
        zIndex:100
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '70vw',
        backgroundColor: '#333'
    
    },
    root: {
        maxWidth: 345,
        margin:0,
        padding: 0
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
    },
    event: {
        padding: '16px'
    },
    link: {
        // textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333'
    },
    cardaction: {
        overflow: 'hidden',
    },
    timelineContainer: {
        marginTop: 20,
        marginBottom: 120,
        marginLeft: '-22rem'
    },
    timelineItem: {
        margin: 0,
        padding: 0,
    },
    timelineLine: {
        backgroundColor: '#999',
        width: '1px'
    },
    dialogImage: {
        objectFit: 'cover'
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
    tags: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        backgroundColor: '#333',
        color: '#fff'
    },
    actions2: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentForm: {
        margin: '0px 0px',
        padding: 0
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    headerArea: {
        maxWidth: 450,
        marginRight: 0,
        padding: 0
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    metadata: {
        marginLeft: '4rem',
        display: 'flex',
    },
    
}));

const TimelineDetail = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const { id } = useParams()
    const { register, handleSubmit } = useForm()

    const [data, setData] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [eventComment, setEventComment] = useState('')
    

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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteEventHandler = async (id) => {
        await axios.delete(`https://japan-history-timeline-api.herokuapp.com/timeline/event/${id}`)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const eventHandler = (id) => {
        history.push(`/timeline/${id}/addEvent`)
    }

    return (
        <>
            <div className={classes.mainContainer}>
                
                <div className={classes.sidebar}>
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
                        <ProgressBar height="2px" color="#333" />
                        <div style={{ margin: '0px auto', padding: 0 }}>
                            <div className={classes.headerArea}>
                                <div className={classes.actions2}>

                                    <div className={classes.flexRow}>
                                        <Avatar alt="" src={data.timelineImageUrl} />
                                        <h2 style={{ marginTop: 0, marginLeft: '1.5rem', marginBottom: 0, marginRight: '3rem' }}>{data.timelineTitle}</h2>
                                    </div>

                                    <div>
                                        <SimpleMenu props={props}>
                                            <MenuItem onClick={props.handleClose}>
                                                <EditIcon fontSize='small' style={{ marginRight: 16 }} />
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
                                </div>

                                <div style={{ marginLeft: '4rem' }}>
                                    <div className={classes.flexRow} >
                                        <div><p>{data.event && data.event.length} items</p></div>
                                        <div style={{ marginLeft: 20 }} className={classes.flexRow}><ThumbUpAltIcon /><p>2k</p></div>
                                        <div><p>nonoumasy</p></div>
                                    </div>
                                    <p className={classes.link}>Tags:{data.tags}</p>
                                </div>

                            </div>

                            {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}
                        </div>
                        <div className={classes.timelineContainer}>
                            {data.event && data.event.map((item) => (
                            <Timeline style={{margin: 0}}>
                                    <TimelineItem
                                        key={item._id}
                                        align="alternate"
                                        ref={props.addToRefs}
                                        className={classes.timelineItem}>

                                        <TimelineOppositeContent>
                                            <Typography variant="body2" color="textSecondary">
                                                {item.eventYear}
                                            </Typography>
                                        </TimelineOppositeContent>

                                        <TimelineSeparator >
                                            <TimelineDot variant='outlined'>
                                            </TimelineDot>
                                            <TimelineConnector className={classes.timelineLine} />
                                        </TimelineSeparator>

                                        <TimelineContent>
                                            <Card className={classes.root}>
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

                                                <CardContent>
                                                    <Typography
                                                        className={classes.event}
                                                    >
                                                        {item.eventDescription}
                                                    </Typography>
                                                    {item.eventLink &&
                                                        <Link
                                                            // target='_blank'
                                                            className={classes.link}
                                                            style={{ padding: '1rem' }}
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
                                                        <MenuItem onClick={props.handleClose}>
                                                            <ShareIcon fontSize='small' style={{ marginRight: 16 }} />
                                                            <Link className={classes.link}>
                                                                Share
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
                                        </TimelineContent>
                                    </TimelineItem>
                            </Timeline>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classes.map}>
                    <Map props={data}/>
                </div>
            </div>
        </>
    )
}

export default TimelineDetail
