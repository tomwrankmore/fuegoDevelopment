import React, { useContext } from 'react'
import styled from 'styled-components'
import { HomeContext } from '../../store/HomeContext'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const HomeContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 100vw;
    min-height: 100vh;
	overflow: hidden;
	margin: 0 auto;
	display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: .75rem;
    padding: .75rem;
`

const VideoWrapper = styled.div`
    position: relative;
    max-height: 90vh;
    min-height: 400px;
    display: block;
    position: relative;
    overflow: hidden;
    background: #000;

    &.small {
        grid-column: span 1;
        grid-row: span 1;
    }

    &.medium {
        grid-row: span 1;
        grid-column: span 2;
    }

    &.large {
        grid-column: span 3;
        grid-row: span 2;
        min-height: 75vh;
    }
`

const DirectorVideo = styled.video`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
`

const Description = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0.5rem 0.875rem;
    background: #12121250;
    z-index: 2;
    color: white;
    text-align: left
    ;
    h3, p {
        padding: 0;
        margin: 0;
    }
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.6875rem;
    }
`


const Home = () => {
	const { homeData } = useContext(HomeContext)
    
	return (
		<HomeContainer>
			{homeData.map((homeContent, idx) => {
                console.log(`${homeContent.thumbnail}?h=200`)
                // These classes are coming from Sanity CMS.
                const sizeClass = classNames({
                    'small': homeContent.videoSize === 'small',
                    'medium': homeContent.videoSize === 'medium',
                    'large': homeContent.videoSize === 'large'
                })
                // Order is applied via grid style order 
                return (
                        <VideoWrapper className={sizeClass} style={{order: homeContent.order}} key={idx}>
                            <Description>
                                <h3>{homeContent.projectTitle}</h3>
                                <p>{homeContent.clientName}</p>
                            </Description>
                            <Link to={{
                                pathname: `/content/${homeContent.projectTitle}`,
                            }}>
                                <DirectorVideo muted='muted' loop='loop' playsInline autoPlay preload="none" poster={`${homeContent.thumbnail}?auto=format&h=600&blur=50`}>
                                    <source src={homeContent.vidURL} />
                                </DirectorVideo>
                            </Link>
                        </VideoWrapper>
                )
            })}
		</HomeContainer>
	)
}

export default Home
