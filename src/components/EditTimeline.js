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
    timelineTitle: yup
        .string()
        .required('Name is a required field.'),
    timelineImageUrl: yup
        .string()
        .required('imageUrl is a required field.'),
    tags: yup
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
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function EditTimeline(props) {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState('')
    const [timelineTitle, setTimelineTitle] = useState('')
    const [timelineImageUrl, setTimelineImageUrl] = useState('')
    const [tags, setTags] = useState('')

    // fills in form with existing value
    useEffect(() => {
        fetch(`http://localhost:5000/timeline/${props.match.params.id}`, {
            headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(data => { 
                setTimelineTitle(data.timelineTitle)
                setTimelineImageUrl(data.timelineImageUrl)
                setTags(data.tags)

            })
            .then({ new: true })
    }, [])

    console.log('updated data', data)

    // updates if data gets updated
    useEffect(() => {
        if (data) {
            const { timelineTitle, timelineImageUrl, tags} = data

            // posting to database
            axios.put(`http://localhost:5000/timeline/${props.match.params.id}`, 
                {
                    timelineTitle,
                    timelineImageUrl,
                    tags
                })
                .then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setData('')
                        history.push(`/timeline/${props.match.params.id}`)
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
                    EditTimeline
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit((data) => setData(data))}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="timelineTitle"
                        label="timelineTitle"
                        name="timelineTitle"
                        autoComplete="timelineTitle"
                        type="text"
                        value={timelineTitle}
                        onChange={e => setTimelineTitle(e.target.value)}
                        autoFocus
                        inputRef={register}
                        error={!!errors.timelineTitle}
                        helperText={errors?.timelineTitle?.message}
                    />
                    <Tooltip title='This will be the cover image for your Timeline.'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="timelineImageUrl"
                            label="timelineImageUrl"
                            type="text"
                            value={timelineImageUrl}
                            onChange={e => setTimelineImageUrl(e.target.value)}
                            id="timelineImageUrl"
                            inputRef={register}
                            error={!!errors.timelineImageUrl}
                            helperText={errors?.timelineImageUrl?.message}
                        />
                    </Tooltip>

                    <Tooltip title='Add some tags to identify your Timeline. For eg, "Japan", "Battle", etc.'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="tags"
                            label="tags"
                            name="tags"
                            autoComplete="tags"
                            type="text"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            inputRef={register}
                            error={!!errors.tags}
                            helperText={errors?.tags?.message}
                        />
                    </Tooltip>
                    
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
                        Submit
                    </Button>

                </form>
            </div>
        </Container>
    );
}