import React, { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoImage from '../../components/video-image/video-image.component'
import { ContentContext } from '../../store/ContentContext'
import sizes from '../../style-variables/sizes'
import { device } from '../../style-variables/mediaQueries'

gsap.registerPlugin(ScrollTrigger)

const ContentContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	padding-top: 120px;
`
const ContentTitle = styled.h1`
	margin-top: 120px;
	font-family: 'Inter',sans-serif;
    font-weight: 800;
	font-size: ${sizes.headingOne};
`
const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	width: 100vw;
	grid-gap: 2rem;
	padding: 0 2rem;
	@media ${device.mediaMinSmall} {
		grid-template-columns: repeat( auto-fit, minmax(450px, 1fr) );
	}
	@media ${device.mediaMinLarge} {
		grid-gap: 0;
		padding: 0;
	}
`
const ImageContainer = styled.div`
	width: 100%;
	height: 150px;
	visibility: hidden;
	position: relative;
	@media ${device.mediaMinSmall} {
		height: 350px;
	}
	@media ${device.mediaMinLarge} {
		height: 250px;
	}
`

const CatCont = styled.div`
	width: 85%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
`
const CatButton = styled.button`
	cursor: pointer;
	border-radius: 20px;
	max-width: 10rem;
	flex: 1 1 0;
	background: rgb(230, 230, 255);
	color: rgb(0, 0, 0);
	padding: 5px 15px;
	border: none;
	margin: 2% 5px;
	transition: all ease-in-out 0.2s;
	&:hover {
		background: #800020;
		color: rgba(255, 255, 255, 0.8);
	}
	@media ${device.mediaMinLarge} {
	}
`

const Content = () => {
	const { category, videoArray, isFiltered, filter, clientCat } =
		useContext(ContentContext)
	const videoContainerRef = useRef()
	const revealRefs = useRef([]);
	revealRefs.current = [];

	const addToRefs = (el) => {
		if(el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el)
		}
	};

	const workItems = revealRefs.current;

	useEffect(() => {
		gsap.defaults({ease: "back"});
		gsap.set(workItems, { visibility: 'hidden', scale: 0.875 })
		gsap.to(videoContainerRef.current, { autoAlpha:1 })
		setTimeout(() => {
			ScrollTrigger.batch(workItems, {
				start: 'top 85%',
				onEnter: batch => gsap.to(batch, {
					autoAlpha: 1, 
					duration: 1,
					scale: 1,
					stagger: { 
						each: 0.075, 
						grid: [1, 3] }, 
					overwrite: true 
				}),
				onLeave: batch => gsap.set(batch, { opacity: 0, scale: 0.875, overwrite: true }),
				onEnterBack: batch => gsap.to(batch, {opacity: 1, scale: 1, stagger: 0.15, overwrite: true}),
  				onLeaveBack: batch => gsap.to(batch, { opacity: 0, scale: 0.875, overwrite: true})
			})
			}, 450)
	}, [workItems])
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
				<VideoContainer ref={videoContainerRef}>
					{videoArray.map((contentVid, id) => (
						<ImageContainer key={id} ref={addToRefs}>
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
						<ImageContainer key={id} ref={addToRefs}>
							<VideoImage filtered={false} video={contentVid} />
						</ImageContainer>
					))}
				</VideoContainer>
			)}
		</ContentContainer>
	)
}

export default Content
