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
    year: yup
        .number()
        .required('Year is a required field.'),
    event: yup
        .string()
        .max(140)
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
    const [coordinates, setCoordinates] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/event/${props.match.params.id}`)
            .then(res =>
                [
                    setYear(res.data.year),
                    setEvent(res.data.event),
                    setImageUrl(res.data.imageUrl),
                    setLink(res.data.link),
                    setCoordinates(res.data.coordinates)
                ]
            )
            .then({new: true})
    }, [])

    useEffect(() => {
        if (data) {
            const { year, event, imageUrl, link, coordinates } = data
            // posting to database
            axios.put(`https://japan-history-timeline-api.herokuapp.com/event/${props.match.params.id}`, {
                year,
                event, 
                imageUrl,
                link,
                coordinates
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
                    <Tooltip title='Go to YouTube. Navigate to the video you wish to embed. Click the Share link below the video, then click the Embed link. The embed link will be highlighted in blue. You will need to copy this link in order to add it to your page in the Employer Center.'>
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
                    </Tooltip>
                    
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
                        name="coordinates"
                        label="coordinates"
                        type="number"
                        value={coordinates}
                        onChange={e => setCoordinates(e.target.value)}
                        id="coordinates"
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