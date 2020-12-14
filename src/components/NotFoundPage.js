import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        color: '#fff'
    },
    button:
    {
        borderColor: '#fff'
    }
}));

const NotFoundPage = () => {
    const classes = useStyles()

    return (
        <>
            <div style={{ position: 'fixed', objectFit: 'cover'}}>
                <div style={{ position: 'absolute', top: '60px', left: '20px'}}>
                    <Button variant='outlined' style={{ marginBottom: 10, marginTop: 20 }} className={classes.button}>
                        <Link to='/' className={classes.link}>
                            Go Home
                        </Link>
                    </Button>
                </div>
                
                <img 
                    src='https://www.nationalgeographic.com/content/dam/travel/photos/000/837/83741.adapt.1900.1.jpg' 
                    style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
                    alt="" />
                
            </div>
            
        </>
    )
}

export default NotFoundPage
