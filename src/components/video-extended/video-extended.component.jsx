import React from 'react'
import styled from 'styled-components'
import Player from '../player/player.component'
import Spinner from '../spinner/spinner.component'
import About from '../about-video/about-video.component'
import MoreBy from '../more-by/more-by.component'

const VideoOuterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column wrap;
`

const VideoInnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	min-width: 100vw;
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 100vh;
`

const VideoTitle = styled.h2`
	margin: 5px 0 0 0;
	@media screen and (max-width: 1000px) {
		font-size: 18px;
	}
`

const VideoDesc = styled.p`
	margin: 0;
`

const VideoExtended = ({ video }) => {
	return video.length <= 0 || video === 'noVid' ? (
		<div>
			<Spinner></Spinner>
			{video === 'noVid' ? <VideoTitle>Video Not Found :(</VideoTitle> : null}
		</div>
	) : (
	<>

		<VideoOuterWrapper>
			<VideoInnerWrapper className='videoInnerWrapper'>
				<Player video={video} />
				<VideoTitle>{video.title}</VideoTitle>
				{video.client
					? video.client.map((client, id) => {
							return <VideoDesc key={id}> {client.clientName} </VideoDesc>
					  })
					: null}
				
				{video.description ? <About video={video} /> : null}
				
			</VideoInnerWrapper>
			<MoreBy video={video} />
		</VideoOuterWrapper>
	</>
	)
}

export default VideoExtended
