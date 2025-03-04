import React from 'react'
import "../styles/ProfileAbout.css"
import moment from 'moment';

const About = ({userData, profile, auth, id}) => {

  return (
    <div className='about'>
      {
        userData?.length > 0 && userData.map((user, index) => (
            <div className="profileabout-container" key={index}>
                <div className="profileabout-contenttop">
                    <h4 className='profileabout-contenttop-head'>About Me: </h4>
                </div>

                <div className="profileabout-contentcenter">
                    <p className="profileabout-contentcenter-story">{user.story}</p>
                </div>

                <div className="profileabout-contentbottom">
                    <div className="profileabout-contentbottominfo">
                        <h6 className="profileabout-contentbottominfo-head">Joined : </h6>
                        <p className="profileabout-contentbottominfo-body">{moment(user.createdAt).format('DD MMM YYYY')}</p>
                    </div>

                    <div className="profileabout-contentbottominfo">
                        <h6 className="profileabout-contentbottominfo-head">Gender : </h6>
                        <p className="profileabout-contentbottominfo-body">{user.gender}</p>
                    </div>

                    <div className="profileabout-contentbottominfo">
                        <h6 className="profileabout-contentbottominfo-head">Email : </h6>
                        <p className="profileabout-contentbottominfo-body">{user.email}</p>
                    </div>

                    <div className="profileabout-contentbottominfo">
                        <h6 className="profileabout-contentbottominfo-head">Website : </h6>
                        <a href={user.website} target='_blank' rel='noopener noreferrer' className="profileabout-contentbottominfo-body">{user.website}</a>
                    </div>

                    <div className="profileabout-contentbottominfo">
                        <h6 className="profileabout-contentbottominfo-head">Phone : </h6>
                        <p className="profileabout-contentbottominfo-body">{user.phone}</p>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default About
