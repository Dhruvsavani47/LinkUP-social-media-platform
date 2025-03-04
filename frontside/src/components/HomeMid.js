import React from 'react'
import Status from './Status'
import Posts from './Posts'
import { useSelector } from 'react-redux'

const Homemid = () => {
  const homePost = useSelector(state => state.homePost);

  return (
    <div className='homemid'>
      <Status />

      {
        homePost && homePost.loading ? <p>Loading...</p> :
          homePost.results === 0 ? <h4>No Post Available</h4> :
            <Posts />
      }
    </div>
  )
}

export default Homemid
