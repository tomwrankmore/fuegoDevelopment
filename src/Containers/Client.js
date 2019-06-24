import React, {Component} from 'react';
import '../css/VideoExtended.css';
import { Link } from 'react-router-dom';
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}


class Client extends Component {

  constructor(props) {
  super(props)
  this.state = {
    videoLoading: true,
    videoArray:[],
    video: '',
    clientName: '',
    clientResult: [],
    match: props.match.url.slice(8)
  }
}

componentDidMount() {

  const videoQuery = `*[_type == "video"]{
    date, description, title, thumbnail, vimeoLink, teamMembers[]->{name}, client[]->{clientName, description}}
  `
  sanityClient.fetch(videoQuery).then(video => {

    video.forEach(video => {
        this.state.videoArray.push(video)
    })
    const pos = this.state.videoArray.filter(video => video.title === this.state.match)

    if(pos.length > 0) {

      const videoResult = this.state.videoArray.filter(video => video.title === this.state.match)
      const client = videoResult[0].client[0].clientName
      const clientArray = this.state.videoArray.filter(video => video.client[0].clientName === client)
      const clientResult = clientArray.filter(video =>
      video.title !== this.state.match)
      console.log(clientResult)
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
  return (
    videoLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
      <div className="videoExtContainer">
         {video.map((video, id) => {
           return (
             <div key={id} className="videoExt">
             <div className="videoExtVideo">
               <h2>{video.title}</h2>
                 {video.client.map((client, id) => {
                     return( <p key={id}> {client.clientName} </p>)
                   })}
                 <iframe title={video.title} frameBorder="0" allow="autoplay; fullscreen" src={video.vimeoLink}></iframe>
             </div>
             <div  className="videoExtDesc">
               <h2>About</h2>
               {video.client.map((client, id) => {
                   return( <p key={id}> {client.description} </p>)
                 })}

                 <div className="videoExtTeam">
                   <p style={{fontWeight: 'bold'}}>Team Members:</p>
                   {video.teamMembers.map((teamMember, id) => {
                       return( <p key={id}> {teamMember.name} </p>)
                     })}</div>

                  <div>

                     <h3>{`More work with ${video.client[0].clientName}`}</h3>
                     <div className="moreByClient">
                       {
                         clientResult.map((clientVideo, id) => {
                            return (
                               clientVideo.title !== video.title ?
                              <div key={id} className="clientDiv" >
                                <Link onClick={() => {this.state.video.push(clientVideo)
                                    this.state.video.shift()
                                  }} className="videoLink" to={`/Content/${clientVideo.title}`}>
                                  <img alt="client img" className="clientImg" src={urlFor(clientVideo.thumbnail).url()}/>
                                  <div className="clientHover">
                                    <p>{clientVideo.title}</p>
                                  </div>
                                </Link>
                              </div> : <div className="null"key={id}></div>
                            )
                    })}

                     </div>




                  </div>
             </div>
           </div>
           )
         })}
       </div>




  )
}



}


export default Client
