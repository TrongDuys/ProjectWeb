import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './Redux/Action/GlobalTypes';
import { MESS_TYPES } from './Redux/Action/messageAction';


function SocketClient(props) {
  const { auth, socket, online, call } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();

  // join user
  useEffect(() => {
    socket.emit('joinUser', auth.user);
  }, [socket, auth.user]);

  

  //Message
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });
      dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...msg.user, text: msg.text, media: msg.media } });
    });
    return () => socket.off('addMessageToClient');
  }, [socket, dispatch]);

  //check user online/offline
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on('checkUserOnlineToMe', (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
        }
      });
    });
    return () => socket.off('checkUserOnlineToMe');
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on('checkUserOnlineToClient', (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
      }
    });
    return () => socket.off('checkUserOnlineToClient');
  }, [socket, dispatch, online]);

  //checkUserOffline
  useEffect(() => {
    socket.on('checkUserOffline', (id) => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
    });
    return () => socket.off('checkUserOffline');
  }, [socket, dispatch]);

  //call
  useEffect(() => {
    socket.on('callUserToClient', (data) => {
      dispatch({ type: GLOBALTYPES.CALL, payload: data });
    });
    return () => socket.off('callUserToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('userBusy', (data) => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {error: `${call.username} is busy`} });
    });
    return () => socket.off('userBusy');
  }, [socket, dispatch, call]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: 'none' }}>
        {/* <source src={audioNoti} type="audio/mp3" /> */}
      </audio>
    </>
  );
}

export default SocketClient;
