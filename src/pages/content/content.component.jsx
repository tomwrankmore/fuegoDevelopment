import React, { useContext } from 'react'
import styled from 'styled-components'
import VideoImage from '../../components/video-image/video-image.component'
import { ContentContext } from '../../store/ContentContext'

const ContentContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	margin-bottom: 50px;
`
const ContentTitle = styled.h1`
	margin-top: 80px;
	@media screen and (max-width: 1000px) {
		font-size: 18px;
	}
`
const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 85%;
	grid-gap: 15px;
	@media screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
		width: 85%;
	}
	@media screen and (max-width: 1000px) {
		grid-template-columns: 1fr;
		width: 95%;
	}
`
const ImageContainer = styled.div`
	width: 100%;
	height: 250px;
	@media screen and (max-width: 1000px) {
		height: 200px;
		width: 90%;
		margin-left: 5%;
	}
`

const CatCont = styled.div`
	width: 85%;
	height: auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	@media screen and (max-width: 1000px) {
		width: 85%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		margin-bottom: 5px;
	}
`
const CatButton = styled.button`
	cursor: pointer;
	border-radius: 20px;
	background: rgba(230, 230, 255, 0.2);

	color: rgba(0, 0, 0, 0.5);
	padding: 5px 15px;
	font-size: 12px;
	border: none;
	margin: 2% 5px;
	transition: all ease-in-out 0.2s;
	&:hover {
		background: #800020;
		color: rgba(255, 255, 255, 0.8);
	}
	@media screen and (max-width: 1000px) {
		font-size: 10px;
		padding: 5px 5px;
	}
`

const Content = () => {
	const { category, videoArray, isFiltered, filter, clientCat } =
		useContext(ContentContext)
	return (
		<ContentContainer>
			<ContentTitle>Share The Vision.</ContentTitle>
			<CatCont>
				{category.map((cat, id) => {
					return (
						<CatButton
							key={id}
							onClick={() => {
								filter(cat.category)
							}}
						>
							{cat.category}
						</CatButton>
					)
				})}
			</CatCont>
			{isFiltered ? (
				<VideoContainer>
					{videoArray.map((contentVid, id) => (
						<ImageContainer key={id}>
							<VideoImage
								clientCat={clientCat}
								filtered={true}
								video={contentVid}
							/>
						</ImageContainer>
					))}
				</VideoContainer>
			) : (
				<VideoContainer>
					{videoArray.map((contentVid, id) => (
						<ImageContainer key={id}>
							<VideoImage filtered={false} video={contentVid} />
						</ImageContainer>
					))}
				</VideoContainer>
			)}
		</ContentContainer>
	)
}

export default Content
