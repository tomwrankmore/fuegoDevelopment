import React from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

const VideoContainer = styled.div`
	/* min-width: 100%;
	padding: 52.73% 0 0 0; */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	/* iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	} */
`
const Player = ({ video }) => {
	return (
		<VideoContainer>
			{/* <iframe
				title={video.title}
				frameBorder="0"
				allow="autoplay"
				src={`https://player.vimeo.com/video/${video.vimeoLink}?color=9f00ef&byline=0&portrait=0`}
			></iframe>
			<script src="https://player.vimeo.com/api/player.js"></script> */}
			<ReactPlayer
				className='react-player'
				url={`https://vimeo.com/${video.vimeoLink}`}
				width='100%'
				height='100%'
				controls={true}
			/>
		</VideoContainer>
	)
}

export default Player
