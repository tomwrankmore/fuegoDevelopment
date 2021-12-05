import React from 'react'
import styled from 'styled-components'

const VideoContainer = styled.div`
	min-width: 100%;
	padding: 52.73% 0 0 0;
	position: relative;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`
const Player = ({ video }) => {
	return (
		<VideoContainer>
			<iframe
				title={video.title}
				frameBorder="0"
				allow="autoplay"
				src={`https://player.vimeo.com/video/${video.vimeoLink}?color=9f00ef&byline=0&portrait=0`}
			></iframe>
			<script src="https://player.vimeo.com/api/player.js"></script>
		</VideoContainer>
	)
}

export default Player
