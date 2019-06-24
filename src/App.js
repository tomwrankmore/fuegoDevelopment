import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import sanityClient from './Client';
import Header from './Components/Header';
import Home from './Containers/Home'
import About from './Containers/About';
import Content from './Containers/Content'
import Client from './Containers/Client'




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
    loading: {
     footerLoading: true,
     headerLoading: true
   },
   menuOpen: false
  }
}

  handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
      this.setState({menuOpen: false})
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
      let { footer, header, loading, menuOpen} = this.state;
      return (
        Object.keys(loading).every(function(k){ return loading[k] })
        ?
        <div  className="App AppLoading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        :
        <BrowserRouter>
          <div className="App">
            <Header menuOpen={menuOpen} handleStateChange={this.handleStateChange.bind(this)} closeMenu={this.closeMenu.bind(this)} menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
            <Switch>
              <Route
                path={'/'}
                component={Home}
                exact
                />
                <Route
                  path={'/About'}
                  component={About}

                  />
                  <Route
                    path={'/Content'}
                    component={Content}
                    />
                    <Route
                      path={`/Client/:clientId`}
                      render={
                          (props) => {
                            return <Client {...props} />
                          }
                        }

                      />
                    <Route
                      path={'/Showreel'}
                      component={Home}

                      />
            </Switch>

            <p className="footer">{footer.companyInfo}</p>
          </div>


        </BrowserRouter>


       )




  }
}

export default App;
