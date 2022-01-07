import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import Footer from '../../components/footer/footer-component'
import ShowreelCont from '../../components/showreel-container/showreel-container.component'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
	return builder.image(source)
}
const AboutWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
    width: 100%;
    min-height: 100vh;
	padding: 0 5vw;
	span {
		display: block;
	}
`

const AboutHeader = styled.h1`
	margin: 0;
    font-family: 'Inter',sans-serif;
    font-weight: 800;
    font-size: 84px;
`

const AboutText = styled.div`
	
`

const AboutSection = styled.div`
  margin-top: 10px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  width: 100%;
  @media screen and (max-width: 1000px) {
    margin-top: 5px;
  }`

const AboutDescContainer = styled.div`
	text-align: left;
	width: 90%;
	@media screen and (max-width: 1000px) {
		text-align: center;
		width: 100%;

		h2 {
			font-size: 20px; 
			@media screen and (max-width: 1000px) {
				font-size: 16px;
			}
		}
		p {
			font-size: 14px;
		}
	}
`
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
	color: black;
`

const AboutTeamContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-flow: row wrap;
	margin-top: 0;
	* {
		padding: 0;
		margin: 2px 0;
		margin-right: 5px;
	}

	@media screen and (max-width: 1000px) {
		justify-content: center;
		p {
			font-size: 12px;
		}
	}
`

const ShowreelContainer = styled.div`
	width: 100%;
	margin-top: 2%;
	overflow: hidden;
	flex: 1;
	padding-left: 1rem;
	border-left: solid 1px white;
	background-color: pink;
`

const ContactDetails = styled.div`
	font-size: 16px;
	@media screen and (max-width: 1000px) {
		margin-left: 10%;
		width: 80%;
	}
`
const Link = styled.a`
	text-decoration: none;
	color: black;
`
const VideoLinks = styled.img`
	width: 35px;
	margin: 5px;
	@media screen and (max-width: 1000px) {
		width: 25px;
	}
`
const LinkContainer = styled.div`
	width: 100%;
	display: flex;

	justify-content: space-between;
	align-items: center;
	// flex-flow: wrap column;

	@media screen and (max-width: 1000px) {
		justify-content: space-between;
		align-items: center;
		flex-flow: row;
		width: 100%;

		text-align: left;
	}
`
const Container = styled.div`
	/* width: 80%;
	@media screen and (max-width: 1000px) {
		width: 100%;
	} */
	/* width: 100%;
	height: 100%; */
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

	return (
		<AboutWrapper>
			<Container className='poop'>
				{/* <AboutHeader>{about.header}</AboutHeader> */}
				<AboutHeader>
					<span>Conceptualise.</span>
					<span>Visualise.</span>
					<span>Create.</span>
				</AboutHeader>
				<h2 style={{ margin: '0' }}>{about.descHeader}</h2>
				<AboutText>
					<p>Founded by Charlie Rees, Edd Roberts and George Harper</p>
				</AboutText>
				
				<Link href={`mailto:${about.email}`}>
					<Details>{about.email}</Details>
				</Link>
				{/* <p>Or if you'd prefer to give us a call, we can be reached on:</p>
				<Link href={`tel:${about.phone}`}>
					<Details>{about.phone}</Details>
				</Link> */}
				<ContactDetails>
					<DetailHeader>Get in touch with us:</DetailHeader>
					<LinkContainer>
						<div>
							<Link href={`mailto:${about.email}`}>
								<Details>{about.email}</Details>
							</Link>
							<Link href={`tel:${about.phone}`}>
								<Details>{about.phone}</Details>
							</Link>
						</div>
						<div>
							<Link href="https://www.instagram.com/fuegofilmsldn/">
								<VideoLinks
									alt="instagram Logo"
									src={urlFor(about.instagram).url()}
								/>
							</Link>
							<Link href="https://vimeo.com/fuegofilmsltd">
								<VideoLinks
									alt="vimeo Logo"
									src={urlFor(about.vimeo).url()}
								/>
							</Link>
						</div>
					</LinkContainer>
				</ContactDetails>
			</Container>
			<ShowreelContainer>
				<ShowreelCont />
			</ShowreelContainer>
		</AboutWrapper>
	)
}

export default About
