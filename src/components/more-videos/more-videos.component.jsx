import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import VideoImage from '../video-image/video-image.component'
import { withRouter } from 'react-router-dom'
import { ContentContext } from '../../store/ContentContext'

const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: repeat( auto-fit, minmax(450px, 1fr) );
	width: 100%;
	grid-gap: 0;
	@media screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}
	@media screen and (max-width: 1000px) {
		grid-template-columns: 1fr;
		width: 90%;
		margin-left: 5%;
	}
`
const ImageContainer = styled.div`
	width: 100%;
	height: 250px;
	@media screen and (max-width: 1000px) {
		height: 200px;
	}
`
const MoreByP = styled.h1`
	/* margin: 25px 0; */
	text-align: center;
`

const MoreVids = ({ category, currentVideo }) => {
	const { allArray } = useContext(ContentContext)
	const [moreVids, setMoreVids] = useState([])
	useEffect(() => {
		if (category !== undefined && !currentVideo.clientWork) {
			const categoryArray = []

			allArray.forEach(video => {
				if (video.categories && video.categories.length > 0) {
					if (
						currentVideo.title !== video.title &&
						category === video.categories[0]._id
					) {
						categoryArray.push(video)
					}
					setMoreVids(categoryArray)
				}
			})
		} else if (currentVideo.clientWork) {
			const categoryArray = []

			allArray.forEach(video => {
				if (video.client.length > 0 && video.client[0]._id === category) {
					if (currentVideo.title !== video.title) {
						categoryArray.push(video)
					}
					setMoreVids(categoryArray)
				}
			})
		} else {
			return
		}
		return
	}, [category, currentVideo, allArray])

	return moreVids.length > 0 ? (
		<div>
			{currentVideo.clientWork ? null : <MoreByP>More Like This</MoreByP>}
			<VideoContainer>
				{moreVids.map((contentVid, id) => (
					<ImageContainer key={id}>
						<VideoImage more={true} video={contentVid} />
					</ImageContainer>
				))}
			</VideoContainer>
		</div>
	) : null
}

export default withRouter(MoreVids)
