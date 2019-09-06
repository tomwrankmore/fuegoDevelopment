import React from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const BTSWrapper = styled.div`
  align-self: center;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap column;
  height: auto;
  margin-top: 100px;`

const BTSContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2%;`  

const BTSImgContainer = styled.div`
  min-width: 100%;`

const BTSImg = styled.img`
  max-width: 100%;`

const BTS = ( {video} ) => (
    <BTSWrapper>
               <h2>
                 Behind the Scenes
               </h2>
           {video.bts.length > 0 ? <BTSContainer>
            {video.bts.map((bts, id) => {
              return (
               <BTSImgContainer key={id}><BTSImg alt="BTS" src={urlFor(bts).url()} /></BTSImgContainer> 
              )
            })}
           </BTSContainer> :
            null}
          </BTSWrapper>
)

export default BTS