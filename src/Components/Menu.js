import React, {Component } from 'react';
import '../css/Menu.css'
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = ({onRouteChange, menu}) => {



    return (
      <Menu isOpen={() => {
          if(true) {
            return false
          } else {
            return true
          }}
        } disableAutoFocus right>
      {menu.map((menu, _id) => {
        return (
            <p onClick={() => onRouteChange(menu.name)} className="menuLink" key={_id}>{menu.name}</p>
        )
      })}
      </Menu>
    );
  }


export default HamburgerMenu;
