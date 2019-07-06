import React, { Component } from 'react';
import sanityClient from '../Client';
import Slider from 'react-animated-slider';
import "../css/Home.css"
import 'react-animated-slider/build/horizontal.css';


class Home extends Component {

    constructor(props) {
    super(props)
    this.state = {
      homeLoading: true,
      home: [],
      settings: {
        autoplay: 3000,
        animateOut: console.log('hello')
      }
    }
  }

  componentDidMount() {
    const homeQuery = `*[_type == "home"] `
    sanityClient.fetch(homeQuery).then(home => {

      home.forEach(homel => {
        this.setState({
          home: home
        })
      })
      this.setState(prevState => ({
        homeLoading: false
    }))


    })

  }
  render() {
    let { home, homeLoading, settings } = this.state

    return (
      homeLoading ? <div  className=" AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :

      <div className="homeDivCont">
        <Slider 
        {...settings} >
            {
              home.map((homeVid, id) =>
              <div  className="iframeCont">
                 <iframe style={{width: '100vw'}} className="iframeVid" key={id} title={homeVid.title} frameBorder="0" allow="autoplay; fullscreen" src={homeVid.vimeoLink}></iframe>
              </div>
                   
                  


              )
            }

        </Slider>
      </div>
    )
  }

}

export default Home;
