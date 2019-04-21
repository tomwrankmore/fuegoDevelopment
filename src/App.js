import React, { Component } from 'react';
import './App.css';
import imageUrlBuilder from '@sanity/image-url'
// import Header from './Components/Header'

const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '56tmjwkw',
  dataset: 'production',
  token: 'skh9pxXAxk7dau4zrnpWG4fOlRrasncfIWDpwo8Tfs5QyyX02gSEcdVxRAdtvstLl8NN7tUjLEJdpaHOPErzC608zZow1twzG9FfHp2Te25qTrPcEkojpnl3F4K8PNXrsG46kNWuDMHBwJsQZA3lYh48IlapmTAXP5365c5AgQgsU4jJABx0', // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})
const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}



class App extends Component {

  constructor(props) {
  super(props)
  this.state = {
    footer: {

    },
    header: {

    },
   videosArray : [
   ],
   isLoading: true
  }
}

  componentDidMount() {
    const footerQuery = `*[_type == "footer"] `
    client.fetch(footerQuery).then(footer => {

      footer.forEach(footer => {
        this.setState({
          footer: footer
        })
      })
    })
    const headerQuery = `*[_type == "header"] `
    client.fetch(headerQuery).then(header => {

      header.forEach(header => {
        this.setState({
          header: header
        })
      })
    })
    const videoQuery = `*[_type == "video"]`
    client.fetch(videoQuery).then(video => {

      video.forEach(video => {
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
          <p>{footer.companyInfo}</p>
          <p>{header.phone}</p>
          <img alt="Logo" src={urlFor(header.logo).width(500).url()}/>
          {videos}
        </div> )




  }
}

export default App;
