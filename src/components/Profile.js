import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Footer from './Footer';

import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0px auto',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 100,
    },
    left: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '50vw',
        height: '100vh',
    },
    right: {
        position: 'relative',
        overflow: 'scroll',
        top:0,
        left: '50vw',
        width: '50vw',
        height: '100vh',
    },
    leftContainer: {
        position: 'absolute',
        margin: '0 auto',
        top: '50%',
        left: '50%',
        textAlign: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        margin: '0 auto',
        marginBottom: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 10,
    },
    numFollowers: {
        marginBottom: 10,
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        color: '#333'
    },
    followButton: {
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    createButton: {
        marginBottom: 20,
    },
    link: {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333'
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

const Profile = () => {
    const classes = useStyles()
    const history = useHistory()
    const [data, setData] = useState([])
    const [user, setUser] = useState('')
    
    useEffect(() => {
        fetch("http://localhost:5000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error("failed to authenticate user")
            })
            .then(response => {
                setUser(response.user)
            })
            .catch(error => console.log(error)) 
    }, [])

    // useEffect(() => {
    //     fetch('https://japan-history-story-api.herokuapp.com/story')
    //         .then(res => res.json())
    //         .then(data => setData(data))
    //         .catch(err => console.log(err))

    // }, [setData])

    // console.log('user',user)

    const clickImageHandler = (id) => {
        history.push(`/story/${id}`)
    }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.left}> 
                        <div className={classes.leftContainer}>
                            <Avatar alt="" src={user.photo} className={classes.avatar} />
                            <div className={classes.userName}>{user && user.username}</div>
                            <div className={classes.numFollowers}>{user && user.followers}Followers</div>
                            <div className={classes.numFollowers}>{user && user.storys}Stories</div>
                            <Button variant='outlined' color='primary' className={classes.followButton}>
                                <div className={classes.link}>Follow</div>
                            </Button>
                        </div>
                </div>
                <div className={classes.right}>
                        <Container maxWidth="md" >
                                <div>
                            <Button variant='outlined' className={classes.createButton}>
                                        <Link to='/addStory' className={classes.link}>
                                            Create New StoryMap
                                        </Link>
                                    </Button>
                                
                                    <Grid
                                        container
                                        spacing={2}
                                        // dclassName={classes.gridContainer}
                                        justify='flex-start'>

                                        {/* {data.map(item => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                                                <div className={classes.container}>
                                                    <CardMedia
                                                        component='img'
                                                        className={classes.image}
                                                        image={item.storyImageUrl}
                                                        onClick={() => clickImageHandler(item._id)}
                                                    />
                                                </div>
                                                <Typography variant="h6" className={classes.title}>
                                                    {item.storyTitle}
                                                </Typography>
                                            </Grid>
                                        ))} */}

                                    </Grid>
                                </div>
                        </Container>
                </div>
            </div>
        </>
    )
}

export default Profile
