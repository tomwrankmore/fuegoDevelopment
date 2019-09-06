import React, {Component} from 'react'
import styled from 'styled-components'
import sanityClient from '../../Client'
import VideoImage from '../../components/video-image/video-image.component'

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  `

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  width: 85%;
  margin-top: 5%;
  grid-gap: 15px;
 `

class Content extends Component {

  constructor(props) {
  super(props)
  this.state = {
    videoLoading: true,
    videoArray: [
    ],
    clientWorkArray: [

    ]
  }
}
  componentDidMount() {
    const videoQuery = `*[_type == "video"]{
     clientWork, title, thumbnail, client[]->{clientName}}
    `
    sanityClient.fetch(videoQuery).then(video => {
      video.forEach(video => {
         
          if(this.state.videoArray.length <= 0) {
            this.state.videoArray.push(video)
          }
         else if (video.clientWork) {
          
           if(this.state.videoArray.filter(e => e.client[0].clientName === video.client[0].clientName).length > 0) {
            
           } else {
            this.state.videoArray.push(video)
           }
           
          }
          else {
            this.state.videoArray.push(video)
          }

      })
      this.setState(prevState => ({
        videoLoading: false
    }))
    })
  }

  render() {

    let { videoArray, videoLoading } = this.state
    return (
      videoLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <ContentContainer>
        <h1>Content</h1>
        <VideoContainer>
        {
              videoArray.map((contentVid, id) =>
              <div key={id}>
                 <VideoImage video={contentVid} />
              </div>
              )
            }
        </VideoContainer>
      </ContentContainer>

    )
  }



}

export default Content
