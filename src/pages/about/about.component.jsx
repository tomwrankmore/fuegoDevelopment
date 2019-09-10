import React, { Component } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'


import ShowreelCont from '../../components/showreel-container/showreel-container.component'

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column
  width: 100%;`


const AboutDescContainer = styled.div`
  text-align: left;
  width: 60%;
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

const ShowreelContainer = styled.div`
  width: 1000px;
  overflow: hidden;`  

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
    header, desc, descHeader, teamMembers[]->{name}
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
                <ShowreelContainer>
                 <ShowreelCont />
                </ShowreelContainer>
               
            </AboutSection>
            <Footer>{footer.companyInfo}</Footer>
        </div>
      </AboutWrapper>
    )
  }



}

export default About
