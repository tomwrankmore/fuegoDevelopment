import React, {Component} from 'react';
import Video from '../Components/Video';
import VideoExtended from '../Components/VideoExtended'
import '../css/Content.css'
import sanityClient from '../Client';


class Content extends Component {

  constructor(props) {
  super(props)
  this.state = {
    video: '',
    videoLoading: true,
    videoArray: [
    ],
    videoFocus : ''
  }
}
  videoDisplay = (videoFocus) => {
    const results = this.state.videoArray.filter(video => video.title === videoFocus)
    this.setState({
      videoFocus: results
    })

  }

  componentDidMount() {
    const videoQuery = `*[_type == "video"]{
      date, description, title, thumbnail, vimeoLink, teamMembers[]->{name}, client[]->{clientName}}
    `
    sanityClient.fetch(videoQuery).then(video => {

      video.forEach(video => {

          this.state.videoArray.push(video)

      })
      this.setState(prevState => ({
        videoLoading: false
    }))

    })

  }

  render() {
    let { videoArray, videoLoading, videoFocus } = this.state
    return (
      videoLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      ( videoFocus === '' ?
      <div className="contentDiv">

     <Video selected={videoFocus} videoDisplay={this.videoDisplay} videoArray={videoArray}/>

     </div>
   : <div>
    <VideoExtended video={videoFocus} />
    </div> )
    )
  }



}

export default Content;
