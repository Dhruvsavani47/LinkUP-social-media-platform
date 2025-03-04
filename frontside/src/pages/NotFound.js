import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/NotFound.css"

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>

      <p>Go to Home <Link to='/'>Here</Link>
      </p>
    </div>
  )
}

export default NotFound
