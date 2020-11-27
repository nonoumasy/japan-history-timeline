import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';

const schema = yup.object().shape({
    eventYear: yup
        .number(),
    eventDescription: yup
        .string()
        .max(300)
        .required('Event is a required field.'),
    eventImageUrl: yup
        .string(),
    eventLink: yup
        .string(),
    eventLatitude: yup
        .number(),
    eventLongitude: yup
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
        margin: theme.spacing(2, 0, 0),
    },
}));

export default function EditEvent(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        // mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const [data, setData] = useState('')
    const [eventYear, setEventYear] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventImageUrl, setEventImageUrl] = useState('')
    const [eventLink, setEventLink] = useState('')
    const [eventLatitude, setEventLatitude] = useState('')
    const [eventLongitude, setEventLongitude] = useState('')
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // console.log(props)

    // fills in form with existing value
    useEffect(() => {
        fetch(`https://japan-history-timeline-api.herokuapp.com/timeline/event/${props.match.params.id}`,{
            headers: { 'Content-Type': 'application/json' }})
            .then(res => res.json())
            .then(data => {
                // console.log('sd',data);
                setEventYear(data.eventYear)
                setEventDescription(data.eventDescription)
                setEventImageUrl(data.eventImageUrl)
                setEventLink(data.eventLink)
                setEventLatitude(data.eventLatitude)
                setEventLongitude(data.eventLongitude)
            })
            // .then({ new: true })
    }, [])

    useEffect(() => {
        if (data) {
            const { eventYear, eventDescription, eventImageUrl, eventLink, eventLatitude, eventLongitude } = data
            // posting to database
            axios.put(`https://japan-history-timeline-api.herokuapp.com/timeline/event/${props.match.params.id}`, {
                eventYear,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventLatitude,
                eventLongitude
            })
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setData('')
                        history.goBack()
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <InfoIcon size='sm' />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            inputRef={register}
                            error={!!errors.eventImageUrl}
                            helperText={errors?.eventImageUrl?.message}
                        />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <p>Pls paste either an image or video url link here.</p>
                        <p>If you are using a YouTube link: Navigate to the video you wish to embed. Click the Share link below the video, then click the Embed link. The embed link will be highlighted in blue. Copy and paste this link here.
                        </p>
                    </Collapse>
                    
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
                        name="eventLatitude"
                        label="eventLatitude"
                        type="number"
                        value={eventLatitude}
                        onChange={e => setEventLatitude(e.target.value)}
                        id="eventLatitude"
                        min="-90"
                        max="90"
                        inputRef={register}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eventLongitude"
                        label="eventLongitude"
                        type="number"
                        value={eventLongitude}
                        onChange={e => setEventLongitude(e.target.value)}
                        id="eventLongitude"
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
                        Update 
                    </Button>

                    <Button
                        // type="submit"
                        fullWidth
                        color="default"
                        onClick={handleClose}
                        className={classes.submit}
                    >
                        Cancel
                    </Button>

                </form>
            </div>
        </Container>
    );
}