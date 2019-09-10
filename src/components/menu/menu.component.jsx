import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
import './menu.styles.scss'
import { elastic as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'
import { bounceInLeft } from 'react-animations'


const MenuItem = styled(NavLink)`
  cursor: pointer;
  color: black;
  margin: 10px 0;
  font-size: 32px;
  text-decoration: none;
`
const BounceInLeft = styled.div`
  animation: 2s ${keyframes`${bounceInLeft}`};
`

const HamburgerMenu = ({ menu }) => {
   const [menuOpen, menuOpenSwitch] = useState(false)

   

  const toggleMenu = (state) => {

    if (state.isOpen) menuOpenSwitch(true)
  }

    return (
      <Menu width={ '200px' } onStateChange={toggleMenu} isOpen={menuOpen} disableAutoFocus left>
        {menu.map((menu, id) => {
          return (
          <BounceInLeft key={id}><MenuItem onClick={() => menuOpenSwitch(false)} to={`/${menu.name}`}>{menu.name}</MenuItem></BounceInLeft> 
          )
        })}
      </Menu>
 
      
    )
  }


export default HamburgerMenu
