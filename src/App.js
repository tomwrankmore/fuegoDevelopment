import React, { Component } from 'react';
import './App.css';
import sanityClient from './Client'
import Header from './Components/Header'


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
   videosArray : [
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
          this.state.videosArray.push(video)
      })
        this.setState({isLoading: false})
    })

  }


  render() {

      let { footer, header, videosArray } = this.state;
      const videos = (
        <div>
          {videosArray.map((video, _id) => {
            return (
              <div key={_id}>
                <h3>{video.title}</h3>
                  <iframe title={video.title} src={video.vimeoLink}/>
                  <p>{video.description}</p>
              </div>

            )
          })}
        </div>
      )

      return (
        this.state.isLoading ? <div className="App"><p>Loading</p></div> : <div className="App">
        <Header menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
          <p>{footer.companyInfo}</p>
          {videos}
        </div> )




  }
}

export default App;
