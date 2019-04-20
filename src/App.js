import React, { Component } from 'react';
import './App.css';

const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '56tmjwkw',
  dataset: 'production',
  token: 'skh9pxXAxk7dau4zrnpWG4fOlRrasncfIWDpwo8Tfs5QyyX02gSEcdVxRAdtvstLl8NN7tUjLEJdpaHOPErzC608zZow1twzG9FfHp2Te25qTrPcEkojpnl3F4K8PNXrsG46kNWuDMHBwJsQZA3lYh48IlapmTAXP5365c5AgQgsU4jJABx0', // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
