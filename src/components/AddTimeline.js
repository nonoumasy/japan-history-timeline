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
    name: yup
        .string()
        .required('Name is a required field.'),
    imageUrl: yup
        .string(),
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

export default function AddTimeline() {
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [data, setData] = useState('')

    useEffect(() => {
        if (data) {
            const { name, imageUrl, tags} = data

            // posting to database
            axios.post("http://localhost:5000/timeline", {
                timelineTitle: name,
                timelineImageUrl: imageUrl,
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
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        autoFocus
                        inputRef={register}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <Tooltip title='This will be the cover image for your Timeline.'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="imageUrl"
                            label="imageUrl"
                            type="text"
                            id="imageUrl"
                            inputRef={register}
                            error={!!errors.imageUrl}
                            helperText={errors?.imageUrl?.message}
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