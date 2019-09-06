import React, { Component } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import imageUrlBuilder from '@sanity/image-url'


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;`

const AboutHeader = styled.h1`
  @media screen and (max-width: 981px) {
    font-size: 22px;
} 
`

const AboutSection = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: auto;
  margin-bottom: 5px;
  min-height: 65vh;

  @media screen and (max-width: 981px) {
    width: 600px;
    grid-template-columns: 1fr;
    grid-gap: 1.8em;
  }`

const AboutImgContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 981px) {
    order: 2;
  }`  

const AboutImg = styled.img`
`

const AboutDescContainer = styled.div`
  text-align: left;
  width: 80%;
  @media screen and (max-width: 981px) {
    order: 1;
    text-align: center;
    width: 100%;

    h2 {
      font-size: 20px
    }
    p {
      font-size: 14px
    }
  }`

const AboutDesc = styled.p`
  @media screen and (max-width: 981px) {
    padding: 0 15%;
  }
`  

const AboutTeamContainer = styled.div`
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content:flex-start;
  flex-flow: row wrap;

  * {
    padding: 0;
    margin: 2px 0;
    margin-right: 5px;
  }

  @media screen and (max-width: 981px) {
    padding: 0 15%;
  }
  
  `
const Footer = styled.p`
  position: relative;
  bottom: 0;
  font-size: 10px;
  width: 100%;`

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
      <AboutWrapper>
        <div>
          <AboutHeader>{about.header}</AboutHeader>
            <AboutSection>
              <AboutImgContainer>
                <AboutImg alt="about Fuego Films"  src={urlFor(about.image).width(500).url()} />
              </AboutImgContainer>
                <AboutDescContainer>
                  <h2 style={{margin: '0'}}>{about.descHeader}</h2>
                  <AboutDesc>{about.desc} </AboutDesc>
                  <AboutTeamContainer>
                  <p style={{fontWeight:'bold'}}>Team Members: </p>
                    {about.teamMembers.map((teamMember, id) => {
                        return( <p key={id}>{ `${teamMember.name}, `}</p>)
                      })}
                  </AboutTeamContainer>
                </AboutDescContainer>
            </AboutSection>
            <Footer>{footer.companyInfo}</Footer>
        </div>
      </AboutWrapper>
    )
  }



}

export default About
