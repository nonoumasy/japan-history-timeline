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
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';


const schema = yup.object().shape({
    storyTitle: yup
        .string()
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
        margin: theme.spacing(2, 0, 0),
    },
}));

export default function EditStory(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        // mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [expanded, setExpanded] = useState(false);
    const [expandedTwo, setExpandedTwo] = useState(false);

    const [data, setData] = useState('')
    const [storyTitle, setStoryTitle] = useState('')
    const [storyImageUrl, setStoryImageUrl] = useState('')
    const [storySummary, setStorySummary] = useState('')
    const [storyStatus, setStoryStatus] = useState('')
    const [storyReferences, setStoryReferences] = useState('')
    const [storyMapStyle, setStoryMapStyle] = useState('')
    const [storyTags, setStoryTags] = useState('')
    
    

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandClickTwo = () => {
        setExpandedTwo(!expandedTwo);
    };

    // fills in form with existing value
    useEffect(() => {
        fetch(`http://localhost:5000/story/${props.match.params.id}`, {
            headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(data => { 
                setStoryTitle(data.storyTitle)
                setStoryImageUrl(data.storyImageUrl)
                setStorySummary(data.storySummary)
                setStoryStatus(data.storyStatus)
                setStoryReferences(data.storyReferences)
                setStoryMapStyle(data.storyMapStyle)
                setStoryTags(data.storyTags)
            })
            .then({ new: true })
    }, [])

    // console.log('updated data', data)

    // updates if data gets updated
    useEffect(() => {
        if (data) {
            const { 
                storyTitle, 
                storyImageUrl, 
                storySummary,
                storyStatus,
                storyReferences,
                storyMapStyle,
                storyTags } = data

            // posting to database
            axios.put(`http://localhost:5000/story/${props.match.params.id}`, 
                {
                    storyTitle,
                    storyImageUrl,
                    storySummary,
                    storyStatus,
                    storyReferences,
                    storyTags, 
                    storyMapStyle
                })
                .then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setData('')
                        history.push(`/story/${props.match.params.id}`)
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
                    EditStory
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
                        value={storyTitle}
                        onChange={e => setStoryTitle(e.target.value)}
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
                        value={storyImageUrl}
                        onChange={e => setStoryImageUrl(e.target.value)}
                        id="storyImageUrl"
                        inputRef={register}
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
                        error={!!errors.storyImageUrl}
                        helperText={errors?.storyImageUrl?.message}
                    />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <p>This will be the cover image for your Story. For eg. https://image.jpg</p>
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
                        value={storySummary}
                        onChange={e => setStorySummary(e.target.value)}
                        autoFocus
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
                        type="text"
                        value={storyStatus}
                        onChange={e => setStoryStatus(e.target.value)}
                        autoFocus
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
                        value={storyReferences}
                        onChange={e => setStoryReferences(e.target.value)}
                        autoFocus
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
                        value={storyTags}
                        onChange={e => setStoryTags(e.target.value)}
                        inputRef={register}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedTwo,
                                        })}
                                        onClick={handleExpandClickTwo}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <InfoIcon size='sm' />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors.storyTags}
                        helperText={errors?.storyTags?.message}
                    />
                    <Collapse in={expandedTwo} timeout="auto" unmountOnExit>
                        <p>Add some storyTags to identify your Story. For eg, "Japan", "Battle", etc.</p>
                    </Collapse>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="storyMapStyle"
                        label="storyMapStyle"
                        name="storyMapStyle"
                        autoComplete="storyMapStyle"
                        type="text"
                        value={storyMapStyle}
                        onChange={e => setStoryMapStyle(e.target.value)}
                        autoFocus
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