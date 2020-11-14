import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const schema = yup.object().shape({
    year: yup
    .number()
    .required('Year is a required field.'),
    event: yup
    .string()
    .required('Event is a required field.'),
    imageUrl: yup
    .string(),
    link: yup
    .string()
    
})

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddEvent() {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({ 
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState('')
    const [open, setOpen] = useState(false);
    const [status, setStatusBase] = React.useState("");

    useEffect(() => {
        if (data) {
            const {year, event, imageUrl, link, latitude, longitude } = data

            // posting to database
            fetch("https://japan-history-timeline-api.herokuapp.com/event", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    year,
                    event,
                    imageUrl,
                    link,
                    latitude,
                    longitude

                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setOpen(true)
                        setData('')
                        history.push('/')
                    }
                })
                .catch(err => console.log(err))
        }
    }, [data, history])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setStatus = msg => setStatusBase({ msg, date: new Date() })

    return (
        <Container component="main" maxWidth="sm">
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Successfully Added"
            />
            <CssBaseline />
            <div className={classes.paper}>
                <Typography>
                    Add New Event
                </Typography>
                
                <form className={classes.form} noValidate onSubmit={handleSubmit((data) => setData(data))}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="year"
                        label="year"
                        name="year"
                        autoComplete="year"
                        type="number"
                        autoFocus
                        inputRef={register}
                        error={!!errors.year}
                        helperText={errors?.year?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        name="event"
                        label="event"
                        type="text"
                        id="event"
                        inputRef={register}
                        error={!!errors.event}
                        helperText={errors?.event?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="imageUrl"
                        label="imageUrl"
                        type="text"
                        id="imageUrl"
                        inputRef={register}
                        error={!!errors.imageUrl}
                        helperText={errors?.imageUrl?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="link"
                        label="link"
                        type="text"
                        id="link"
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="latitude"
                        label="latitude"
                        type="number"
                        id="latitude"
                        min="-90" 
                        max="90" 
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="longitude"
                        label="longitude"
                        type="number"
                        id="longitude"
                        min="-180" 
                        max="180" 
                        inputRef={register}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    
                </form>
            </div>
        </Container>
    );
}