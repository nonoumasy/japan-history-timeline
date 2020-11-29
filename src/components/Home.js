import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0px auto'
    },
    flexRowBetween: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sort: {
        height: 30, 
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        color: '#333',
        backgroundColor: '#fff',
        "&$focused": {
            backgroundColor: "#fff",
        },
        "&$focusVisible": {
            backgroundColor: "#fff",
        },
        "&$selected": {
            backgroundColor: "#fff",
        },
    },
    formControl: {
        minWidth: 160,
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
        borderRadius: '7px',
        // background: 'transparent',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
        '&:hover': {
            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.1)', 
        },
        

    },
    image: {
        width: '100%',
        height: '13rem',
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

const Home = (props) => {
    const classes = useStyles()
    const [data, setData] = useState([])
    const history = useHistory()
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        fetch('https://japan-history-timeline-api.herokuapp.com/timeline')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err))

    }, [props.location, setData])

    const clickImageHandler = (id) => {
        history.push(`/timeline/${id}`)
    }


    return (
        <Container maxWidth="md" >
            <div className={classes.flexRowBetween}>
                <div>
                    <Button variant='outlined' >
                        <Link to='/addTimeline' className={classes.link}>
                            Create New StoryMap
                    </Link>
                    </Button>

                    {/* <Button >
                        <Link to='/' className={classes.link} style={{marginLeft:10}}>
                            Import Data
                    </Link>
                    </Button> */}
                </div>

                {/* <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            id="demo-simple-select-outlined"
                            value={sort}
                            className={classes.sort}
                            onChange={handleChange}
                        >   
                            <MenuItem value={10}>New</MenuItem>
                            <MenuItem value={20}>Trending</MenuItem>
                            <MenuItem value={30}>Popular</MenuItem>
                        </Select>
                    </FormControl>
                </div> */}

            </div>
            
            <Grid
                container
                spacing={2}
                // dclassName={classes.gridContainer}
                justify='flex-start'>
                    

                {data.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                            <div className={classes.container}>
                                <CardMedia
                                    component='img'
                                    className={classes.image}
                                    image={item.timelineImageUrl}
                                    onClick={() => clickImageHandler(item._id)}
                                />
                                
                            </div>
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
