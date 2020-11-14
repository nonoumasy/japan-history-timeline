import React from 'react';

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
            <Tooltip title='More Actions'>
                <MoreHorizIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" style={{cursor:'pointer'}}/>
            </Tooltip>
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
