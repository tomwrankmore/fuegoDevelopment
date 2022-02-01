import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import ReactPlayer from 'react-player'
// import ShowreelCont from '../../components/showreel-container/showreel-container.component'
// import imageUrlBuilder from '@sanity/image-url'
import colors from '../../style-variables/colors'
import { device } from '../../style-variables/mediaQueries'
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
	width: 100%;
	height: 50vh;
	@media ${device.mediaMinLarge} {
		width: 100%;
		height: 75vh;
	}
`

const AboutWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
    width: 100%;
    min-height: 100vh;
	padding: 0 5vw;
	@media ${device.mediaMinLarge} {
		flex-direction: row;
	}

	p.description, a.emailLink {
		text-align: center;
		@media ${device.mediaMinLarge} {
			text-align: left;
		}
	}
`

const AboutHeader = styled.h1`
	margin: 0;
    font-family: 'Inter',sans-serif;
    font-weight: 800;
    font-size: clamp(1rem,-.875rem + 6.333333vw,10rem);
	text-align: center;
	span {
		display: block;
	}
	@media ${device.mediaMinLarge} {
		text-align: left;
	}
`

const DetailHeader = styled.p`
	text-align: center;
	font-size: 16px;
	margin: 0;
	font-weight: bold;
	@media ${device.mediaMinLarge} {
		text-align: left;
		font-size: 20px;
	}
`
const Details = styled.p`
	margin: 5px 0;
	text-decoration: none;
	color: ${colors.text};
`

const ShowreelContainer = styled.div`
	width: 100%;
	overflow: hidden;
	flex: 1;
	@media ${device.mediaMinLarge} {
		width: 50%;
		padding-left: 1rem;
	}
		
`

const ContactDetails = styled.div`
	margin-top: 2rem;
	font-size: 16px;
`
const Link = styled.a`
	text-decoration: none;
	color: ${colors.text};
`

const Socials = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 1rem 0;
    overflow: hidden;
	gap: 1rem;
	@media ${device.mediaMinLarge} {
		justify-content: flex-start;
	}

    a {
        font-size: 2rem;
        color: white;
        display: block;
    }
`;

const TextContainer = styled.div`
	flex: 1;
	width: 100%;
	padding-top: 15vh;
	@media ${device.mediaMinLarge} {
		width: 50%;
		margin: 0;
		padding-top: 0;
	}
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
	}, [aboutPageItems])

	return (
		<AboutWrapper className='aboutWrapper'>
			<TextContainer>
				<AboutHeader>
					<span ref={addToRefs}>Conceptualise.</span>
					<span ref={addToRefs}>Visualise.</span>
					<span ref={addToRefs}>Create.</span>
				</AboutHeader>
					<h2 style={{ margin: '0' }}>{about.descHeader}</h2>
					<p ref={addToRefs} className='description'>
						We are a multi-disciplined collective of filmmakers and innovators who place creativity and storytelling at the forefront of every commercial, music promo, fashion film and documentary that we bring to life. 
						Founded and operated in London by Charlie Rees and George Harper.
					</p>
				<ContactDetails ref={addToRefs}>
					<DetailHeader>Get in touch:</DetailHeader>
					<Link href={`mailto:hello@fuegofilms.co.uk`} className='emailLink'>
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
			</TextContainer>
			<ShowreelContainer ref={showReelRef}>
				<script src="https://player.vimeo.com/api/player.js"></script>
				<PlayCont>
					<VideoContainer>
						<ReactPlayer
							className='react-player'
							url={`https://vimeo.com/672420491`}
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
