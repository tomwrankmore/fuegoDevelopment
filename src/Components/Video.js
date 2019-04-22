import React from 'react';
import sanityClient from '../Client';
import '../css/Video.css'


const Video = ({videoArray}) => {

  return (
    <div className="videoContainer">
          {videoArray.map((video, _id) => {
            return (
              <div className="video">
                <h3>{video.title}</h3>
                <p>{`client: ${JSON.stringify(video.client)}`}</p>
                <iframe title={_id} src={video.vimeoLink}></iframe>
              </div>
            )
          })}

    </div>
  )
}


export default Video
