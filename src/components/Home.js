import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0px auto'
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
}));

const Home = () => {
    const classes = useStyles()
    const [data, setData] = useState([])

    fetch('https://japan-history-timeline-api.herokuapp.com/timeline')
    .then(res => res.json())
        .then(data => setData(data))
    .catch(err => console.log(err))


    return (
        <Container component="main" maxWidth="xs">
            <div style={{margins:'20px'}}>
                Welcome to Timelines.
            </div>

            <Button variant='outlined'>
                <Link to={'/addTimeline'} className={classes.link}>
                    Create New Timeline
                </Link>
            </Button>

            {data.map(item => (
                <>
                    <h2>{item.timelineTitle}</h2>
                    <img src={item.timelineImageUrl} alt=""/>
                </>
            ))}
            
            
            
        </Container>
    )
}

export default Home
