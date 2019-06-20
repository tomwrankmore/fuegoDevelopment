import React from 'react';
import '../css/Video.css';
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const Video = ({videoArray, videoDisplay, selected}) => {



  return (
    <div className="videoContainer">

      {videoArray.map((video, id) => {
        return (
          <div key={id} className="video">
            <h3>{video.title}</h3>
            <img onClick={() => videoDisplay(video.title)} alt="video img" className="videoImg" src={urlFor(video.thumbnail).url()}/>
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
