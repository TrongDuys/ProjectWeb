import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemAvatar,
  OutlinedInput,
  Typography,
  withStyles,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SearchIcon from '@material-ui/icons/Search';
import { getDataAPI } from '../../../../api/fetchData';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { GLOBALTYPES } from '../../../../Redux/Action/GlobalTypes';
import { getConversations, MESS_TYPES } from '../../../../Redux/Action/messageAction';
import SearchCardMessage from '../SearchCardMessage';
import UseCard from '../UseCard';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 68px)',
    borderRight: '1px solid #deb7b7',
    paddingTop: '20px',
  },
  listItem: {
    width: '98%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '5px',
    marginLeft: '2%',
    maxHeight: 'calc(100vh - 150px)',
    // overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
      backgroundColor: theme.palette.background.paper,
      marginTop: '5px',
      marginLeft: '2%',
    },
  },
  search: {
    width: '80%',
    marginLeft: '8%',
    background: '#ffffff',
    borderRadius: '15px',
    height: '45px',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
      marginLeft: '1%',
      borderRadius: '5px',
    },
  },
  labelInput: {
    fontWeight: 'bold',
    fontSize: '14px',
    paddingLeft: '50px',
    paddingTop: '3px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2px',
      paddingTop: '3px',
    },
  },
  online: {
    position: 'absolute',
    top: '50%',
    right: '10px',
  },
  cancelIcon: {
    padding: theme.spacing(0, 2),
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '54px',
    right: '46px',
    top: '9px',
    cursor: 'pointer',
    color: '#577875',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      right: '5px',
    },
  },
  boxUserCard: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: '26px',
  },
  avataSugg: {
    display: 'flex',
    marginRight: 10,
    width: '100%',
    overflowX: 'hidden',
    transition: '0.5s',
    height: 80,
    '&:hover': {
      overflowX: 'scroll',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));



function LeftSide(props) {
  const classes = useStyles();

  const [search, setSearch] = useState();
  const [searchUsers, setSearchUsers] = useState([]);
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);


  useEffect(() => {
    // if (!search) return setSearchUsers([]);

    if (search) {
      getDataAPI(`search?firstname=${search}`)
        .then((res) => setSearchUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              err: err.response.data.msg,
            },
          });
        });
    } else {
      setSearchUsers([]);
    }
  }, [search, auth.token, dispatch]);
  const handleAddUser = (user) => {
    console.log(user);
    setSearch('');
    setSearchUsers([]);
    dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
    // dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}`);
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  //loadmore
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page - 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  

  const handleClose = () => {
    setSearch('');
    setSearchUsers([]);
  };

  // useEffect(() => {
  //   if (onlineFollowing.length > 6) {
  //     var item = document.getElementById('id');

  //     window.addEventListener('wheel', function (e) {
  //       if (e.deltaY > 0) item.scrollLeft += 2;
  //       else item.scrollLeft -= 2;
  //     });
  //   }
  // });

  // useEffect(() => {
  //   setOnlineFollowing(auth.followingSug.filter((user) => user.online === true));
  // }, [auth]);

  return (
    <Box className={classes.root} >
      <form autoComplete="off">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount" className={classes.labelInput}>
            Nhập để tìm kiếm
          </InputLabel>
          <OutlinedInput
            className={classes.search}
            id="outlined-adornment-amount"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={110}
          />
          {search && <CancelRoundedIcon onClick={handleClose} className={classes.cancelIcon} />}
        </FormControl>
      </form>

      <Box>
        <List component="nav" className={classes.listItem} >
          {search && searchUsers.length !== 0 ? (
            <>
              {searchUsers.map((user) => (
                <Box key={user._id} onClick={() => handleAddUser(user)}>
                  <SearchCardMessage user={user} />
                </Box>
              ))}
            </>
          ) : (
            <>
              {message.users.map((user) => (
                <Box key={user._id} onClick={() => handleAddUser(user)} className={classes.boxUserCard}>
                  <UseCard user={user} msg={true} />
                </Box>
              ))}
            </>
          )}
        </List>
      </Box>

      <button ref={pageEnd} style={{ display: 'none' }}>
        LoadMore
      </button>
    </Box>
  );
}

export default LeftSide;
