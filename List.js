import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { SimpleMenu } from './src/components/shared/SimpleMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Avatar, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Footer from './src/components/Footer'
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
        width: '100%',
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
    cardaction: {
        overflow: 'hidden',
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0 10px',
        marginLeft: 0,
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
    tags: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        width: '80%',
        marginLeft: '1rem',
        marginTop: 40,
        marginBottom: 0,
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

const List = () => {

    return (
        <>
            <div className='sidebar'>
                <Tooltip arrow placement='top' title='Add New Event' >
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
                                <div><Avatar alt="" src={data.timelineImageUrl} className={classes.avatar} /></div>
                                <div>
                                    <h2 className={classes.title}>{data.timelineTitle}</h2>
                                </div>
                                <div><p className={classes.user}>nonoumasy</p></div>
                                <div className={classes.flexRow} >
                                    {/* <div className={classes.numItems}>
                                                {data.event && data.event.length} items
                                            </div> */}
                                    <div className={classes.flexRow}    >
                                        <IconButton >
                                            <ThumbUpAltIcon className={classes.thumbUpIcon} />
                                        </IconButton>
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
                                            download={data.timelineTitle && `${(data.timelineTitle).split(' ').join('_')}.json`}
                                            // download='filename.json'
                                            className={classes.link}>
                                            Export Data as Json
                                                    </a>
                                    </MenuItem>
                                </SimpleMenu>
                            </div>
                        </div>

                        {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}

                    </div>
                    <div className={classes.cardsContainer}>
                        {/* <Card data={data} props={props}/> */}

                        {data.event && data.event.map((item, index) => (
                            <div style={{ margin: '0 auto' }}>
                                <div className="Card" key={index}>
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
                                        onMouseEnter={() => eventHoverHandler(item._id)}
                                        onMouseLeave={() => setPopup('')}
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
                                        <div style={{ marginRight: '1rem' }}></div>
                                        <div className={classes.pageNum}>{index + 1}</div>
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
                                </div>
                            </div>
                        ))}

                        <div className='footer'>
                            <p className={classes.tags}>Tags: <span style={{ fontStyle: 'italic' }}>{data.tags}</span></p>
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
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List
