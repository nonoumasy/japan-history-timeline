import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        // textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333'
    },
}));



const Home = () => {
    const classes = useStyles()

    return (
        <>
            <div>
                Welcome to Timelines.
            </div>

            <Button variant='outlined'>
                <Link to={'/addTimeline'} className={classes.link}>
                    Create New Timeline
                </Link>
                
            </Button>
        </>
    )
}

export default Home
