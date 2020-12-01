import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
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
        .string(),
    // eventTitle: yup
    //     .string()
    //     .required('Title is a required field.')
    //     .min(3),
    eventDescription: yup
        .string()
        .min(3),
    eventImageUrl: yup
        .string(),
    eventLink: yup
        .string(),
    eventLatitude: yup
        .number()
        .transform(cv => isNaN(cv) ? undefined : cv).positive()
        .nullable()
        .lessThan(90)
        .moreThan(-90)
        .notRequired() ,
    eventLongitude: yup
        .number()
        .transform(cv => isNaN(cv) ? undefined : cv).positive()
        .nullable()
        .lessThan(180)
        .moreThan(-180)
        .notRequired() ,
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

export default function AddEvent(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({ 
        // mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const { id } = useParams()

    const [data, setData] = useState('')
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const { eventYear, eventTitle, eventDescription, eventImageUrl, eventLink, eventLatitude,
        eventLongitude} = data
    useEffect(() => {
        if (data) {
            axios.put(`https://japan-history-timeline-api.herokuapp.com/timeline/${id}/update`, {
                eventYear,
                eventTitle,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventLatitude,
                eventLongitude
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
                        fullWidth
                        id="eventYear"
                        label="eventYear"
                        name="eventYear"
                        autoComplete="eventYear"
                        type="text"
                        autoFocus
                        inputRef={register}
                        error={!!errors.eventYear}
                        helperText={errors?.eventYear?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        // required
                        id="eventTitle"
                        label="eventTitle"
                        name="eventTitle"
                        autoComplete="eventTitle"
                        type="text"
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
                        id="eventLatitude"
                        min="-90" 
                        max="90" 
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
                        min="-180" 
                        max="180" 
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
                        Submit
                    </Button>

                    <Button
                        // type="submit"
                        fullWidth
                        // variant="outlined"
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