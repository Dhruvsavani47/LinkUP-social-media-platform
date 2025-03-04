import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toast from './Toast';
import Loading from './Loading';

const Alert = () => {
  const alert = useSelector(state => state.alert);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({
      type: 'ALERT',
      payload: {}
    })
  }
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && <Toast msg={{ title: 'Error', body: alert.error }} bgColor="#721c24" handleShow={handleClose} />}
      {alert.success && <Toast msg={{ title: 'Success', body: alert.success }} bgColor="#155724" handleShow={handleClose} />}
    </div>
  )
}

export default Alert
