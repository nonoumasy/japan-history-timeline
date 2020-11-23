import React, {useState} from 'react'

import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const ImportData = () => {
    const [file, setFile] = useState('')

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
                    <label htmlFor="raised-button-file">
                        <Button
                            startIcon={<FileCopyIcon />}
                            variant="contained"
                            component="span">
                            Import Data
                    </Button>
                    </label>
                </label>
            </Container>
        </>
    )
}

export default ImportData
