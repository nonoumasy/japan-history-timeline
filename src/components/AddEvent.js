import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
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
    .required('Description is a required field.'),
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddEvent(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({ 
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState('')
    const { id } = useParams()
    
    const { eventYear, eventDescription, eventImageUrl, eventLink, eventCoordinates} = data
    useEffect(() => {
        if (data) {
            axios.put(`http://localhost:5000/timeline/${id}/update`, {
                eventYear,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventCoordinates
            })
                .then(() => history.goBack())
                .catch(err => console.log(err))
        }
    }, [data])


    const handleCancel = () => {
        history.goBack()
    };

    return (
        <Container component="main" maxWidth="xs">
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
                        id="eventYear"
                        label="eventYear"
                        name="eventYear"
                        autoComplete="eventYear"
                        type="number"
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
                        id="eventDescription"
                        inputRef={register}
                        error={!!errors.eventDescription}
                        helperText={errors?.eventDescription?.message}
                    />
                    <Tooltip title='On YouTube, Navigate to the video you wish to embed. Click the Share link below the video, then click the Embed link. The embed link will be highlighted in blue. Copy and paste this link here.'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="eventImageUrl"
                            label="eventImageUrl"
                            type="text"
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
                        onClick={handleCancel}
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