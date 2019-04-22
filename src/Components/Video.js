import React, {Component} from 'react';
import sanityClient from '../Client';
import '../css/Video.css'

class Video extends Component {
  constructor(props) {
  super(props)
  this.state = {
   videoArray : [
   ],
   loaded: false
  }
}
componentDidMount() {

const videoQuery = `*[_type == "video"]`
sanityClient.fetch(videoQuery).then(video => {

  video.forEach(video => {

      this.state.videoArray.push(video)

  })
  this.setState({loaded: true})
})
}

    render(){
      let { videoArray, loaded} = this.state;
    return (
      loaded ? <div className="videoContainer">
            {videoArray.map((video, _id) => {
              console.log(videoArray)
              return (
                <div key={_id} className="video">
                  <h3>{video.title}</h3>

                  <iframe title={_id} src={video.vimeoLink}></iframe>
                </div>
              )
            })}

      </div> : <p>loading</p>
    )
  }

}


export default Video
