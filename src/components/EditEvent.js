import React, { useEffect, useState } from 'react';
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
    eventYear: yup
        .number()
        .required('Year is a required field.'),
    eventDescription: yup
        .string()
        .max(140)
        .required('Event is a required field.'),
    eventImageUrl: yup
        .string(),
    eventLink: yup
        .string(),
    eventCoordinates: yup
        .number()

})

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function EditEvent(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const [data, setData] = useState('')
    const [eventYear, setEventYear] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventImageUrl, setEventImageUrl] = useState('')
    const [eventLink, setEventLink] = useState('')
    const [eventCoordinates, setEventCoordinates] = useState('')

    console.log('asdf', props)

    useEffect(() => {
        if (data)
        axios.get(`http://localhost:5000/event/${props.match.params.id}`)
            .then(res =>
                [
                    setEventYear(res.data.eventYear),
                    setEventDescription(res.data.eventDescription),
                    setEventImageUrl(res.data.eventImageUrl),
                    setEventLink(res.data.eventLink),
                    setEventCoordinates(res.data.eventCoordinates)
                ]
            )
            .then({new: true})
    }, [data])

    useEffect(() => {
        if (data) {
            const { eventYear, eventDescription, eventImageUrl, eventLink, eventCoordinates } = data
            // posting to database
            axios.put(`http://localhost:5000/event/${props.match.params.id}/`, {
                eventYear,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventCoordinates
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
    }, [data])

    const handleClose = () => {
        history.goBack()
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography>
                    Edit Event
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit((data) => setData(data))}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="eventYear"
                        label="eventYear"
                        name="eventYear"
                        autoComplete="eventYear"
                        type="number"
                        value={eventYear}
                        onChange={e => setEventYear(e.target.value)}
                        autoFocus
                        inputRef={register}
                        error={!!errors.eventYear}
                        helperText={errors?.eventYear?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        name="eventDescription"
                        label="eventDescription"
                        type="text"
                        value={eventDescription}
                        onChange={e => setEventDescription(e.target.value)}
                        id="eventDescription"
                        inputRef={register}
                        error={!!errors.eventDescription}
                        helperText={errors?.eventDescription?.message}
                    />
                    <Tooltip title='Go to YouTube. Navigate to the video you wish to embed. Click the Share link below the video, then click the Embed link. The embed link will be highlighted in blue. You will need to copy this link in order to add it to your page in the Employer Center.'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="eventImageUrl"
                            label="eventImageUrl"
                            type="text"
                            value={eventImageUrl}
                            onChange={e => setEventImageUrl(e.target.value)}
                            id="eventImageUrl"
                            inputRef={register}
                            error={!!errors.eventImageUrl}
                            helperText={errors?.eventImageUrl?.message}
                        />
                    </Tooltip>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eventLink"
                        label="eventLink"
                        type="text"
                        value={eventLink}
                        onChange={e => setEventLink(e.target.value)}
                        id="eventLink"
                        inputRef={register}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eventCoordinates"
                        label="eventCoordinates"
                        type="number"
                        value={eventCoordinates}
                        onChange={e => setEventCoordinates(e.target.value)}
                        id="eventCoordinates"
                        min="-90"
                        max="90"
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
                        Update 
                    </Button>

                </form>
            </div>
        </Container>
    );
}