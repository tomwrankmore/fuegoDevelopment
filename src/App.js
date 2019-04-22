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

      this.setState({isLoading: false})

  }


  render() {

      let { footer, header} = this.state;


      return (
        this.state.isLoading ? <div className="App"><p>Loading</p></div> : <div className="App">
        <Header menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
          <p>{footer.companyInfo}</p>
        <Video isLoaded={this.state.isLoaded} />
        </div> )




  }
}

export default App;
