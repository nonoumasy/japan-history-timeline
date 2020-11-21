import React, {useState, useEffect} from 'react'
import { useHistory, useParams, Link} from 'react-router-dom'
import Modal from './shared/Modal';
import axios from 'axios'
import { ProgressBar } from 'scrolling-based-progressbar';
import clsx from 'clsx';

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
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { SimpleMenu } from './shared/SimpleMenu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Avatar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin:0,
        padding: 0
    },
    // paper: {
    //     padding: '6px 24px',
    // },
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
        marginTop: 40,
    },
    timelineLine: {
        backgroundColor: '#BC002D',
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
        padding: 0
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
    }
}));

const TimelineDetail = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const [data, setData] = useState([])
    const [modalImage, setModalImage] = useState("")
    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://japan-history-timeline-api.herokuapp.com/timeline/${id}`)
        .then(res => res.json())
        .then(data =>{
            setData(data)
            setIsLoading(false)
        } ) 
    }, [])

    const clickImageHandler = (props) => {
        // console.log(props)
        setModalOpen(true);
        setModalImage(props)
    }

    const handleClose = () => {
        setModalOpen(false);
    };

    const deleteHandler = (id) => {
        axios.delete(`/timeline/${id}`)
        .then(() => {
            history.push('/')
        })
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const eventHandler = () => {
        history.push(`/timeline/addEvent`)
    }

    const editHandler = () => {
        history.push(`/edit/${id}`)
    }
    
    return (
        <Container maxWidth="md">            
            <Timeline >
                <div style={{ margin: 'auto', padding: 0}}>
                    <button onClick={eventHandler}>Add Event</button>
                    <div>
                        <h2 style={{display: 'inline'}}>{data.timelineTitle}</h2>
                        <button onClick={editHandler}>edit</button>
                        <Link
                            onClick={() => deleteHandler(data._id)}
                        >
                            Delete
                        </Link>
                        <p>by:{data.creator}</p>
                        <p>tags:{data.tags}</p>
                        
                        
                    </div>
                    
                    
                    <Button 
                        variant='outlined'
                        className={classes.link}>
                        Import Data
                    </Button>
                    <Button
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(
                            JSON.stringify(data)
                        )}`}
                        download="filename.json"
                        className={classes.link}
                    >
                        Export Data as Json
                    </Button>
                    {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}
                </div>
                <div className={classes.timelineContainer}>
                    
                    {data.event && data.event.map((item) => (
                        <TimelineItem
                            key={item._id}
                            align="alternate"
                            ref={props.addToRefs}
                        >

                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    {item.year}
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
                                        {item.imageUrl.includes('youtube.com') ?
                                            <iframe
                                                // component='video'
                                                // controls
                                                className={classes.video}
                                                src={item.imageUrl}
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
                                            <CardMedia
                                                className={classes.media}
                                                component='img'
                                                image={item.imageUrl}
                                                alt=''
                                                onClick={() => clickImageHandler(item.imageUrl)}
                                            />
                                        }
                                    </div>

                                    <CardContent>
                                        <Typography
                                            className={classes.event}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>

                                    <CardContent>

                                        {/* {item.tags.map(tag => (
                                    <Typography className={classes.tags}>
                                        {tag}
                                    </Typography>
                                    ))} */}

                                    </CardContent>

                                    <CardActions className={classes.actions}>

                                        <Link
                                            target='_blank'
                                            className={classes.link}
                                            onClick={() => window.open(item.link, "_blank")}
                                        >
                                            More Details
                                    </Link>

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
                                                    to={`/update/${item._id}`}
                                                >
                                                    Edit
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={props.handleClose}>
                                                <DeleteIcon fontSize='small' style={{ marginRight: 16 }} />
                                                <Link
                                                    className={classes.link}
                                                    onClick={() => deleteHandler(item._id)}
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
                                        <CardContent className={classes.actions} style={{ marginTop: 20 }}>
                                            <div >
                                                <Avatar alt="Freya" src="https://pbs.twimg.com/media/B-d6yG4IIAAM7Wt.png" />
                                            </div>
                                            <div>
                                                <Typography gutterBottom>
                                                    I love Japanese History.
                                                </Typography>
                                            </div>


                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </div>
            </Timeline>
        </Container>
        
    )
}

export default TimelineDetail
