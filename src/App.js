import React, { Component } from 'react';
import './App.css';
import sanityClient from './Client'
import Header from './Components/Header'
import Video from './Components/Video'

class App extends Component {

  constructor(props) {
  super(props)
  this.state = {
    footer: {
      companyInfo: ''
    },
    header: {
      menu: [],
      logo: '',
      phone: '',
      email: ''
    },
   client : [

   ],
   team : [

   ],
   footerLoading: true,
   headerLoading: true,
   videoLoading: true,
   videoArray: [

   ],
   isOpen: false
  }
}

  componentDidMount() {

    const footerQuery = `*[_type == "footer"] `
    sanityClient.fetch(footerQuery).then(footer => {

      footer.forEach(footer => {
        this.setState({
          footer: footer
        })
      })
      this.setState({
        footerLoading: false
      })
    })
    const headerQuery = `*[_type == "header"] `
    sanityClient.fetch(headerQuery).then(header => {

      header.forEach(header => {

        this.setState({
          header: header
        })
      })
        this.setState({headerLoading: false})
    })

    const videoQuery = `*[_type == "video"]{
      date, description, title, vimeoLink, teamMembers[]->{name}, client[]->{clientName}}
    `
    sanityClient.fetch(videoQuery).then(video => {

      video.forEach(video => {

          this.state.videoArray.push(video)

      })
      this.setState({videoLoading: false})

    })


  }


  render() {

      let { footer, header, headerLoading, footerLoading, videoLoading, videoArray, isOpen} = this.state;

      return (
        headerLoading && footerLoading && videoLoading
        ?
        <div  className="App"><p>Loading</p> </div>
        :
        <div className="App">
        <Header isOpen={isOpen} menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
          <p>{footer.companyInfo}</p>
        <Video videoLoading={videoLoading} videoArray={videoArray} />
        </div> )




  }
}

export default App;
