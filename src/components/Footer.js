import React from 'react'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: 500,
        color: '#333'
    },
}))

const Footer = () => {
    const classes = useStyles()
    return (
        <div style={{marginTop: 60, marginBottom: 20}}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <a target='_blank' rel="noreferrer" href="https://www.linkedin.com/in/nonoumasy/"
                className={classes.link}>
                    Nonoumasy
                </a>{' '}
                {new Date().getFullYear()}
                {'. '}
                <Link to='/terms' className={classes.link}>
                    Terms
                </Link>
                {' and '}
                <Link to='/privacy' className={classes.link}>
                    Privacy Policy
                </Link>
                {'. '}

            </Typography>    
        </div>
    )
}

export default Footer
