import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

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
    card: {
        width: '100%',
        objectFit: 'cover',
    },
    gridContainer: {
        margin: 0,
        padding: 0,
    },
    container: {
        margin: 0,
        padding: 0,
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',

    },
    image: {
        width: '100%',
        height: '20rem',
        objectFit: 'cover',
        margin: 0,
        padding: 0,
        borderRadius: '5px',
        transition: '0.4s',
        '&:hover': {
            transformOrigin: '50% 50%',
            transform: 'scale(1.1)',
        },
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 16
    }
}));

const Home = () => {
    const classes = useStyles()
    const [data, setData] = useState([])
    const history = useHistory()

    fetch('https://japan-history-timeline-api.herokuapp.com/timeline')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))

    const clickImageHandler = (id) => {
        history.push(`/timeline/${id}`)
    }


    return (
        <Container maxWidth="md">

            <Button variant='outlined' style={{marginBottom: 10}}>
                <Link to={'/addTimeline'} className={classes.link}>
                    Create New Timeline
                </Link>
            </Button>

            <Grid
                container
                spacing={2}
                // dclassName={classes.gridContainer}
                justify='start'>
                    

                {data.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card className={classes.container}>
                                <CardMedia
                                    component='img'
                                    className={classes.image}
                                    image={item.timelineImageUrl}
                                    onClick={() => clickImageHandler(item._id)}
                                />
                                
                            </Card>
                            <Typography variant="h6" className={classes.title}>
                                {item.timelineTitle}
                            </Typography>
                        </Grid>
                    )
                )
                }
            </Grid>

            
            
            
        </Container>
    )
}

export default Home
