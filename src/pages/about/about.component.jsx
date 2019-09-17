import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'

import Footer from '../../components/footer/footer-component'
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


const About = () => {
  const [about, setAbout] = useState({
    header: '',
    desc: '',
    descHeader: '',
    teamMembers: []
  })
  useEffect(() => {
    const aboutQuery = `*[_type == "about"] {
      header, desc, descHeader, teamMembers[]->{name}
    }`
    sanityClient.fetch(aboutQuery).then(about => {

      about.forEach(about => {
       setAbout(about)
      })
    })
  }, [])
 

    return (
       
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
            <Footer />
        </div>
      </AboutWrapper>
    )
}

export default About
