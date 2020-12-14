import React, {useEffect, useState} from 'react';
import { withRouter, Link, Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 1000
    },
    title: {
        flexGrow: 1,
        // marginLeft: '2rem',
    },
    link: {
        // textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#fff',
    },
    avatar: {
        width: 30,
        height: 30,
    },
}));

const logoutHandler = () => {
    alert('asdfds')
    fetch('http://localhost:5000/auth/logout')
    .then(() => console.log('You are logged out.'))
}

const NavBar = () =>  {
    const classes = useStyles();
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

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar style={{textAlign: 'left'}}>
                    <div variant="h6" className={classes.title}>
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: '#fff' }}
                        >
                            <Typography className={classes.link}>
                                StoryMaps
                            </Typography>
                        </Link>
                    </div>
                    {user ?
                    <>
                        <Link to='/profile'>
                            <Avatar alt="" src={user.photo} className={classes.avatar} />
                        </Link>
                        <a
                        href='http://localhost:5000/auth/logout'
                        style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                        >
                        <Typography className={classes.link}>
                                Logout
                        </Typography>
                        </a>
                        </>
                        :
                        <Link
                            to="/login"
                            style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                        >
                            <Typography className={classes.link}>
                                Login
                        </Typography>
                        </Link>
                    
                }  
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)
