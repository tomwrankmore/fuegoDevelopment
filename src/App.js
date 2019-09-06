import React, { Component, lazy, Suspense } from 'react'
import {Route, Switch } from 'react-router-dom'
import './App.css'
import sanityClient from './Client'
import Header from './components/header/header.component'
import Spinner from './components/spinner/spinner.component'
import VideoExtended from './components/video-extended/video-extended.component'

const HomePage = lazy(() => import('./pages/home/home.component'))
const AboutPage = lazy(() => import('./pages/about/about.component'))
const ContentPage = lazy(() => import('./pages/content/content.component'))
const ClientPage = lazy(() => import('./pages/client/client.component'))
const ShowreelPage = lazy(() => import('./pages/showreel/showreel.component'))
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
      let { header, menuOpen} = this.state
      return (
          <div className="App">
            <Header menuOpen={menuOpen} handleStateChange={this.handleStateChange.bind(this)} closeMenu={this.closeMenu.bind(this)} menu={header.menu} logo={header.logo} email={header.email} phone={header.phone}/>
            <Switch>
              <Suspense fallback={<Spinner/>}>
                <Route
                  path={'/'}
                  component={HomePage}
                  exact/>
                <Route
                  path={'/about'}
                  component={AboutPage}/>
                <Route exact
                  path={'/content'}
                  component={ContentPage}/>
                <Route
                  path={`/client/:videoId`}
                  render={
                      (props) => {
                        return <ClientPage {...props} />
                      }
                    } />
                <Route path={`/content/:videoId`} render={
                      (props) => {
                        return <VideoExtended {...props} />
                      }
                    }
                />
                <Route
                  path={'/showreel'}
                  component={ShowreelPage}/>
                <Route
                  path={'/home'}
                  component={HomePage}/>
              </Suspense>  
            </Switch>


          </div>
       )




  }
}

export default App
