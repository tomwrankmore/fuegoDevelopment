import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import sanityClient from './Client';
import Header from './Components/Header';
import Home from './Containers/Home'
import About from './Containers/About';
import Content from './Containers/Content'
import Client from './Containers/Client'
import ShowreelCont from './Containers/Showreel'



class App extends Component {

  constructor(props) {
  super(props)
  this.state = {
    header: {
      menu: [],
      logo: '',
      phone: '',
      email: ''
    },
    loading: {
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
      let { header, loading, menuOpen} = this.state;
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
                      component={ShowreelCont}

                      />
                      <Route
                        path={'/Home'}
                        component={Home}

                        />
            </Switch>


          </div>


        </BrowserRouter>


       )




  }
}

export default App;
