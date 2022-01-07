import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import ReactPlayer from 'react-player'
// import ShowreelCont from '../../components/showreel-container/showreel-container.component'
import imageUrlBuilder from '@sanity/image-url'
import colors from '../../style-variables/colors'
import { gsap } from 'gsap'
import { FaVimeoV, FaInstagram } from "react-icons/fa";


// const builder = imageUrlBuilder(sanityClient)
// function urlFor(source) {
// 	return builder.image(source)
// }

const PlayCont = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: auto;
`

const VideoContainer = styled.div`
	min-width: 100%;
	height: 75vh;
`

const AboutWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
    width: 100%;
    min-height: 100vh;
	padding: 0 5vw;
	
`

const AboutHeader = styled.h1`
	margin: 0;
    font-family: 'Inter',sans-serif;
    font-weight: 800;
    font-size: 84px;
	span {
		display: block;
	}
`

const AboutText = styled.div`
	
`

// const AboutSection = styled.div`
//   margin-top: 10px;
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   flex-flow: column;
//   width: 100%;
//   @media screen and (max-width: 1000px) {
//     margin-top: 5px;
//   }`

// const AboutDescContainer = styled.div`
// 	text-align: left;
// 	width: 90%;
// 	@media screen and (max-width: 1000px) {
// 		text-align: center;
// 		width: 100%;

// 		h2 {
// 			font-size: 20px; 
// 			@media screen and (max-width: 1000px) {
// 				font-size: 16px;
// 			}
// 		}
// 		p {
// 			font-size: 14px;
// 		}
// 	}
// `

const DetailHeader = styled.p`
	text-align: left;
	font-size: 20px;
	margin: 0;
	@media screen and (max-width: 1000px) {
		text-align: center;
		font-size: 16px;
	}
	font-weight: bold;
`
const Details = styled.p`
	margin: 5px 0;
	text-decoration: none;
	color: ${colors.text};
`

// const AboutTeamContainer = styled.div`
// 	width: 100%;
// 	display: flex;
// 	justify-content: center;
// 	flex-flow: row wrap;
// 	margin-top: 0;
// 	* {
// 		padding: 0;
// 		margin: 2px 0;
// 		margin-right: 5px;
// 	}

// 	@media screen and (max-width: 1000px) {
// 		justify-content: center;
// 		p {
// 			font-size: 12px;
// 		}
// 	}
// `

const ShowreelContainer = styled.div`
	width: 100%;
	margin-top: 2%;
	overflow: hidden;
	flex: 1;
	padding-left: 1rem;
`

const ContactDetails = styled.div`
	margin-top: 2rem;
	font-size: 16px;
	@media screen and (max-width: 1000px) {
		margin-left: 10%;
		width: 80%;
	}
`
const Link = styled.a`
	text-decoration: none;
	color: ${colors.text};
`
// const VideoLinks = styled.img`
// 	width: 35px;
// 	margin: 5px;
// 	@media screen and (max-width: 1000px) {
// 		width: 25px;
// 	}
// `

const Socials = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-start;
    padding: 1rem 0;
    overflow: hidden;
	gap: 1rem;

    a {
        font-size: 2rem;
        color: white;
        display: block;
    }
`;

const LinkContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media screen and (max-width: 1000px) {
		justify-content: space-between;
		align-items: center;
		flex-flow: row;
		width: 100%;
		text-align: left;
	}
`
const Container = styled.div`
	flex: 1;
`

const About = () => {
	const [about, setAbout] = useState({
		header: '',
		desc: '',
		descHeader: '',
		teamMembers: [],
		vimeo: '',
		instagram: '',
	})
	useEffect(() => {
		const aboutQuery = `*[_type == "about"] {
      header, phone, vimeo, instagram, email, descHeader, teamMembers[]->{name}
    }`
		sanityClient.fetch(aboutQuery).then(about => {
			about.forEach(about => {
				setAbout(about)
			})
		})
		return
	}, [])

	const revealRefs = useRef([]);
	revealRefs.current = [];

	const addToRefs = (el) => {
		if(el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el)
		}
	};

	const aboutPageItems = revealRefs.current;
	const showReelRef = useRef();

	useEffect(() => {
		gsap.set(aboutPageItems, { visibility: 'hidden', y: '120px' })
		gsap.set(showReelRef.current, { visibility: 'hidden' })
		gsap.to(aboutPageItems, {
			autoAlpha: 1,
			y: 0,
			duration: 1,
			stagger: {
				amount: 0.5,
				each: 0.1
			}
		})
		gsap.to(showReelRef.current, {
			autoAlpha: 1,
			delay: 1.5,
			duration: 2
		})
	}, [])

	return (
		<AboutWrapper>
			<Container>
				{/* <AboutHeader>{about.header}</AboutHeader> */}
				<AboutHeader>
					<span ref={addToRefs}>Conceptualise.</span>
					<span ref={addToRefs}>Visualise.</span>
					<span ref={addToRefs}>Create.</span>
				</AboutHeader>
				<h2 style={{ margin: '0' }}>{about.descHeader}</h2>
				<AboutText ref={addToRefs}>
					<p>Founded by Charlie Rees, Edd Roberts and George Harper</p>
				</AboutText>
				
				{/* <p>Or if you'd prefer to give us a call, we can be reached on:</p>
				<Link href={`tel:${about.phone}`}>
					<Details>{about.phone}</Details>
				</Link> */}
				<ContactDetails ref={addToRefs}>
					<DetailHeader>Get in touch:</DetailHeader>
					<Link href={`mailto:hello@fuegofilms.co.uk`}>
						<Details>hello@fuegofilms.co.uk</Details>
					</Link>
					<Socials>
						<Link href="https://vimeo.com/fuegofilmsltd" target='_blank'>
							<FaVimeoV />
						</Link>
						<Link href="https://www.instagram.com/fuegofilmsldn/?hl=en" target='_blank'>
							<FaInstagram />
						</Link>
					</Socials>
					
				</ContactDetails>
			</Container>
			<ShowreelContainer ref={showReelRef}>
				<script src="https://player.vimeo.com/api/player.js"></script>
				<PlayCont>
					<VideoContainer>
						<ReactPlayer
							className='react-player'
							url={`https://vimeo.com/384010762`}
							width='100%'
							height='100%'
							controls={true}
						/>
					</VideoContainer>
				</PlayCont>
				
			</ShowreelContainer>
		</AboutWrapper>
	)
}

export default About
