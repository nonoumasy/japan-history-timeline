import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Footer = () => {
    return (
        <div style={{marginTop: 60, marginBottom: 20}}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link target='_blank' href="https://www.linkedin.com/in/nonoumasy/">
                    Nonoumasy
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>    
        </div>
    )
}

export default Footer
