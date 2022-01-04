import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import colors from './style-variables/colors';
// import Header from './components/new-header/index';
import NewHeader from './components/new-header';
import Footer from './components/footer/footer-component'
import Spinner from './components/spinner/spinner.component';
import VideoContainer from './components/video-extended-container/video-extended-container.component';
import DirectorProfile from './components/director-profile/director-profile';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import ContentContextProvider from './store/ContentContext';
import DirectorsContextProvider from './store/DirectorsContext';

import HomeContextProvider from './store/HomeContext';

const OuterContainer = styled.div` 
    background-color: ${colors.background};
    color: ${colors.text};
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-bottom: 45px;
`

const HomePage = lazy(() => import('./pages/home/home.component'));
const AboutPage = lazy(() => import('./pages/about/about.component'));
const ContentPage = lazy(() => import('./pages/content/content.component'));
const DirectorsPage = lazy(() => import('./pages/directors/directors.component'));

const App = () => (
    <OuterContainer id="outer-container" className="App">
        <NewHeader />
        <div id="page-wrap">
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <HomeContextProvider>
                            <Route path="/" component={HomePage} exact />
                            <Route path="/home" component={HomePage} />
                        </HomeContextProvider>
                        <Route path="/about" component={AboutPage} />
                        <ContentContextProvider>
                            <Route exact path="/content" component={ContentPage} />
                            <Switch>
                                <Route path="/content/:videoId" children={VideoContainer} />
                            </Switch>
                        </ContentContextProvider>
                        <DirectorsContextProvider>
                            <Route exact path="/directors" component={DirectorsPage} />
                            <Switch>
                                <Route path="/directors/:director" children={DirectorProfile} />
                            </Switch>
                        </DirectorsContextProvider>
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
        <Footer />
    </OuterContainer>
);

export default App;
