import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from '@mui/material';
import moment from 'moment';
import "../styles/Notifications.css"
import { Link } from 'react-router-dom';
import { deleteNotifiesAll, readNotify } from '../redux/actions/notifyActions';
import { MdDelete } from "react-icons/md";

const Notifications = () => {
  const notify = useSelector(state => state.notify);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const isReadNotify = (dt) => {
    dispatch(readNotify({ dt, auth }))
  }

  const handleDeleteAll = () => {
    const newArr = notify?.data?.filter(item => item.isRead === false) || [];

    if (newArr.length === 0) {
      if (window.confirm("Are you sure you want to delete all notifications?")) {
        dispatch(deleteNotifiesAll({auth}));
        return;
      }
    }

    if (window.confirm(`You have ${newArr.length} unread notifications. Are you sure you want to delete all?`)) {
      dispatch(deleteNotifiesAll({auth}));
    }
  };

  return (
    <div className='notifications'>
      <div className="notificationheader">
        <h5 className="notificationheaderheading"> Notifications </h5>
        <h5 className="notificationheaderheading" style={{ cursor: "pointer", fontSize: "24px", color: "red" }} onClick={handleDeleteAll}> <MdDelete/ > </h5>
        {/* <small className="notificationheadericon"> Bell Icon </small> */}
      </div>

      {
        notify.data?.length > 0 && notify.data.map((dt, index) => (
          <div className="notification-data" key={index} style={{backgroundColor: dt.isRead ? "rgb(250, 250, 250)" : "rgb(230, 230, 230)", borderRadius: "10px", margin:"5px"}}>
            <Link to={`${dt.url}`} onClick={() => isReadNotify(dt)}>
              <div className="notificationdata-top">
                <Avatar className="notificationdata-topavatar" src={dt?.user?.avatar} alt="" />

                <div className="notificationdata-topdata">
                  <h4 className="notificationdata-topdatahead">{dt?.user?.fullname} {dt.text}</h4>
                  <h6 className="notificationdata-topdataheadtwo">{dt?.content?.slice(0, 20)}</h6>
                </div>

                <img className="notificationdata-topdataheadimage" src={dt?.image} alt="" />
              </div>
            </Link>

            <div className="notificationdata-bottom">
              <small className="notificationdata-bottomtime">{moment(dt?.createdAt).fromNow()}</small>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Notifications
