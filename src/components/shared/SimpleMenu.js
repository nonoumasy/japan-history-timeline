import React from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';

export const SimpleMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Tooltip title='More Actions'>
                    <MoreHorizIcon />
                </Tooltip>
                
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.children}
            </Menu>
        </div>
    );
}
