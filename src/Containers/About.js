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
    footer: {
      companyInfo: ''
    },
    footerLoading: true
  }
}


componentDidMount(){

  const aboutQuery = `*[_type == "about"] {
    header, desc, descHeader, image, teamMembers[]->{name}
  }`
  sanityClient.fetch(aboutQuery).then(about => {

    about.forEach(about => {

      this.setState({
        about: about
      })
    })
    this.setState(prevState => ({
      aboutLoading: false
  }))

  })

  const footerQuery = `*[_type == "footer"] `
  sanityClient.fetch(footerQuery).then(footer => {

    footer.forEach(footer => {
      this.setState({
        footer: footer
      })
    })
    this.setState(prevState => ({
      loading: {
          ...prevState.loading,
          footerLoading:false
      }
  }))
  })
}

  render() {

    let { about, aboutLoading, footer, footerLoading} = this.state
    return (
        aboutLoading && footerLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <div className="About">
        <div>
          <h1 className="aboutHeader"> {about.header}</h1>
          <div className="aboutSection">
          <div className="aboutImage">
            <img alt="about Fuego Films"  src={urlFor(about.image).width(1000).url()} /></div>
            <div className="aboutDesc">
              <h2 style={{margin: '0'}}>{about.descHeader}</h2>
            <p className="aboutDescP">{about.desc} </p>
            <div className="aboutTeam">
            <p style={{fontWeight:'bold'}}>Team Members: </p>
              {about.teamMembers.map((teamMember, id) => {
                  return( <p key={id}>{ `${teamMember.name}, `}</p>)
                })}
            </div>
            </div>
          </div>

                  <p className="footer">{footer.companyInfo}</p>
        </div>

      </div>
    )
  }



}

export default About;
