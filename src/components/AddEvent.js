import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';


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

    useEffect(() => {
        if (data) {
            const {year, event, imageUrl, link, latitude, longitude, tags } = data

            // posting to database
            axios.post("https://japan-history-timeline-api.herokuapp.com/event", {
                    year,
                    event,
                    imageUrl,
                    link,
                    latitude,
                    longitude,
                    tags
                })
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setData('')
                        history.push('/')
                    }
                })
                .catch(err => console.log(err))
        }
    }, [data, history])

    const handleClose = () => {
        history.goBack()
    };

    return (
        <Container component="main" maxWidth="sm">
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
                    <Tooltip title='On YouTube, Navigate to the video you wish to embed. Click the Share link below the video, then click the Embed link. The embed link will be highlighted in blue. Copy and paste this link here.'>
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
                    </Tooltip>
                    
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

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="tags"
                        name="tags"
                        label="tags"
                        inputRef={register}
                    />

                    <Button
                        // type="submit"
                        fullWidth
                        variant="outlined"
                        color="default"
                        onClick={handleClose}
                        className={classes.submit}
                    >
                        Cancel
                    </Button>

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