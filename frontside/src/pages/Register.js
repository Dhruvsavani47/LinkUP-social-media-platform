import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import EyeSlashIcon from '@mui/icons-material/VisibilityOffOutlined'; 
import "../styles/Register.css"
import { register } from '../redux/actions/authActions';

const Register = () => {
  const initialState = {username: '', fullname: '', email: '', password: '', confirmPassword: '', gender: 'male'};
  const [showpass, setShowpass] = useState(false);
  const [showcfpass, setShowcfpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const {username, fullname, email, password, confirmPassword, gender} = userData;
  const {auth, alert} = useSelector(state => state)
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUserData({...userData, [name]: value});
  }

  useEffect(() => {
    if(auth.token){
      history('/')
    }
  },[auth.token, history])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(userData));
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <h1 className='font-bold text-3xl text-center mb-6'>Link<span className='text-blue-500'>UP</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="fullname"
            value={fullname}
            placeholder={alert.fullname ?  `${alert.fullname}` : "Enter fullname"}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={username.toLowerCase().replace(/ /g, "")}
            placeholder={alert.username ?  `${alert.username}` : "Enter username"}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder={alert.email ?  `${alert.email}` : "Enter email"}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showpass ? "text" : "password"}
            name="password"
            value={password}
            placeholder={alert.password ?  `${alert.password}` : "Enter password"}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <span className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-blue-500" onClick={() => setShowpass(!showpass)}>
            {showpass ? <EyeIcon /> : <EyeSlashIcon />}
          </span>
        </div>
        <div className="mb-4 relative">
          <input
            type={showcfpass ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder={alert.confirmPassword ?  `${alert.confirmPassword}` : "Enter confirmPassword"}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <span className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-blue-500" onClick={() => setShowcfpass(!showcfpass)}>
            {showcfpass ? <EyeIcon /> : <EyeSlashIcon />}
          </span>
        </div>
        <div className="mb-5">
          <select value={gender} name="gender" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mb-5 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>

        <p className="text-center">
          Already have an account? <Link to="/" className="text-blue-700 text-xs hover:underline font-medium sm:text-sm md:text-base">Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Register;
