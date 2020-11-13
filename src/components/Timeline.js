import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from './Modal';

// import data from '../data.json'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    event: {
        textAlign: 'left'
    },
    media: {
        height: 100,
        paddingTop: '56.25%', 
        transition: '0.4s',
        '&:hover': {
            transformOrigin: '50% 50%',
            transform: 'scale(1.1)',
        },
        
    },
    link: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        padding: '10px',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    cardaction: {
        overflow: 'hidden'
    },
    timeline: {
        backgroundColor: '#BC002D',
        width: '1px'
    },
    dialogImage: {
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto'
    },
}));

export default function CustomizedTimeline(props) {
    const classes = useStyles();
    const [modalImage, setModalImage] = useState("")
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

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
        setOpen(true);
        setModalImage(props)
    }

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Modal 
                open={open}
                handleClose={handleClose}
            >
                <img src={modalImage} className={classes.dialogImage} alt='' />
            </Modal>

            <Timeline >
                {data.map((item, i) => (
                    <TimelineItem key={i} align="alternate" ref={props.addToRefs}>
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
                                    <CardMedia
                                        className={classes.media}
                                        image={item.imageUrl}
                                        alt=''
                                        onClick={() => clickImageHandler(item.imageUrl)}/>
                                </CardActionArea>
                                    <CardContent>
                                        <Typography
                                            className={classes.event}
                                        >
                                            {item.event}
                                        </Typography>
                                    </CardContent>
                                <CardActions>
                                    <Link
                                        target='_blank'
                                        className={classes.link}
                                        onClick={() => window.open(item.link , "_blank")}
                                    >
                                        More Details
                                </Link>
                                </CardActions>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </>
    )
}
