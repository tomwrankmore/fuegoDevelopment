import React from 'react';
import '../css/Video.css';
import { Link } from 'react-router-dom';
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const Video = ({ videoArray }) => {
  return (
    <div className="videoContainer">

        {videoArray.map((video, id) => {
          return (
            video.clientWork ?

            <div key={id} className="video">
              <div className="videoImgContainer">
                <Link className="videoLink" to={`/Client/${video.title}`}>
                  <img alt="video img" className="videoImg" src={urlFor(video.thumbnail).url()}/>
                  <div className="videoHover">
                    <div className="hoverText">
                        {video.client.map((client, id) => {
                            return( <p key={id}> {client.clientName} </p>)
                          })}</div>

                  </div>
                </Link>
              </div>

            </div>
            :
            <div key={id} className="video">
              <div className="videoImgContainer">
                <Link className="videoLink" to={`/Content/${video.title}`}>
                  <img alt="video img" className="videoImg" src={urlFor(video.thumbnail).url()}/>
                  <div className="videoHover">
                    <div className="hoverText">
                       <p>{video.title}</p>

                        {video.client.map((client, id) => {
                            return( <p key={id}> {client.clientName} </p>)
                          })}</div>

                  </div>
                </Link>
              </div>

            </div>
          )

        })
}
    </div>
  )
}
export default Video
