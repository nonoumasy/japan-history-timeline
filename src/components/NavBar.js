import React from 'react';
import { withRouter, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 1000
    },
    title: {
        flexGrow: 1,
        fontSize: '16px'
    },
}));

const NavBar = () =>  {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar style={{textAlign: 'center'}}>
                    <Typography variant="h6" className={classes.title} >
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: '#fff' }}
                        >
                            StoryMaps  |  StoryLines
                        </Link>
                    </Typography>

                    {/* <Link
                        to="/signup"
                        style={{ textDecoration: 'none', color: '#fff' }}
                    >
                        Signup
                    </Link>
                    <Link
                        to="/login"
                        style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                    >
                        Login
                    </Link>
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                    >
                        Logout
                    </Link> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)
