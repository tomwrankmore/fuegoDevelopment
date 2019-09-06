import React from 'react'
import styled from 'styled-components'

const ShowreelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: scroll;

  iframe {
    width: 100%;
    height: 100%;
  }
`

const Showreel = ({ showreel }) => {

  return (
  <ShowreelContainer>

        <iframe title="showreel" frameBorder="0" allow="autoplay; fullscreen" src={showreel.vimeoLink}></iframe>

    </ShowreelContainer>
  )
}
export default Showreel
