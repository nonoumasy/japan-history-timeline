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
        marginTop: theme.spacing(20),
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
    const [year, setYear] = useState('')
    const [event, setEvent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [link, setLink] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        if (data) {
            const { year, event, imageUrl, link, latitude, longitude } = data
            // posting to database
            axios.put(`https://japan-history-timeline-api.herokuapp.com/event/${props.match.params.id}`, {
                year: year,
                event: event, 
                imageUrl: imageUrl,
                link: link,
                latitude: latitude,
                longitude: longitude
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

    useEffect(() => {
        axios.get(`https://japan-history-timeline-api.herokuapp.com/event/${props.match.params.id}`)
        .then(res => 
            [
            setYear(res.data.year),
            setEvent(res.data.event),
            setImageUrl(res.data.imageUrl),
            setLink(res.data.link),
            setLatitude(res.data.latitude),
            setLongitude(res.data.longitude)
            ]
        )
    }, [props.match.params.id])

    return (
        <Container component="main" maxWidth="sm">
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
                        id="year"
                        label="year"
                        name="year"
                        autoComplete="year"
                        type="number"
                        value={year}
                        onChange={e => setYear(e.target.value)}
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
                        value={event}
                        onChange={e => setEvent(e.target.value)}
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
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
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
                        value={link}
                        onChange={e => setLink(e.target.value)}
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
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
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
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        id="longitude"
                        min="-180"
                        max="180"
                        inputRef={register}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Update 
                    </Button>

                </form>
            </div>
        </Container>
    );
}