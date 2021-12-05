import React, { useState } from 'react'
import styled from 'styled-components'
import './menu.styles.scss'
import { useTrail, animated } from 'react-spring'
import { push as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'
import sanityClient from '../../Client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
	return builder.image(source)
}

const AnimatedMenuItem = animated(NavLink)

const MenuItem = styled(AnimatedMenuItem)`
	cursor: pointer;
	text-decoration: none;
	color: rgba(255, 255, 255, 0.7);
	margin: 0 0 10px 0;
	font-size: 32px;
	position: relative;
	z-index: 99;
	transition: color ease-in-out 0.3s;
	&:hover {
		color: rgba(255, 255, 255, 1);
	}
`

const SocialContainer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	display: flex !important;
	justify-content: center;
	align-items: flex-end;
	top: 0;
	left: 0;
`
const SocialCont = styled.div`
	display: flex;
	height: 60px;
	width: 60%;
	margin-bottom: 10px;
	box-sizing: border-box;
	justify-content: space-around;
`

const SocialItem = styled.img`
	width: 35px;
	height: auto;
	opacity: 0.7;
	&:hover {
		opacity: 1;
	}
`

const Border = styled.div``
const HamburgerMenu = ({ menu, socials }) => {
	const items = menu

	const [trail, set] = useTrail(items.length, () => ({
		opacity: 0,
		transform: 'translate3D(0,50px,0)',
	}))

	const [animate, setAnimate] = useState({
		classNames: '',
	})

	const [menuOpen, menuOpenSwitch] = useState(false)

	const toggleMenu = state => {
		if (state.isOpen) {
			setAnimate({ classNames: 'border-animation' })
			menuOpenSwitch(true)
			set({
				opacity: 1,
				transform: 'translate3D(0,0,0',
			})
		} else {
			menuOpenSwitch(false)
			setAnimate({ classNames: '' })
			set({
				opacity: 0,
				transform: 'translate3D(0,50px,0',
			})
		}
	}

	return (
		<Menu
			id="menu"
			isOpen={menuOpen}
			pageWrapId={'page-wrap'}
			outerContainerId={'outer-container'}
			width={'200px'}
			onStateChange={toggleMenu}
			disableAutoFocus
			left
		>
			<Border className={`menu-border ${animate.classNames}`} />
			{/* {menuOpen ? <Border className='border-animation' /> : null} */}

			{trail.map((props, index) => (
				<MenuItem
					key={items[index]}
					style={props}
					onClick={() => menuOpenSwitch(false)}
					to={
						items[index].name === 'home' || items[index].name === 'Home'
							? '/'
							: `/${items[index].name.toLowerCase()}`
					}
				>
					{items[index].name}
				</MenuItem>
			))}
			<SocialContainer>
				<SocialCont>
					{socials
						? socials.map((social, id) => (
								<a target="_blank" rel="noopener noreferrer" href={social.link}>
									<SocialItem
										src={`${urlFor(social.icon)}`}
										key={id}
									></SocialItem>
								</a>
						  ))
						: null}
				</SocialCont>
			</SocialContainer>
		</Menu>
	)
}

export default HamburgerMenu
