import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home/index";
import Analyze from "./Pages/Analyze";
import SignInSide from "./Pages/Auth/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./Redux/Action/authAction";
import RegisterForm from "./Pages/Auth/Register";
import NotFound from "./Pages/NotFound/index";
import Profile from "./Pages/Profile";
import Weather from "./Pages/Weather";
import Covid from "./Pages/Covid/index";
import Alert from "./components/Alert/Alert";
import PrivateRouter from "./Customrouter/Customrouter";
import { GLOBALTYPES } from "./Redux/Action/GlobalTypes";
import Peer from "peerjs";
import io from "socket.io-client";
import SocketClient from "./SocketClient";
import Message from "./Pages/Message";
import Conversation from "./Pages/Message/components/conversation";
import CallModel from "./Pages/Message/components/callModal/index";
import Active from "./Pages/Auth/Active";

function App() {
  const dispatch = useDispatch();
  const { auth, call } = useSelector((state) => state);
  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);
  return (
    <>
      <Alert />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {auth.token && <SocketClient />}
          {call && <CallModel />}

          <Switch>
            <Route path="/" component={auth.token ? Home : SignInSide} exact />
            <PrivateRouter path="/analyze" component={Analyze} />
            <Route path="/login" component={SignInSide} />
            <Route path="/active/user/:id" component={Active} />
            <Route path="/register" component={RegisterForm} />
            <PrivateRouter path="/profile" component={Profile} />
            <PrivateRouter path="/weather" component={Weather} />
            <PrivateRouter path="/covid" component={Covid} />
            <PrivateRouter path="/message" component={Message} exact />
            <PrivateRouter path="/message/:id" component={Conversation} exact />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
