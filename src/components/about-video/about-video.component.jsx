import React from 'react'
import styled from 'styled-components'

const VideoDescContainer = styled.div`
	text-align: left;
	width: 75%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
`
const VideoDesc = styled.p``
const VideoTitle = styled.h2`
	margin: 5px 0;
	@media screen and (max-width: 1000px) {
		font-size: 18px;
	}
`

const About = ({ video }) => {
	return (
		<VideoDescContainer>
			<VideoTitle>About</VideoTitle>
			<VideoDesc>{video.description}</VideoDesc>
		</VideoDescContainer>
	)
}

export default About
