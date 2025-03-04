import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import UserCardMessage from './UserCardMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getDataApi } from '../utils/fetchDataApi';
import { addUser, getConversations } from '../redux/actions/messageActions';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const LeftSideMessage = () => {
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [load, setLoad] = useState(false);
  const auth = useSelector(state => state.auth);
  const message = useSelector(state => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(message.firstLoad) return;

    dispatch(getConversations({auth}));
  }, [dispatch, auth, message.firstLoad]);

  const handleClose = () => {
    setSearch('');
    setSearchUser([]);
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setSearchUser(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: 'ALERT',
        payload: { error: error.response.data.msg },
      });
    }
  }

  const handleAddChat = (user) => {
    setSearch('');
    setSearchUser([]);
    dispatch(addUser({ user, message }));
    navigate(`/message/${user._id}`);
  }

  return (
    <div className='leftsidecontent'>
      <div className="leftsidecontentsearch">
        <input type="text" value={search} placeholder="Find User for Chat" onChange={(e) => setSearch(e.target.value)} className="leftsidecontentsearchinput" />

        <SearchIcon className="leftsidecontentsearchicon" style={{ opacity: searchUser.length > 0 ? "0" : "1" }} onClick={handleSearch} />
        <span className='header-centersearchclose' style={{ opacity: searchUser.length > 0 ? "1" : "0" }} onClick={handleClose}>&times;</span>
        <button type='submit' style={{ display: "none" }} >Search</button>
      </div>

      <div className="leftsidecontentuserlist">
        {
          searchUser?.length !== 0 ?
            <>
              {searchUser.map((user, index) => (
                <div className="leftsidecontentuserlistfind" onClick={() => handleAddChat(user)} key={index}>
                  <UserCardMessage user={user} />
                </div>
              ))}
            </> :
            <>
              {message.users?.length > 0 && message.users?.map((user, index) => (
                <div className="leftsidecontentuserlistchat" onClick={() => handleAddChat(user)} key={index}>
                  <UserCardMessage user={user} msg={true}/>
                  <FiberManualRecordIcon />
                </div>
              ))}
            </>
        }
      </div>
    </div>
  )
}

export default LeftSideMessage
