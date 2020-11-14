import React, {useState, useEffect} from 'react';
import Modal from './shared/Modal';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ProgressBar } from 'scrolling-based-progressbar';

import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import {SimpleMenu} from './shared/SimpleMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

// import data from '../data.json'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    paper: {
        padding: '6px 24px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
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
        cursor: 'pointer'
    },
    cardaction: {
        overflow: 'hidden',
    },
    timeline: {
        backgroundColor: '#BC002D',
        width: '1px'
    },
    dialogImage: {
        objectFit: 'cover',
        height: 'auto'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px 20px'
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const history = useHistory()
    const [modalImage, setModalImage] = useState("")
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [imageOpen, setImageOpen] = useState(false);

    useEffect(() => {
        fetch('https://japan-history-timeline-api.herokuapp.com/event')
            .then(res => res.json())
            .then(result =>{
                // console.log(result)
                setData(result)
            }) 

    }, [])
    
    const clickImageHandler = (props) => {
        // console.log(props)
        setImageOpen(true);
        setModalImage(props)
    }

    const handleClose = () => {
        setImageOpen(false);
    };


    const deleteHandler = (id) => {
        setOpen(true)
            axios.delete(`/event/${id}`)
                .then(res => res.data)
                .then(setData(data.filter(item => item._id !== id)))
    };

    const snackbarHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <>
            <ProgressBar height="2px" color="#BC002D" />
            <Snackbar
                open={open}
                autoHideDuration={100}
                onClose={snackbarHandler}
                message="Successfully Deleted"
            />
            <Modal 
                open={open}
                handleClose={handleClose}
            >
                <img src={modalImage} className={classes.dialogImage} alt='' />
            </Modal>
            <Timeline >
                {data.map((item) => (
                    <TimelineItem key={item._id} align="alternate" ref={props.addToRefs}>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {item.year}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator >
                            <TimelineDot>
                            </TimelineDot>
                            <TimelineConnector className={classes.timeline}/>
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card className={classes.root}>
                                <CardActionArea className={classes.cardaction}>
                                    {item.imageUrl.includes('youtube.com') ?
                                        <iframe
                                            // component='video'
                                            // controls
                                            // className={classes.iframe}
                                            src={item.imageUrl}
                                            allowfullscreen="allowfullscreen"
                                            mozallowfullscreen="mozallowfullscreen"
                                            msallowfullscreen="msallowfullscreen"
                                            oallowfullscreen="oallowfullscreen" 
                                            webkitallowfullscreen="webkitallowfullscreen"
                                            width='auto'
                                            height='200'
                                            allow="accelerometer"
                                            title={item.year}
                                            clipboard-write
                                            encrypted-media
                                            gyroscope
                                            picture-in-picture
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
                                    
                                    {/* <CardMedia
                                        className={classes.media}
                                        image={item.imageUrl}
                                        alt=''
                                        onClick={() => clickImageHandler(item.imageUrl)}/> */}
                                </CardActionArea>
                                    <CardContent>
                                        <Typography
                                            className={classes.event}
                                        >
                                            {item.event}
                                        </Typography>
                                    </CardContent>
                                <CardActions className={classes.actions}>
                                        <Link
                                            target='_blank'
                                            className={classes.link}
                                            onClick={() => window.open(item.link, "_blank")}
                                        >
                                            More Details
                                        </Link>
                                            <SimpleMenu props={props}>
                                                <MenuItem onClick={props.handleClose}>
                                                    <Link
                                                        className={classes.link}
                                                        to={`/update/${item._id}`}
                                                    >
                                                        Edit
                                                </Link>
                                                </MenuItem>
                                                <MenuItem onClick={props.handleClose}>
                                                    <Link
                                                        className={classes.link}
                                                        onClick={() => deleteHandler(item._id)}
                                                    >
                                                        Delete
                                                </Link>
                                                </MenuItem>
                                                <MenuItem onClick={props.handleClose}>
                                                    <Link className={classes.link}>
                                                        Share
                                                </Link>
                                                </MenuItem>
                                            </SimpleMenu>
                                </CardActions>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </>
    )
}
