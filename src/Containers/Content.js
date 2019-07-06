import React, {Component} from 'react';
import Video from '../Components/Video';
import VideoExtended from '../Components/VideoExtended'
import { Route, Switch } from 'react-router-dom';
import '../css/Content.css'
import sanityClient from '../Client';


class Content extends Component {

  constructor(props) {
  super(props)
  this.state = {
    videoLoading: true,
    videoArray: [
    ]
  }
}
  componentDidMount() {
    const videoQuery = `*[_type == "video"]{
      date, clientWork, description, title, thumbnail, vimeoLink, teamMembers[]->{name}, client[]->{clientName}}
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
      <div className="contentDiv">
        <Switch>
          <Route path={`/Content/`} exact render={
              (props) => {
                return <Video {...props} videoArray={videoArray}/>
              }
            }
            />
          <Route path={`/Content/:videoId`} render={
              (props) => {
                return <VideoExtended {...props} />
              }
            }
         />
      </Switch>
      </div>

    )
  }



}

export default Content;
