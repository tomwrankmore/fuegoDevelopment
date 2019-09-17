import React, { useState, useEffect} from 'react'
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
  .carousel.carousel-slider .control-arrow:hover {
    background: none;
  }`

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



const Home = () => {
    const [home, setHome] = useState([])
  useEffect(() => {
    const homeQuery = `*[_type == "video" && homeVideo]{
      clientWork, title, thumbnail, client[]->{clientName}}
     `
    sanityClient.fetch(homeQuery).then(home => {
      const HomeArray = []
      home.forEach(home => {
        HomeArray.push(home)
      })
      setHome(HomeArray)
    })
  }, [])

    const settings = {
      autoPlay: true,
      showThumbs: false,
      infiniteLoop: true,
      showStatus: false,
      transitionTime: 800,
    }
    return (

      <HomeContainer>
        <HomeCarousel {...settings}>
            {
              home.map((homeVid, id) =>
              <div key={id}>
                 <VideoImage home={true} video={homeVid} />
              </div>
              )
            }
        </HomeCarousel>
      </HomeContainer>
    )

}

export default Home
