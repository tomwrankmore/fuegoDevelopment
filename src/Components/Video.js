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

const videoQuery = `*[_type == "video"]{vimeoLink, title, date, client[0...100]->, teamMembers[0...100]->
}
`
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

      loaded && !this.props.isLoaded ? <div className="videoContainer">

            {videoArray.map((video, id) => {
              console.log(videoArray)
              return (
                <div key={id} className="video">
                  <h3>{video.title}</h3>
                    <p>{`client:${video.client.map((client, id) => {
                        return ' ' + client.clientName
                      })}`}</p>
                  <iframe title={id} src={video.vimeoLink}></iframe>
                  <p>{`team:${video.teamMembers.map((teamMember, id) => {
                      return ' ' + teamMember.name
                    })}`}</p>
                </div>
              )
            })}

      </div> : <p>loading</p>
    )
  }

}


export default Video
