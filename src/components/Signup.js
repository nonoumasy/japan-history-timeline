import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const schema = yup.object().shape({
    username: yup
        .string().min(3, "3 Character Mininum")
        .required("Username is a required field"),
    email: yup
        .string()
        .email("Email should have correct format")
        .required("Email is a required field"),
    password: yup
        .string().min(6, "6 Character Mininum")
        .required("Password is a required field"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {
    const classes = useStyles()
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])

    const uploadPic = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'timelines')
        data.append('cloud_name', 'nonoumasy')

        // posting to cloudinary 
        axios.post('https://api.cloudinary.com/v1_1/nonoumasy/image/upload', data)
            .then(result => {
                setUrl(result.data.url)
            })
            .catch(err => console.log(err))
    }

    const uploadFields = () => {
        fetch('http://localhost:5000/user/signup', {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
                image: url
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data.message)
                    history.push('/')
                }

            })
            .catch(err => console.log(err))
    }

    const postData = () => {
        if (image) {
            uploadPic()
        } else {
            uploadFields()
        }
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img src={'https://res.cloudinary.com/nonoumasy/image/upload/v1604132149/f40d42588779c6424f0c4abcfdb383ab_htr43v.jpg'} style={{ height: '40px', width: '40px', objectFit: 'cover' }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(postData)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                inputRef={register}
                                error={!!errors.username}
                                helperText={errors?.username?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                inputRef={register}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                inputRef={register}
                                error={!!errors.password}
                                helperText={errors?.password?.message}
                            />
                        </Grid>

                    </Grid>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        type="file"
                        id="raised-button-file"
                        inputRef={register}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="raised-button-file">
                        <Button
                            startIcon={<AccountBoxIcon />}
                            variant="contained"
                            component="span"
                            className={classes.submit}>
                            Upload Profile Photo
                        </Button>
                    </label>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='Login' variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Signup
