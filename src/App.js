import React, { Component } from 'react';
import './App.css';
import sanityClient from './Client';
import Header from './Components/Header';
import Video from './Components/Video';
import Home from './Containers/Home'
import About from './Containers/About'

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
   showreelLoading: true,
   videoArray: [
   ],
   showreel: [],
   route: 'Showreel',

  }
}
  onRouteChange = (route) => {
this.setState({route: route});

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
    const showQuery = `*[_type == "showreel"] `
    sanityClient.fetch(showQuery).then(showreel => {

      showreel.forEach(showreel => {
        this.setState({
          showreel: showreel
        })
      })
      this.setState({
        showreelLoading: false
      })

    })
    const headerQuery = `*[_type == "header"]`
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

      let { footer, header, headerLoading, footerLoading, videoLoading, showreelLoading, videoArray, route, showreel} = this.state;

      return (
      showreelLoading && headerLoading && footerLoading && videoLoading
        ?
        <div  className="App"><p>Loading</p> </div>
        :
        <div className="App">
        <Header onRouteChange={this.onRouteChange} menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
        {
          route === 'Showreel' ?  <Home showreel={showreel}/>
        : ( route === 'About' ?  <About showreel={showreel} />
        : <p>hello</p>

        )
      }
        <p className="footer">{footer.companyInfo}</p>
      </div>
       )




  }
}

export default App;
