import React from 'react';
import sanityClient from '../Client';
import HamburgerMenu from './Menu'
import imageUrlBuilder from '@sanity/image-url';
import '../css/Header.css'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}


const Header = ({ email, phone, logo, menu, onRouteChange}) => {

  return (

    <div className="header">
      <div className="logoDiv">
          <a className="logoLink" href='google.com'><img alt="Logo" src={urlFor(logo).width(500).url()}/></a>
      </div>
      <div className="space"></div>
      <HamburgerMenu onRouteChange={onRouteChange} menu={menu}/>
    </div>
  )
}


export default Header
