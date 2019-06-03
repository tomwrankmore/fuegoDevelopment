import React from 'react';
import '../css/Video.css';


const Video = ({videoLoading, videoArray}) => {



  return (
  videoLoading ? <p>Loading</p> :  <div className="videoContainer">

      {videoArray.map((video, id) => {
        return (

          <div key={id} className="video">

            <h3>{video.title}</h3>

            <iframe title={id} src={video.vimeoLink}></iframe>
              {video.teamMembers.map((teamMember, id) => {
                  return( <p key={id}> {teamMember.name} </p>)
                })}
                {video.client.map((client, id) => {
                    return( <p key={id}> {client.clientName} </p>)
                  })}


          </div>
        )
      })}

    </div>
  )
}
export default Video
