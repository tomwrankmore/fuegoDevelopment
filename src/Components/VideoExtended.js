import React from 'react';
import '../css/VideoExtended.css';

const VideoExtended = ({video}) => {

  return (
    <div className="videoExtContainer">

      {video.map((video, id) => {
        return (
          <div key={id} className="videoExt">
          <div className="videoExtVideo">
            <h3>{video.title}</h3>
              {video.client.map((client, id) => {
                  return( <p key={id}> {client.clientName} </p>)
                })}
              <iframe title={video.title} frameBorder="0" allow="autoplay; fullscreen" src={video.vimeoLink}></iframe>
          </div>
          <div key={id} className="videoExtDesc">
              <p>{video.description}</p>
              {video.teamMembers.map((teamMember, id) => {
                  return( <p key={id}> {teamMember.name} </p>)
                })}

          </div>
        </div>
        )
      })}
    </div>
  )
}
export default VideoExtended
