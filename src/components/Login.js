import React from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'; 
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    avatar: {
        marginTop: 120,
        margin: '0 auto',
        textAlign: 'center',
    },
    button: {
        padding: 10,
        width: 240,
        marginTop: '1rem',
    },
    link: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#333'
    },

}));

const Login = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Avatar className={classes.avatar}>
                <img src={'https://res.cloudinary.com/nonoumasy/image/upload/v1604132149/f40d42588779c6424f0c4abcfdb383ab_htr43v.jpg'} style={{ height: '40px', width: '40px', objectFit: 'cover' }} alt='' />
            </Avatar>
            
            
            <div style={{ margin: '10px auto', textAlign: 'center' }}>
                <div>
                    Welcome to StoryMaps
                </div>
                <br/>
                <br />
                
                <div >Sign-in with...</div>
                <Button variant='outlined' className={classes.button}>
                    <a href="http://localhost:5000/auth/google" className={classes.link}>
                        Google
                        </a>
                </Button>
                <Button variant='outlined' className={classes.button}>
                    {/* <FacebookIcon /> */}
                    <a href="http://localhost:5000/auth/facebook" className={classes.link}>
                        Facebook
                        </a>
                </Button>
                <Button variant='outlined' className={classes.button} >
                    {/* <TwitterIcon /> */}
                    <a href="http://localhost:5000/auth/twitter" className={classes.link}>
                        Twitter
                        </a>
                </Button>
                

            </div>
        </Container>
        
    )
}

export default Login
