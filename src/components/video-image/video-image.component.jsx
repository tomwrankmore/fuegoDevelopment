import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import sanityClient from '../../Client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}



const VideoItemContainer = styled.div`
  text-align: center;
  width: 100%;
  height: auto;
  position: relative;`

const VideoLink = styled(Link)`
  height: 100%;
  width: 100%;
  color: white;
  text-decoration: none;
`   
const VideoImg = styled.img`
  width: 100%;
  min-width: 100%;
  height: auto;`

const VideoTextContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    flex-flow: column;
    z-index: 2; 
    
    * {
        margin: 0;
    }`  


const VideoImgContainer = styled.div`
    position: relative;
    height: auto;
    width: 100%;
    cursor: pointer;
  `
const VideoItemOverlay = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3)
`

const VideoImage = ({ videoArray, video }) => {
  return (
    <VideoLink to={`/content/${video.title}`}>
            <VideoItemContainer >
                <VideoItemOverlay />
              <VideoImgContainer>
                
                  <VideoImg alt="video img" src={urlFor(video.thumbnail).url()}/>
                  <VideoTextContainer>
                    <h2>{video.title}</h2>
                    {video.client.map((client, id) => {
                            return( <p key={id}> {client.clientName} </p>)
                          })}
                  </VideoTextContainer>
             
              </VideoImgContainer>

            </VideoItemContainer>
            </VideoLink>
  )
}
export default VideoImage
