import React, {useState} from 'react'
import styled from 'styled-components'
import './menu.styles.scss'
import { useSpring, animated } from 'react-spring'
import { push as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'



const MenuItem = styled(NavLink)`
  cursor: pointer;
  color: black;
  margin: 10px 0;
  font-size: 26px;
  text-decoration: none;
`
const AnimatedMenuItem = animated(MenuItem)


const HamburgerMenu = ({ menu }) => {
   const [menuOpen, menuOpenSwitch] = useState(false)

  const toggleMenu = (state) => {
    if (state.isOpen) menuOpenSwitch(true)
    else menuOpenSwitch(false)
  }
  const fade = useSpring({
    opacity: menuOpen ? 1 : 0,
    transform: menuOpen ? 'translate3D(0,0,0)' : 'translate3D(0,50px,0)',
   
  })
    return (
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width={ '200px' } onStateChange={toggleMenu} isOpen={menuOpen} disableAutoFocus left>
        {menu.map((menu, id) => {
          return (
          <AnimatedMenuItem style={fade} key={id} onClick={() => menuOpenSwitch(false)} to={`/${menu.name}`}>{menu.name}</AnimatedMenuItem> 
          )
        })}
      </Menu>
 
      
    )
  }


export default HamburgerMenu
