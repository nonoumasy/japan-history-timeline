import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
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
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';


const schema = yup.object().shape({
    storyTitle: yup
        .string()
        .min(5)
        .required('Name is a required field.'),
    storyImageUrl: yup
        .string()
        .required('imageUrl is a required field.'),
    storySummary: yup
        .string(),
    storyStatus: yup
        .string(),
    storyReferences: yup
        .string(),
    storyTags: yup
        .string(),
    storyMapStyle: yup
        .string(),
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

export default function AddStory() {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        // mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState('')
    const [expanded, setExpanded] = useState(false);
    const [expandedTwo, setExpandedTwo] = useState(false);
    const [user, setUser] = useState('')

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandClickTwo = () => {
        setExpandedTwo(!expandedTwo);
    };

    // get user object
    useEffect(() => {
        fetch("http://localhost:5000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error("failed to authenticate user")
            })
            .then(response => {
                setUser(response.user)
            })
            .catch(error => console.log(error))
    }, [])

    // post to create story
    useEffect(() => {
        if (data) {
            const { 
                storyTitle,
                storyImageUrl,
                storySummary,
                storyStatus,
                storyTags} = data

            // posting to database
            axios.post("http://localhost:5000/story", {
                storyCreator: user,
                storyTitle,
                storyImageUrl,
                storySummary,
                storyStatus,
                storyTags
            })
                .then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        console.log(data)
                        setData('')
                        history.push(`/story/${data.data.id}`)
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
            <div className={classes.paper}>
                <Typography>
                    Add New Timeline
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit((data) => setData(data))}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="storyTitle"
                        label="storyTitle"
                        name="storyTitle"
                        autoComplete="storyTitle"
                        type="text"
                        autoFocus
                        inputRef={register}
                        error={!!errors.storyTitle}
                        helperText={errors?.storyTitle?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="storyImageUrl"
                        label="storyImageUrl"
                        type="text"
                        id="storyImageUrl"
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
                        error={!!errors.storyImageUrl}
                        helperText={errors?.storyImageUrl?.message}
                    />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <p>This will be the cover image for your Timeline. For eg. https://image.jpg</p>
                    </Collapse>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={4}
                        id="storySummary"
                        label="storySummary"
                        name="storySummary"
                        autoComplete="storySummary"
                        type="text"
                        inputRef={register}
                        error={!!errors.storySummary}
                        helperText={errors?.storySummary?.message}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="storyStatus"
                        label="storyStatus"
                        name="storyStatus"
                        autoComplete="storyStatus"
                        defaultValue={"public"}
                        type="text"
                        inputRef={register}
                        error={!!errors.storyStatus}
                        helperText={errors?.storyStatus?.message}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={4}
                        id="storyReferences"
                        label="storyReferences"
                        name="storyReferences"
                        autoComplete="storyReferences"
                        type="text"
                        inputRef={register}
                        error={!!errors.storyReferences}
                        helperText={errors?.storyReferences?.message}
                    />
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="storyTags"
                        label="storyTags"
                        name="storyTags"
                        autoComplete="storyTags"
                        type="text"
                        inputRef={register}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClickTwo}
                                        aria-expanded={expandedTwo}
                                        aria-label="show more"
                                    >
                                        <InfoIcon size='sm' />
                                    </IconButton>
                                </InputAdornment>
                        ),
                        }}
                        error={!!errors.storyTags}
                        helperText={errors?.storyTags?.message}
                    />
                    <Collapse in={expandedTwo} timeout="auto" unmountOnExit>
                    <p>Add some tags to identify your Timeline. For eg, "Japan", "Battle", etc.</p>
                    </Collapse>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="storyMapStyle"
                        label="storyMapStyle"
                        name="storyMapStyle"
                        autoComplete="storyMapStyle"
                        defaultValue={"mapbox://styles/mapbox/light-v9"}
                        type="text"
                        inputRef={register}
                        error={!!errors.storyMapStyle}
                        helperText={errors?.storyMapStyle?.message}
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