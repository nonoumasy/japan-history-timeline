import React from 'react';
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link';
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
                            Timelines: <span>Japan History </span>
                        </Link>
                    </Typography>
                    <Tooltip title="Add New Event">
                        <IconButton color='secondary' onClick={handleMenuClick}>
                            <AddCircleIcon fontSize='medium' />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar)
