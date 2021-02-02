import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    // eventType: yup
    //     .string(),
    // eventLatitude: yup
    //     .number()
    //     .transform(cv => isNaN(cv) ? undefined : cv).positive()
    //     .nullable()
    //     .lessThan(90)
    //     .moreThan(-90)
    //     .notRequired() ,
    // eventLongitude: yup
    //     .number()
    //     .transform(cv => isNaN(cv) ? undefined : cv).positive()
    //     .nullable()
    //     .lessThan(180)
    //     .moreThan(-180)
    //     .notRequired() ,
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
    formControl: {
        marginTop: '1rem',
    },
}));

export default function AddEvent(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({ 
        resolver: yupResolver(schema)
    })
    const { story_id } = useParams()
    
    const [data, setData] = useState('')
    const [expanded, setExpanded] = useState(false);
    
    const { 
        eventDate,
        eventTitle,
        eventDescription,
        eventImageUrl,
        eventLink,
        eventAudio,
        eventLocation
    } = data

    
    useEffect(() => {
        axios.put(`http://localhost:5000/story/${story_id}/update`, {
                eventDate,
                eventTitle,
                eventDescription,
                eventImageUrl,
                eventLink,
                eventAudio,
                eventLocation
            })
            .then(() => history.push('/'))
            .catch(err => console.log(err))
    }, [data])

    

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCancel = () => {
        history.goBack()
    };

    const onSubmit = (data) => {
        setData(data) 
        console.log(data);
    }


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography>
                    Add New Event
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="eventDate"
                        label="eventDate"
                        name="eventDate"
                        autoComplete="eventDate"
                        type="text"
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
                        id="eventAudio"
                        inputRef={register}
                        error={!!errors.eventAudio}
                        helperText={errors?.eventAudio?.message}
                    />
                    {/* <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">eventType</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={eventType}
                            onChange={handleChange}
                            defaultValue={'Point'}
                            label="eventType"
                            className={classes.selectEmpty}
                        >
                            <MenuItem value={'Point'}>Point</MenuItem>
                            <MenuItem value={'LineString'}>LineString</MenuItem>
                            <MenuItem value={'Polygon'}>Polygon</MenuItem>
                        </Select>
                    </FormControl> */}
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
                        Submit
                    </Button>

                    <Button
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