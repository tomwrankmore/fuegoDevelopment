import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './carousel.styles.scss'
import sanityClient from '../../Client'
import imageUrlBuilder from '@sanity/image-url'


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}
const ClientSlideContainer = styled.div`
  margin: 0;
  padding: 50px 0;

  *:focus {
    outline: 0
  }
`

const ClientLink = styled(Link)`
  width: 200px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: black;
  `

const LinkTitle = styled.p`
`

const ClientLinkImg = styled.img`
  max-width:150px;
  width: 150px;
  height: auto;
  color: black;
`

class ClientSlider extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
          videoLoading: true,
          videoArray:[],
          video: '',
          clientName: '',
          clientResult: [],
          match: window.location.href.slice(8),
      
        }
      }
componentDidMount() {
    const videoQuery = `*[_type == "video" && references('${this.props.clientId}')]{
      date, description, title, thumbnail, vimeoLink, teamMembers[]->{name}, client[]->{clientName, description}}
    `
    sanityClient.fetch(videoQuery).then(video => {
      
      video.forEach(video => {
      
        console.log(video)
          this.state.clientResult.push(video)
          this.setState({
            videoLoading: false
          })
      })
      const pos = this.state.videoArray.filter(video => video.title === this.state.match)
  
      if(pos.length > 0) {
  
        const videoResult = this.state.videoArray.filter(video => video.title === this.state.match)
        const client = videoResult[0].client[0].clientName
        const clientArray = this.state.videoArray.filter(video => video.client[0].clientName === client)
      
  
        this.setState({
          clientName: client,
          clientResult: clientArray,
          video: videoResult,
          videoLoading: false
      })
  }})
  
  }
  render() {
    let { video, videoLoading, clientResult} = this.state
    const handleOnDragStart = e => e.preventDefault()
    const settings = {
      className: 'center',
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 2,
         centerPadding: "40px",
        speed: 500,
        centerMode: true,
        variableWidth: true,
        slidesToScroll: 1,
  
      }
      return (
        videoLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
        <div style={{width: "500px"}}><Slider {...settings}>
        {
          clientResult.map((clientVideo, id) => {
            return (
              <ClientSlideContainer onDragStart={handleOnDragStart} key={id}>
                <ClientLink to={`/content/${clientVideo.title}`}>
                  <LinkTitle>{clientVideo.title}</LinkTitle>
                  <ClientLinkImg alt="client img" src={urlFor(clientVideo.thumbnail).url()}/>
                </ClientLink>
              </ClientSlideContainer>
            )
        })}
      </Slider>
      </div>
      )
    }
}

export default ClientSlider