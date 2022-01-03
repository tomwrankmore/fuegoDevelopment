import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import HamburgerMenu from '../menu/menu.component'
import { Link, withRouter } from 'react-router-dom'
import imageUrlBuilder from '@sanity/image-url'
import './header.styles.scss'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
	return builder.image(source)
}

const HeaderContainer = styled.div`
	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	z-index: 10;
	top: 0;
	left: 0;
	position: absolute;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1% 0 2%;
	box-sizing: border-box @media screen and (max-width: 1000px) {
		padding: 0 2% 0 5%;
	}
`

const LogoContainer = styled.div`
	width: 100px;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`

const LogoLink = styled(Link)`
	width: 100%;
	height: auto;
`

const LogoImg = styled.img`
	min-width: 100px;
	max-width: 70%;
	height: auto;
`

const HeaderComp = props => {
	const [header, setHeader] = useState({
		menu: [],
		logo: '',
		phone: '',
		email: '',
	})
	const [className, setClassName] = useState('home')

	useEffect(
		function () {
			setClassName(props.match.isExact ? 'home' : 'not-home')
		},
		[props.match.isExact]
	)
	useEffect(() => {
		const headerQuery = `*[_type == "header"]`
		sanityClient.fetch(headerQuery).then(header => {
			header.forEach(header => {
				setHeader(header)
			})
		})
		return
	}, [])
	
	return (
		<HeaderContainer className={className} {...props}>
			<HamburgerMenu socials={header.socials} menu={header.menu} />
			<LogoContainer>
				<LogoLink to="/">
					<LogoImg
						alt="Logo"
						src={
							window.location.pathname === '/' ||
							window.location.pathname === '/home'
								? urlFor(header.invertedLogo).width(500).url()
								: urlFor(header.logo).width(500).url()
						}
					/>
				</LogoLink>
			</LogoContainer>
		</HeaderContainer>
	)
}

const Header = withRouter(HeaderComp)
export default Header
