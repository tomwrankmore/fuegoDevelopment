import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import sanityClient from './Client';
import Header from './Components/Header';
import Home from './Containers/Home'
import About from './Containers/About';
import Content from './Containers/Content'

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

   loading: {
     footerLoading: true,
     headerLoading: true,

     showreelLoading: true,
     aboutLoading: true
   },
   about: {},
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
      this.setState(prevState => ({
        loading: {
            ...prevState.loading,
            footerLoading:false
        }
    }))
    })
    const showQuery = `*[_type == "showreel"] `
    sanityClient.fetch(showQuery).then(showreel => {

      showreel.forEach(showreel => {
        this.setState({
          showreel: showreel
        })
      })
      this.setState(prevState => ({
        loading: {
            ...prevState.loading,
            showreelLoading:false
        }
    }))


    })
    const aboutQuery = `*[_type == "about"] {
      header, desc, image, teamMembers[]->{name}
    }`
    sanityClient.fetch(aboutQuery).then(about => {

      about.forEach(about => {
        this.setState({
          about: about
        })
      })
      this.setState(prevState => ({
        loading: {
            ...prevState.loading,
            aboutLoading:  false
        }
    }))

    })
    const headerQuery = `*[_type == "header"]`
    sanityClient.fetch(headerQuery).then(header => {

      header.forEach(header => {

        this.setState({
          header: header
        })
      })
      this.setState(prevState => ({
        loading: {
            ...prevState.loading,
            headerLoading: false
        }
    }))
    })
  }


  render() {

      let { footer, header, loading,  route, showreel, about} = this.state;
      return (
        Object.keys(loading).every(function(k){ return loading[k] })
        ?
        <div  className="App AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        :
        <div className="App">
        <Header onRouteChange={this.onRouteChange} menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
        {
          route === 'Showreel' ?  <Home showreel={showreel}/>
        : ( route === 'About' ?  <About about={about} />


    : <Content  />

        )
      }
        <p className="footer">{footer.companyInfo}</p>
      </div>
       )




  }
}

export default App;
