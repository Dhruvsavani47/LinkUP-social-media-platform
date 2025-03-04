import React, { useState, useEffect } from 'react';
import "../styles/Login.css";
import { Link, useNavigate } from 'react-router-dom';
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import EyeSlashIcon from '@mui/icons-material/VisibilityOffOutlined'; 
import { login } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const initialState = { email: '', password: '' };
  const auth = useSelector(state => state.auth);
  const [showpass, setShowpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (auth.token) {
      history('/');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      email,
      password,
    });

    dispatch(login(userData));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <h1 className="font-bold text-3xl text-center mb-6">
        Link<span className="text-blue-500">UP</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 sm:text-sm md:text-base lg:text-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showpass ? 'type' : 'password'}
            value={password}
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 sm:text-sm md:text-base lg:text-lg"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-blue-500"
            onClick={() => setShowpass(!showpass)}
          >
            {showpass ? <EyeIcon /> : <EyeSlashIcon />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mb-5 rounded-lg hover:bg-blue-700 transition duration-300 sm:text-sm md:text-base lg:text-lg"
        >
          Log In
        </button>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to={'/register'}>
            <span className="text-blue-700 text-xs hover:underline font-medium sm:text-sm md:text-base">
              Register
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
