import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authActions';
import Header from './components/Header';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import PrivateRouter from './utils/PrivateRouter';
import Profile from './pages/Profile';
import { getPost } from './redux/actions/postActions';
import io from 'socket.io-client';
import { ALERT_TYPES } from './redux/actions/alertActions';
import SocketioClient from './SocketioClient';
import { getNotify } from './redux/actions/notifyActions';
import Conversation from './components/Conversation';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: ALERT_TYPES.SOCKET, payload: socket })
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPost(auth.token));
      dispatch(getNotify(auth));
    }
  }, [auth.token, auth, dispatch]);

  return (
    <div className="App">
      <Router>
        <Alert />
        {auth.token && <Header />}
        {auth.token && <SocketioClient />}
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={auth.token ? <Home /> : <Login />} />
          <Route path='/login' element={<Login />} />

          <Route element={<PrivateRouter />}>
            <Route path='/message' element={<Messages />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/notification' element={<Notifications />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/message/:id' element={<Conversation />} />
            <Route path='/profile/:id' element={<Profile />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
