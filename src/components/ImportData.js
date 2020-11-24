import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(2, 0, 0),

    },
}))

const ImportData = ({id}) => {
    console.log(id)
    const classes = useStyles()
    const history = useHistory()

    const [file, setFile] = useState('')

    const handleClose = () => {
        history.goBack()
    }

    const submitHandler = () => {
        // axios.put(fileToUpload)
        alert('File Submitted.')
    }

    return (
        <>
            <Container maxWidth="xs">
                <input
                    style={{ display: 'none' }}
                    type="file"
                    id="raised-button-file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="raised-button-file">
                    <Button
                        startIcon={<FileCopyIcon />}
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        component="span"
                        className={classes.submit}
                    >
                        Upload File
                    </Button>
                </label>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitHandler}>
                        Import Data
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

            </Container>
        </>
    )
}

export default ImportData
