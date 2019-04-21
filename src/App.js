import React, { Component } from 'react';
import './App.css';
import imageUrlBuilder from '@sanity/image-url'
import Header from './Components/Header'

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
      _id: '',
      name: '',
      companyInfo: '',
      image: ''
    },
    header: {
      _id: '',
      logo: '',
      menu: [],
      phone: ''
    }
  }
}

  componentDidMount() {
    const footerQuery = `*[_type == "footer"] {
      _id,
      name,
      companyInfo,
      image,
    }`
    client.fetch(footerQuery).then(footer => {

      footer.forEach(footer => {
        this.setState({
          footer: footer
        })
      })
    })
    const headerQuery = `*[_type == "header"] {
      _id,
      logo,
      menu,
      phone,
    }`
    client.fetch(headerQuery).then(header => {

      header.forEach(header => {
        this.setState({
          header: header
        })
      })
    })
  }





  render() {
      let { footer, header } = this.state;
    return (
      <div className="App">
        <p>{footer.companyInfo}</p>
        <p>{header.phone}</p>
        <img src={urlFor(header.logo).width(500).url()}/>
      </div>
    )
  }
}

export default App;
