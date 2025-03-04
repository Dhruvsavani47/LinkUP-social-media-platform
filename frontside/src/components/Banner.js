import React from 'react'
import { useSelector } from 'react-redux'

const Banner = () => {
  const auth = useSelector(state => state.auth)

  return (
    <div style={{ backgroundImage: `url(${auth.user.avatar})`, height: "250px", width: "1000px", backgroundSize: "cover", backgroundRepeat: "no-repeat", margin: "auto", borderRadius: "20px", marginTop: "10px", position: "relative" }}>
      <div style={{ backgroundImage: "linear-gradient(315deg, #007bff), #007bff" }}>
        <h3 style={{textAlign: "center", transform: "translateY(100px)", color: "white", fontSize: "20px"}}>Welcome to the LinkUP</h3>
      </div>
    </div>
  )
}

export default Banner
