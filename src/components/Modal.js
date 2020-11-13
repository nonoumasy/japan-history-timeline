import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialog: {
        margin: 'auto',
    }
}));

const Modal = ({ open, handleClose, children }) => {

    const classes = useStyles();
    return (
        <>
            <Dialog
                open={open}
                className={classes.dialog}
                onClose={handleClose}
            >
                {children}
            </Dialog>    
            
        </>
    )
}

export default Modal
