import { combineReducers } from 'redux';
import auth from '../Reducer/authReducer';
import alert from '../Reducer/alertReducer';
import analyze from '../Reducer/analyzeReducer';
import socket from '../Reducer/socketReducer';
import message from '../Reducer/messageReducer';
import call from '../Reducer/callReducer';
import peer from '../Reducer/peerReducer';
import users from '../Reducer/getuserReducer';



export default combineReducers({
  auth,
  alert,
  analyze,
  socket,
  message,
  call,
  peer,
  users,
});
