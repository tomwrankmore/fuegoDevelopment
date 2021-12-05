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
	margin-bottom: 100px;
`

const VideoInnerWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	margin-top: 80px;
	min-width: 80%;
	@media screen and (max-width: 1000px) {
		min-width: 90%;
	}
`

const VideoTitle = styled.h2`
	margin: 5px 0 0 0;
	@media screen and (max-width: 1000px) {
		font-size: 18px;
	}
`

const VideoDesc = styled.p`
	margin: 0 0 25px 0;
`

const VideoExtended = ({ video }) => {
	return video.length <= 0 || video === 'noVid' ? (
		<div>
			<Spinner></Spinner>
			{video === 'noVid' ? <VideoTitle>Video Not Found :(</VideoTitle> : null}
		</div>
	) : (
		<VideoOuterWrapper>
			<VideoInnerWrapper>
				<VideoTitle>{video.title}</VideoTitle>
				{video.client
					? video.client.map((client, id) => {
							return <VideoDesc key={id}> {client.clientName} </VideoDesc>
					  })
					: null}
				<Player video={video} />
				<MoreBy video={video} />
				{video.description ? <About video={video} /> : null}
			</VideoInnerWrapper>
		</VideoOuterWrapper>
	)
}

export default VideoExtended
