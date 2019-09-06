import React, {Component} from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import ClientSlider from '../carousel/carousel.component'
import Client from '../../Client'
import BTS from '../bts/bts.component'



const VideoOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column wrap;`

const VideoInnerWrapper = styled.div`
  display: grid;
  grid-gap: 5%;
  grid-template-columns:1.5fr 1fr ;
  width: 90%;`

const VideoContainer = styled.div`
  min-width: 100%;
  position: relative;
  
  iframe {
    width: 100%;
    height: 350px;
  }`

const VideoTitle = styled.h2``

const VideoDescContainer = styled.div`
  text-align: left;
  margin-top: 50px;`

const VideoDesc = styled.p`
  padding-right: 25%;`  

const Team = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 85%;
  
  * {
    padding: 0;
    margin: 2px 0;
    margin-right: 5px; 
  }`



class VideoExtended extends Component {

  constructor(props) {
  super(props)
  this.state = {
    videoLoading: true,
    video: '',
  }
}

componentDidMount() {
  console.log(this.props.match)

  const videoQuery = `*[_type == "video" && title == "${this.props.match.params.videoId}"]{
    date, description, title, vimeoLink, bts, teamMembers[]->{name}, client[]->{clientName}}
  `
  sanityClient.fetch(videoQuery).then(video => {
    video.forEach(video => {
        this.setState({
          video: video
        })
    })
      this.setState({
        videoLoading: false
    })
  })

}

render() {
  let { video, videoLoading } = this.state
  console.log(video)
  return (
    videoLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <VideoOuterWrapper>
             <VideoInnerWrapper>
             <VideoContainer>
               <VideoTitle>{video.title}</VideoTitle>
                 {video.client.map((client, id) => {
                     return( <p key={id}> {client.clientName} </p>)
                   })}
                 <iframe title={video.title} frameBorder="0" allow="autoplay fullscreen" src={`https://player.vimeo.com/video/${video.vimeoLink}`}></iframe>
             </VideoContainer>
             <VideoDescContainer>
               <VideoTitle>About</VideoTitle>
                 <VideoDesc>{video.description}</VideoDesc>
                 <Team>
                   <p style={{fontWeight: 'bold'}}>Team Members:</p>
                   {video.teamMembers.map((teamMember, id) => {
                       return( <p key={id}> {teamMember.name} </p>)
                     })}</Team>

             </VideoDescContainer>
           <ClientSlider />
           </VideoInnerWrapper>
           <BTS video={video} />
           
       </VideoOuterWrapper>
       




  )
}



}


export default VideoExtended
