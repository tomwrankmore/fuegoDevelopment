import React, {Component} from 'react';
import '../css/VideoExtended.css';
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}
class VideoExtended extends Component {

  constructor(props) {
  super(props)
  this.state = {
    videoLoading: true,
    video: '',
    match: props.match.url.slice(9)
  }
}

componentDidMount() {

  const videoQuery = `*[_type == "video" && title == "${this.state.match}"]{
    date, description, title, vimeoLink, bts, teamMembers[]->{name}, client[]->{clientName}}
  `
  sanityClient.fetch(videoQuery).then(video => {
    console.log(video)
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
  let { video, videoLoading} = this.state
  return (
    videoLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <div className="videoExtContainer">
             <div className="videoExt">
             <div className="videoExtVideo">
               <h2>{video.title}</h2>
                 {video.client.map((client, id) => {
                     return( <p key={id}> {client.clientName} </p>)
                   })}
                 <iframe title={video.title} frameBorder="0" allow="autoplay; fullscreen" src={video.vimeoLink}></iframe>
             </div>
             <div  className="videoExtDesc">
               <h2>About</h2>
                 <p className="videoExtDescP">{video.description}</p>
                 <div className="videoExtTeam">
                   <p style={{fontWeight: 'bold'}}>Team Members:</p>
                   {video.teamMembers.map((teamMember, id) => {
                       return( <p key={id}> {teamMember.name} </p>)
                     })}</div>

             </div>
             
           </div>
           <div className="bts">
               <h2>
                 Behind the Scenes
               </h2>
           {video.bts.length > 0 ? <div className="bts-container">
            {video.bts.map((bts, id) => {
              return (
               <div className="bts-img"><img key={id} alt="BTS" src={urlFor(bts).url()} /></div> 
              )
            })}
           </div> :
            <div></div>}
          </div>
       </div>
       




  )
}



}


export default VideoExtended
