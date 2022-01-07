import React, { useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoImage from '../../components/video-image/video-image.component'
import { ContentContext } from '../../store/ContentContext'
import sizes from '../../style-variables/sizes'

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
	@media screen and (max-width: 1000px) {
		font-size: 18px;
	}
`
const VideoContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100vw;
	grid-gap: 0;
	/* visibility: hidden; */
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
	visibility: hidden;
	position: relative;
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
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
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
	background: rgb(230, 230, 255);
	color: rgb(0, 0, 0);
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
	const { category, videoArray, isFiltered, filter, clientCat, allArray } = useContext(ContentContext);
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
	console.log('category category', category)
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
