import React, {Component } from 'react';
import '../css/Menu.css'
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = ({isOpen, menu}) => {



    return (
      <Menu disableAutoFocus isOpen={isOpen}  right>
      {menu.map((menu, _id) => {
        return (
            <a className="menuLink" href="google.com" key={_id}>{menu.name}</a>
        )
      })}
      </Menu>
    );
  }


export default HamburgerMenu;
