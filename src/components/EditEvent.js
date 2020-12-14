import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import clsx from 'clsx'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Collapse from '@material-ui/core/Collapse'
import InfoIcon from '@material-ui/icons/Info'
import InputAdornment from '@material-ui/core/InputAdornment'

const schema = yup.object().shape({
    eventDate: yup
        .date(),
    eventTitle: yup
        .string()
        .required('Title is a required field.')
        .min(3),
    eventDescription: yup
        .string(),
    eventImageUrl: yup
        .string(),
    eventLink: yup
        .string(),
    eventAudio: yup
        .string(),
    type: yup
        .string(),
    eventLatitude: yup
        .number()
        .transform(cv => isNaN(cv) ? undefined : cv).positive()
        .nullable()
        .lessThan(90)
        .moreThan(-90)
        .notRequired(),
    eventLongitude: yup
        .number()
        .transform(cv => isNaN(cv) ? undefined : cv).positive()
        .nullable()
        .lessThan(180)
        .moreThan(-180)
        .notRequired(),
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
        margin: theme.spacing(2, 0, 0),
    },
}));

export default function EditEvent(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    })

    const { story_id, event_id } = useParams()

    console.log('props',props);
    console.log('blue', story_id);
    console.log('red', event_id);

    const [data, setData] = useState('')
    const [expanded, setExpanded] = useState(false);

    const [eventDate, setEventDate] = useState('')
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventImageUrl, setEventImageUrl] = useState('')
    const [eventLink, setEventLink] = useState('')
    const [eventAudio, setEventAudio] = useState('')
    const [type, setType] = useState('')
    const [eventLatitude, setEventLatitude] = useState('')
    const [eventLongitude, setEventLongitude] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // fills in form with existing value
    useEffect(() => {
        fetch(`http://localhost:5000/story/${story_id}/editEvent/${event_id}`,{
            headers: { 'Content-Type': 'application/json' }})
            .then(res => res.json())
            .then(data => {
                console.log('sd',data);
                setEventDate(data.eventDate)
                setEventTitle(data.eventTitle)
                setEventDescription(data.eventDescription)
                setEventImageUrl(data.eventImageUrl)
                setEventLink(data.eventLink)
                setEventAudio(data.eventAudio)
                // setType(data.eventLocation.type)
                setEventLatitude(data.eventLocation.coordinates.eventLatitude)
                setEventLongitude(data.eventLocation.coordinates.eventLongitude)
            })
            .then({ new: true })
    }, [])

    useEffect(() => {
        if (data) {
            const { 
                eventDate,
                eventTitle,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventAudio,
                // eventLocation: { type: type, coordinates: [eventLatitude, eventLongitude] }
            } = data
            // posting to database
            axios.put(`http://localhost:5000/story/${props.match.params.story_id}/updateEvent/${props.match.params.event_id}`, {
                eventDate,
                eventTitle,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventAudio,
                // eventLocation
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


    const handleCancel = () => {
        history.goBack()
    };

    return (
        <Container component="main" maxWidth="xs"> 
            <div className={classes.paper}>
                <Typography>
                    Edit Event
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit((data) => setData(data))}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="eventDate"
                        label="eventDate"
                        name="eventDate"
                        autoComplete="eventDate"
                        type="text"
                        value={eventDate}
                        onChange={e => setEventDate(e.target.value)}
                        autoFocus
                        inputRef={register}
                        error={!!errors.eventDate}
                        helperText={errors?.eventDate?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="eventTitle"
                        label="eventTitle"
                        name="eventTitle"
                        autoComplete="eventTitle"
                        type="text"
                        value={eventTitle}
                        onChange={e => setEventTitle(e.target.value)}
                        autoFocus
                        inputRef={register}
                        error={!!errors.eventTitle}
                        helperText={errors?.eventTitle?.message}
                    />
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                                    <Button
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <InfoIcon size='sm' />
                                    </Button>
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
                        error={!!errors.eventLink}
                        helperText={errors?.eventLink?.message}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eventAudio"
                        label="eventAudio"
                        type="text"
                        value={eventAudio}
                        onChange={e => setEventAudio(e.target.value)}
                        id="eventAudio"
                        inputRef={register}
                        error={!!errors.eventAudio}
                        helperText={errors?.eventAudio?.message}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="type"
                        label="type"
                        type="text"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        id="type"
                        defaultValue={'Point'}
                        inputRef={register}
                        error={!!errors.type}
                        helperText={errors?.type?.message}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eventLatitude"
                        label="eventLatitude"
                        type="number"
                        id="eventLatitude"
                        inputRef={register}
                        error={!!errors.eventLatitude}
                        helperText={errors?.eventLatitude?.message}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="eventLongitude"
                        label="eventLongitude"
                        type="number"
                        id="eventLongitude"
                        inputRef={register}
                        error={!!errors.eventLongitude}
                        helperText={errors?.eventLongitude?.message}
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
                        onClick={handleCancel}
                        className={classes.submit}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </Container>
    );
}