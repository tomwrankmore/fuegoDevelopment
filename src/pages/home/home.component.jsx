import React, { useContext } from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import VideoImage from '../../components/video-image/video-image.component'
import { HomeContext } from '../../store/HomeContext'

const HomeContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: black;
	.carousel.carousel-slider .control-arrow:hover  {
		background: none;
	}
`

const HomeCarousel = styled(Carousel)`
	overflow: hidden;
	height: auto;
	padding: 0;
	background: black;

	.slide iframe {
		margin: 0 !important;
		width: 100% !important;
		min-height: -webkit-fill-available;
	}
	.carousel-slider .control-arrow {
		padding: 20px !important;
	}
`

const Home = () => {
	const { home } = useContext(HomeContext)
	const settings = {
		autoPlay: true,
		stopOnHover: false,
		interval: 5000,
		showThumbs: false,
		infiniteLoop: true,
		showStatus: false,
		transitionTime: 1000,
	}
	return (
		<HomeContainer>
			{home ? (
				<HomeCarousel {...settings}>
					{home.map((homeVid, id) => (
						<div key={id}>
							<VideoImage home={true} video={homeVid} />
						</div>
					))}
				</HomeCarousel>
			) : null}
		</HomeContainer>
	)
}

export default Home
