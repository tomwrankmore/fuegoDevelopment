import React from 'react';
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';
import '../css/Header.css'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}


const Header = ({email, phone, logo, menu}) => {

  return (
    <div className="header">
      <div className="contact">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
        <a href='#'><img alt="Logo" src={urlFor(logo).width(500).url()}/></a>
        <ul className="menu">
          {menu.map((menu, _id) => {
            return (
                <li><a href="#">{menu.name}</a></li>
            )
          })}
        </ul>
    </div>
  )
}


export default Header
