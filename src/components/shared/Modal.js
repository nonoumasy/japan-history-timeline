import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialog: {
        margin: 'auto',
        height: 'auto'
    }
}));

const Modal = ({ imageOpen, handleClose, children }) => {

    const classes = useStyles();
    return (
        <>
            <Dialog
                open={imageOpen}
                fullWidth
                maxWidth={'lg'}
                className={classes.dialog}
                onClose={handleClose}
            >
                {children}
            </Dialog>    
            
        </>
    )
}

export default Modal
