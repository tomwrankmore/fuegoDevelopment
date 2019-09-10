import React, { lazy, Suspense } from 'react'
import {Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/header/header.component'
import Spinner from './components/spinner/spinner.component'
import VideoExtended from './components/video-extended/video-extended.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

const HomePage = lazy(() => import('./pages/home/home.component'))
const AboutPage = lazy(() => import('./pages/about/about.component'))
const ContentPage = lazy(() => import('./pages/content/content.component'))
const ClientPage = lazy(() => import('./pages/client/client.component'))

const App = () => {

      return (
          <div className="App">
            <Header />
            <Switch>
              <ErrorBoundary>
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
                    path={'/home'}
                    component={HomePage}/>
                </Suspense>  
              </ErrorBoundary>
            </Switch>


          </div>
       )
}

export default App
