import React from 'react';
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    event : {
        fontWeight: 600,
        fontSize: '14px'
    }
}));

const NavBar = (props) =>  {
    const classes = useStyles();
    const {history} = props

    const handleMenuClick = () => {
        history.push('/add')
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar style={{textAlign: 'left'}}>
                    <Typography variant="h6" className={classes.title} >
                        <Link
                            href="/"
                            style={{ textDecoration: 'none', color: '#fff' }}
                        >
                            Japan History Timeline
                        </Link>
                    </Typography>
                    <Button variant="contained" color='secondary' onClick={handleMenuClick}>
                        <Typography className={classes.event}>
                            New Event
                        </Typography> 
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)
