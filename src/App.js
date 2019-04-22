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

    const clientQuery = `*[_type == "client"]`
    sanityClient.fetch(clientQuery).then(client => {

      client.forEach(client => {

          this.state.client.push(client)
      })

    })
    const teamQuery = `*[_type == "teamMember"]`
    sanityClient.fetch(teamQuery).then(team => {

      team.forEach(team => {

          this.state.team.push(team)
      })

    })
      this.setState({isLoading: false})

  }


  render() {

      let { footer, header, videoArray, client, team } = this.state;


      return (
        this.state.isLoading ? <div className="App"><p>Loading</p></div> : <div className="App">
        <Header menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
          <p>{footer.companyInfo}</p>
        <Video />
        </div> )




  }
}

export default App;
