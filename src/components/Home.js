import React, {useEffect, useState, useParams} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Footer from './Footer';

import firebase from '../firebase'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0px auto'
    },
    flexRowBetween: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sort: {
        height: 30, 
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        color: '#333',
        backgroundColor: '#fff',
        "&$focused": {
            backgroundColor: "#fff",
        },
        "&$focusVisible": {
            backgroundColor: "#fff",
        },
        "&$selected": {
            backgroundColor: "#fff",
        },
    },
    formControl: {
        minWidth: 160,
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
    card: {
        width: '100%',
        objectFit: 'cover',
    },
    container: {
        margin: 0,
        padding: 0,
        border: 0,
        borderRadius: '7px',
        // background: 'transparent',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
        '&:hover': {
            // boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.1)', 
            boxShadow: '0 5px 20px 0 rgba(0, 0, 0, 0.5), 0 15px 30px 0 rgba(0, 0, 0, 0.2)',
        },
    },
    image: {
        width: '100%',
        height: '20rem',
        objectFit: 'cover',
        margin: 0,
        padding: 0,
        transition: '0.4s',
        '&:hover': {
            transformOrigin: '50% 50%',
            transform: 'scale(1.1)',
        },
    },
    title: {
        fontSize: 14,
        textAlign: 'left',
        marginTop: 12,
        marginBottom: 16,
        lineHeight: 1.3
    },
}));

const Home = () => {
    const classes = useStyles()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const fetchData = async () => {
        const db = await firebase.firestore()
        const data = await db.collection('stories').get()
        setData(data.docs.map(doc => ({id: doc.id, ...doc.data()})))
    }

    useEffect(() => {
        fetchData()
        setIsLoading(false)
    }, [])

    return (
        <Container maxWidth="md" >
            <div className={classes.flexRowBetween}>
                <div>
                    <Button variant='outlined' >
                        <Link to='/addStory' className={classes.link}>
                            Create New StoryMap
                        </Link>
                    </Button>

                </div>

            </div>
            
            <Grid
                container
                spacing={2}
                justify='flex-start'>

                {isLoading && <h2 style={{ margin: '60px auto' }}>Loading....</h2>}

                {data.map(story => {
                    // console.log('sdfasdfasfdf', story)
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} >
                            <div className={classes.container} key={story.id}>
                                <Link to={`/story/${story.id}`}>
                                    <CardMedia
                                        component='img'
                                        className={classes.image}
                                        image={story.image}
                                    />
                                </Link>
                            </div>
                            <Typography variant="h6" className={classes.title}>
                                {story.title}
                            </Typography>
                        </Grid>
                    )
                } 
                )
                }
            </Grid>
            <Footer/>
        </Container>
    )
}

export default Home
