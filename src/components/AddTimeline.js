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
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InputAdornment from '@material-ui/core/InputAdornment';


const schema = yup.object().shape({
    timelineTitle: yup
        .string()
        .min(5)
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
        margin: theme.spacing(2, 0, 0),
    },
}));

export default function AddTimeline() {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        // mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState('')
    const [expanded, setExpanded] = useState(false);
    const [expandedTwo, setExpandedTwo] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleExpandClickTwo = () => {
        setExpandedTwo(!expandedTwo);
    };

    useEffect(() => {
        if (data) {
            const { timelineTitle, timelineImageUrl, tags} = data

            // posting to database
            axios.post("https://japan-history-timeline-api.herokuapp.com/timeline", {
                timelineTitle,
                timelineImageUrl,
                tags,
            })
                .then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        console.log(data)
                        setData('')
                        history.push(`/timeline/${data.data.id}`)
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
                    Add New Timeline
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
                        autoFocus
                        inputRef={register}
                        error={!!errors.timelineTitle}
                        helperText={errors?.timelineTitle?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="timelineImageUrl"
                        label="timelineImageUrl"
                        type="text"
                        id="timelineImageUrl"
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
                        error={!!errors.timelineImageUrl}
                        helperText={errors?.timelineImageUrl?.message}
                    />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <p>This will be the cover image for your Timeline. For eg. https://image.jpg</p>
                    </Collapse>

                    
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="tags"
                            label="tags"
                            name="tags"
                            autoComplete="tags"
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
                            error={!!errors.tags}
                            helperText={errors?.tags?.message}
                        />
                        <Collapse in={expandedTwo} timeout="auto" unmountOnExit>
                        <p>Add some tags to identify your Timeline. For eg, "Japan", "Battle", etc.</p>
                        </Collapse>

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