import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'

const StyledFooter = styled.footer`
    background: white;
    position: fixed;
    z-index: -1;
    width: 100vw;
    text-align: center;
    bottom: 0;
    padding: 1rem 0;
`

const FooterDesc = styled.p`
    font-size: 10px;
    margin: 0;
    padding: 0;
    color: black;
  `

const Footer = () => {
  const [footer, setFooter] = useState([])


useEffect(() => {
const footerQuery = `*[_type == "footer"]`
sanityClient.fetch(footerQuery).then(footer => {
setFooter(footer)
  footer.forEach(footer => {
    setFooter(footer)
  })
})

}, [])

    return (
       <StyledFooter>
        <FooterDesc>{footer.companyInfo}</FooterDesc>
       </StyledFooter>
    )
}

export default Footer
