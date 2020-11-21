import React from 'react';
import { withRouter, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontSize: '16px'
    },
}));

const NavBar = (props) =>  {
    const classes = useStyles();
    const {history} = props

    const handleMenuClick = () => {
        history.push('/addTimeline')
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar style={{textAlign: 'left'}}>
                    <Typography variant="h6" className={classes.title} >
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: '#fff' }}
                        >
                            Timelines
                        </Link>
                    </Typography>

                    <Link
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
                    <a
                        href="http://localhost:5000/logout"
                        style={{ textDecoration: 'none', color: '#fff', marginLeft: 16 }}
                    >
                        Logout
                    </a>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)
