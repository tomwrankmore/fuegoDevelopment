import React, {Component} from 'react';
import '../css/VideoExtended.css';
import { Link } from 'react-router-dom';
import sanityClient from '../Client';
import imageUrlBuilder from '@sanity/image-url';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Client.css';


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
    match: props.match.url.slice(8),

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
  const handleOnDragStart = e => e.preventDefault()
  const settings = {
    className: 'center',
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 2,
       centerPadding: "40px",
      speed: 500,
      centerMode: true,
       variableWidth: true,
      slidesToScroll: 1,

    };
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
                        <h3>{`More work with ${video.client[0].clientName}`}</h3>
                   <div className="clientMoreDiv">
                       <Slider {...settings}>
                         {
                           clientResult.map((clientVideo, id) => {
                              return (
                                <div onDragStart={handleOnDragStart} className="clientSlideDiv" key={id}>
                                  <Link  onClick={() => {this.state.video.push(clientVideo)
                                      this.state.video.shift()
                                    }} className="clientLink" to={`/Client/${clientVideo.title}`}>
                                    <p className="clientLinkTitle">{clientVideo.title}</p>
                                    <img alt="client img" className="clientImg" src={urlFor(clientVideo.thumbnail).url()}/>

                                  </Link>
                                </div>
                              )
                         })}
                       </Slider>









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
