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
}));

const NavBar = () =>  {
    const classes = useStyles();

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

                    <Link
                        to="/signup"
                        style={{ textDecoration: 'none', color: '#fff' }}
                    >
                        <Typography className={classes.link}>
                            Signup
                        </Typography>
                    </Link>
                    <Link
                        to="/login"
                        style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                    >
                        <Typography className={classes.link}>
                            Login
                        </Typography>
                    </Link>
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                    >
                        <Typography className={classes.link}>
                            Logout
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)
