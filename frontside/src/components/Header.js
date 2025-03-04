// import React, { useState } from 'react'
// import IconButton from '@mui/material/IconButton';
// import HomeIcon from "@mui/icons-material/Home";
// import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import ExploreIcon from "@mui/icons-material/Explore";
// import SearchIcon from "@mui/icons-material/Search";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/actions/authActions";
// import { Link, useLocation } from "react-router-dom";
// import { getDataApi } from '../utils/fetchDataApi';
// import "../styles/Header.css"
// import { Avatar } from '@mui/material';
// import { useEffect } from "react";
// import UserCard from "./UserCard"


// const Header = () => {
//     const [search, setSearch] = useState('');
//     const [users, setUsers] = useState([]);
//     const dispatch = useDispatch();
//     const { auth } = useSelector(state => state);
//     const { pathname } = useLocation();

//     useEffect(() => {
//         if (search && auth.token) {
//             getDataApi(`search?username=${search}`, auth.token).then(res => setUsers(res.data.users))
//                 .catch(err => {
//                     dispatch({
//                         type: 'ALERT',
//                         payload: {
//                             error: err.response.data.msg,
//                         }
//                     })
//                 })
//         }
//     }, [search, auth.token, dispatch])

//     const isActive = (pn) => {
//         if (pn === pathname) {
//             return "active"
//         }
//     }

//     return (
//         <div className='header bg-gray-300'>
//             <div className='header-left'>
//                 <h1 className='font-bold text-xl ml-10 m-1.5'>Link<span className='text-blue-500 '>UP</span></h1>
//             </div>
//             <form className='header-center bg-slate-100 p-2 rounded-full flex items-center'>
//                 <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-52 ' value={search} onChange={(e) => setSearch(e.target.value)} />
//                 <SearchIcon />

//                 <div className='header-searchusers'>
//                     {
//                         users.length > 0 && users.map(user => (
//                             <Link to={`profile/${user._id}`} key={user._id}>
//                                 <UserCard user={user} />
//                             </Link>
//                         ))
//                     }
//                 </div>
//             </form>

//             <div className='header-right mr-10 flex space-x-10'>
//                 <div className='space-x-5'>
//                     <Link to='/'>
//                         <IconButton>
//                             <HomeIcon className={`${isActive('/')}`} />
//                         </IconButton>
//                     </Link>
//                     <Link to='/message'>
//                         <IconButton>
//                             <SendOutlinedIcon className={`${isActive('/message')}`} />
//                         </IconButton>
//                     </Link>
//                     <Link to='/notification'>
//                         <IconButton>
//                             <NotificationsIcon className={`${isActive('/notification')}`} />
//                         </IconButton>
//                     </Link>
//                     <Link to='/explore'>
//                         <IconButton>
//                             <ExploreIcon className={`${isActive('/explore')}`} />
//                         </IconButton>
//                     </Link>
//                     {/* <Link to='/'>
//                 <IconButton>
//                     <ExpandMoreIcon />
//                 </IconButton>
//             </Link> */}
//                     <IconButton onClick={() => dispatch(logout())}>
//                         <ExitToAppIcon />
//                     </IconButton>
//                 </div>

//                 <Link to={`/profile/${auth.user._id}`} >
//                     <div className='header-rightAvatar flex space-x-2'>
//                         <Avatar src={auth.user.avatar} />
//                         <h4 className='text-black'>{auth.user.fullname}</h4>
//                     </div>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Header


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { getDataApi } from '../utils/fetchDataApi';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import { LuSend } from "react-icons/lu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CircularProgress from "@mui/material/CircularProgress";
import UserCard from "./UserCard";
import "../styles/Header.css";

const Header = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const notify = useSelector(state => state.notify);
    const { pathname } = useLocation();

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return;

        try {
            setLoad(true);
            const res = await getDataApi(`search?username=${search}`, auth.token);
            setUsers(res.data.users);
            setLoad(false);
        } catch (error) {
            dispatch({
                type: 'ALERT',
                payload: { error: error.response.data.msg },
            });
        }
    }

    const isActive = (pn) => pathname === pn ? "active" : "";

    const notificationStyle = {
        position: 'absolute',
        top: '9px',
        transform: 'translate(102px)',
        backgroundColor: 'red',
        color: 'white',
        fontSize: '10px',
        fontWeight: 'lighter',
        padding: '2px 4px',
        borderRadius: '50%',
        minWidth: '10px',
        textAlign: 'center',
        lineHeight: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div className="header bg-gray-300">
            <div className="header-left">
                <h1 className="logo">Link<span className="highlight">UP</span></h1>
            </div>

            <div className="header-center">
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchIcon className="search-icon" style={{ opacity: users.length > 0 ? "0" : "1" }} />

                    <span className='header-centersearchclose' style={{ opacity: users.length > 0 ? "1" : "0" }} onClick={handleClose}>&times;</span>
                    <button type='submit' style={{ display: "none" }}>Search</button>
                    {load && <CircularProgress size={20} />}

                    {search && users.length > 0 && (
                        <div className="search-results">
                            {users.map(user =>
                                <UserCard user={user} key={user._id} handleClose={handleClose} />
                            )}
                        </div>
                    )}
                </form>
            </div>

            <div className="header-right">
                <div className="nav-icons">
                    <Link to="/">
                        <IconButton>
                            <HomeIcon className={isActive('/')} />
                        </IconButton>
                    </Link>

                    <Link to="/message">
                        <IconButton>
                            <LuSend className={isActive('/message')} />
                        </IconButton>
                    </Link>

                    {/* <Link to="/message">
                        <IconButton>
                            <img src={messanger} alt='' className={isActive('/message')} style={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    </Link> */}

                    <Link to="/notification">
                        <IconButton>
                            <NotificationsIcon className={isActive('/notification')} />
                        </IconButton>
                        <span style={notificationStyle}>
                            {notify && notify.data.length}
                        </span>
                    </Link>

                    <Link to="/explore">
                        <IconButton>
                            <ExploreIcon className={isActive('/explore')} />
                        </IconButton>
                    </Link>

                    <IconButton onClick={() => dispatch(logout())}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
                <Link to={`/profile/${auth.user._id}`} className="profile-info">
                    <Avatar src={auth.user.avatar} className="profile-avatar" />
                    <h4 className="profile-name">{auth.user.fullname}</h4>
                </Link>
            </div>
        </div>
    );
};

export default Header;
