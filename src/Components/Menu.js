import React from 'react';
import '../css/Menu.css'
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom'



const HamburgerMenu = ({onRouteChange, menu, menuOpen, handleStateChange, closeMenu}) => {

    return (
      <Menu onStateChange={(state) => handleStateChange(state)} isOpen={menuOpen} disableAutoFocus right>
      {menu.map((menu, _id) => {
        return (
          <NavLink onClick={() => closeMenu()}  className="menuLink" key={_id} to={`/${menu.name}`}>{menu.name}</NavLink>
        )
      })}
      </Menu>
    );
  }


export default HamburgerMenu;
