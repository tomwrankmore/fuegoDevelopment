import React, { Component } from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import VideoImage from '../../components/video-image/video-image.component'

const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;`

const HomeCarousel = styled(Carousel)`
  overflow: hidden;
  height: auto;
  padding: 0;

  .slide iframe {
    margin: 0 !important;
    width: 100% !important;
    height: 100vh;
  }
  .carousel-slider .control-arrow {
    padding: 20px !important;
  }`



class Home extends Component {

    constructor(props) {
    super(props)
    this.state = {
      homeLoading: true,
      home: [],
      settings: {
        autoPlay: true,
        showThumbs: false,
        infiniteLoop: true,
        showStatus: false,
        transitionTime: 800,
      }
    }
  }

  componentDidMount() {
    const homeQuery = `*[_type == "video" && homeVideo]{
      clientWork, title, thumbnail, client[]->{clientName}}
     `
    sanityClient.fetch(homeQuery).then(home => {

      home.forEach(home => {
        this.state.home.push(home)
      })
      this.setState(prevState => ({
        homeLoading: false
    }))


    })

  }
  render() {
    let { home, homeLoading, settings } = this.state

    return (
      homeLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <HomeContainer>
        <HomeCarousel {...settings}>
            {
              home.map((homeVid, id) =>
              <div key={id}>
                 <VideoImage video={homeVid} />
              </div>
              )
            }

        </HomeCarousel>
      </HomeContainer>
    )
  }

}

export default Home
