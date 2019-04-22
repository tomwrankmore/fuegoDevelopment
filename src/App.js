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
   videoArray : [
   ],
   isLoading: true
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
    })
    const headerQuery = `*[_type == "header"] `
    sanityClient.fetch(headerQuery).then(header => {

      header.forEach(header => {
        this.setState({
          header: header
        })
      })
    })
    const videoQuery = `*[_type == "video"]`
    sanityClient.fetch(videoQuery).then(video => {

      video.forEach(video => {
          console.log(video.client[0])
          this.state.videoArray.push(video)
      })
        this.setState({isLoading: false})
    })

  }


  render() {

      let { footer, header, videoArray } = this.state;


      return (
        this.state.isLoading ? <div className="App"><p>Loading</p></div> : <div className="App">
        <Header menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
          <p>{footer.companyInfo}</p>
        <Video videoArray={videoArray}/>
        </div> )




  }
}

export default App;
