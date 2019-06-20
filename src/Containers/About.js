import React, { Component } from 'react'
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';
import '../css/About.css'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

class About extends Component {
  constructor(props) {
  super(props)
  this.state = {
    aboutLoading: true,
    about: {},
  }
}


componentDidMount(){
  const aboutQuery = `*[_type == "about"] {
    header, desc, image, teamMembers[]->{name}
  }`
  sanityClient.fetch(aboutQuery).then(about => {

    about.forEach(about => {

      this.setState(prevState =>({
        about: about
      }))
    })
    this.setState(prevState => ({
          aboutLoading:  false

  }))

  })
}

  render() {

    let { about, aboutLoading} = this.state

    return (
        aboutLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <div>
      <h2 className="aboutHeader"> {about.header}</h2>
      <div className="aboutSection">
      <div className="aboutImage">
        <img alt="about Fuego Films"  src={urlFor(about.image).width(1000).url()} /></div>
        <div className="aboutDesc">
        <p >{about.desc} </p>
        <div className="aboutTeam">
        <p>Team Members: </p>
          {about.teamMembers.map((teamMember, id) => {
              return( <p key={id}>{ `${teamMember.name}, `}</p>)
            })}
        </div>
        </div>
      </div>


      </div>
    )
  }



}

export default About;
