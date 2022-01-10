import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import sanityClient from '../../Client'
import imageUrlBuilder from '@sanity/image-url'
import './video-image.styles.scss'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
	return builder.image(source)
}

const VideoItemContainer = styled.div`
	text-align: center;
	width: 100%;
	height: 100%;
	position: relative;
	transition: all 0.2s ease-in-out;
`

const VideoLink = styled(Link)`
	height: 100%;
	width: 100%;
	color: white;
	text-decoration: none;
	position: relative;
	display: block;
`

const VideoTextContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	padding: 1rem;
	justify-content: flex-end;
	align-items: flex-start;
	position: absolute;
	top: 0;
	left: 0;
	flex-flow: column;
	z-index: 2;

	* {
		margin: 0;
	}
`

const VideoImgContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	cursor: pointer;
`
const VideoItemOverlay = styled.div`
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
`
const VideoTitle = styled.h1`
	/* @media screen and (max-width: 1000px) {
		font-size: 24px;
	} */
	font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
`
const ClientText = styled.p`
	font-size: 0.75rem;
`

const VideoImgBackground = styled.div`
	height: 100vh;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`

const LogoCont = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Logo = styled.img`
	width: 50%;
	height: auto;
	@media screen and (max-width: 1000px) {
		width: 40%;
	}
`

const VideoImage = ({ video, home, filtered, more, category, clientCat }) => {
	return (
		<VideoLink
			onClick={() => window.scrollTo(0, 0)}
			to={{
				pathname: `/content/${video.title}`,
			}}
			className='videoImg'
		>
			<VideoItemContainer className={!home ? 'hover' : null}>
				<VideoItemOverlay />
				<VideoImgContainer>
					<VideoImgBackground
						style={
							!home
								? {
										height: '100%',
										backgroundImage: `url(${urlFor(video.thumbnail)
											.quality(60)
											.auto('format')
											.url()})`,
								  }
								: {
										height: '100vh',
										backgroundImage: `url(${urlFor(video.thumbnail)
											.quality(70)
											.auto('format')
											.url()})`,
								  }
						}
					/>
					<VideoTextContainer>
						{video.clientWork && clientCat ? null : video.clientWork &&
						  !filtered &&
						  !more ? null : (
							<VideoTitle>{video.title}</VideoTitle>
						)}

						{video.client
							? video.client.map((client, id) => {
									return !video.clientWork ? (
										<ClientText key={id}>{client.clientName}</ClientText>
									) : filtered || more ? (
										clientCat ? null : (
											<ClientText key={id}>{client.clientName}</ClientText>
										)
									) : null
							  })
							: null}
						{video.clientWork && clientCat && filtered && !more
							? video.client.map((client, id) =>
									client.logo.asset ? (
										<LogoCont key={id}>
											<Logo
												alt={client.clientName}
												src={urlFor(client.logo)
													.auto('format')
													.quality(60)
													.url()}
											/>
										</LogoCont>
									) : (
										<VideoTitle key={id}>{client.clientName}</VideoTitle>
									)
							  )
							: null}
						{video.clientWork && !filtered && !more && !home ? (
							video.client.map((client, id) =>
								client.logo.asset ? (
									<LogoCont key={id}>
										<Logo
											alt={client.clientName}
											src={urlFor(client.logo).auto('format').quality(60).url()}
										/>
									</LogoCont>
								) : (
									<VideoTitle key={id}>{client.clientName}</VideoTitle>
								)
							)
						) : video.clientWork && home ? (
							<div>
								<VideoTitle>{video.title}</VideoTitle>
								{video.client.map((client, id) => (
									<ClientText key={id}>{client.clientName}</ClientText>
								))}
							</div>
						) : null}
					</VideoTextContainer>
				</VideoImgContainer>
			</VideoItemContainer>
		</VideoLink>
	)
}
export default VideoImage
