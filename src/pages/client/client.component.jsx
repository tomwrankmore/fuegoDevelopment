import React from 'react'
import styled from 'styled-components'
import './client.styles.css'
import VideoExtended from '../../components/video-extended/video-extended.component'
import ClientSlider from '../../components/carousel/carousel.component'

const ClientVidContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column wrap;`

const ClientMoreContainer = styled.div`
  width: 500px;
`  

const Client = () => { 
  console.log('hello')
  return (
      <ClientVidContainer>
        <VideoExtended/>
                <h3>Maisie</h3>
                <ClientMoreContainer>
                  <ClientSlider /> 
                </ClientMoreContainer>
       </ClientVidContainer>




  )
}



export default Client
