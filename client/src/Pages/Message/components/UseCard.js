import { Box, ListItem, ListItemAvatar, ListItemText, withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

function UseCard({ user }) {
  const { id } = useParams();
  const { auth, theme } = useSelector((state) => state);
  console.log(user)

  const isSelected = (user) => {
    if (id === user._id) return true;
    return false;
  };
  return (
    <ListItem button selected={isSelected(user)}>
      <ListItemAvatar>
        {user.online ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant={'dot'}
          >
            <Avatar alt="Remy Sharp" src={user.avatar} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
          </StyledBadge>
        ) : (
          <Avatar alt="Remy Sharp" src={user.avatar} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={user.firstname}
        secondary={
          user.text || user.media ? (
            <>
              <Box>{user.text.slice(0, 20)}...</Box>
              {user.media.length > 0 && (
                <Box style={{ display: 'flex' }}>
                  {user.media.length} <PhotoLibraryRoundedIcon style={{ marginLeft: '4px', fontSize: '17px' }} />{' '}
                </Box>
              )}
            </>
          ) : (
            `${user.lastname} ${user.firstname}`
          )
        }
      />

      <ListItemText
        primary={<Box style={{ textAlign: 'right', color: ' grey', fontSize: '13px' }}></Box>}
      />
    </ListItem>
  );
}

export default UseCard;
