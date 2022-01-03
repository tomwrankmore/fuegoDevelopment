import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import sanityClient from '../../Client'
import { BlockContent } from '@sanity/block-content-to-react'
import PortableText from '@sanity/block-content-to-react'
import styled from 'styled-components'

const Container = styled.div``

const DirectorGrid = styled.div`
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(6, 1fr);
    display: grid;
    gap: 10px;
`

const MainVideoContainer = styled.div`
    grid-column: 1/-1;
    min-height: 75vh;
    position: relative;
    max-height: 90vh;
    display: block;
    position: relative;
    overflow: hidden;
    background: #000;
`

const Video = styled.video`
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

const SecondaryVideo = styled.div`
    grid-column: 1/4;
    position: relative;
    display: block;
    position: relative;
    overflow: hidden;
    background: #000;
`

const DirectorBio = styled.div`
    grid-column: 4/-1;

    h1 {
        margin: 0;
    }
`

const ProfileImg = styled.img`
    width: 100%;
`

const serializers = {
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
    },
  }

const DirectorProfile = () => {
    const [director, setDirector] = useState([])
    let id = useParams()

    useEffect(() => {
		const directorQuery = `*[_type == "directors" && slug.current == "${id.director}"]{
            directorName,
            directorBio,
            "directorProfileImg": directorImg.asset->url,
            "video1URL": video1.asset->url,
            "video2URL": video2.asset->url,
            "video3URL": video3.asset->url,
        }`
    
        sanityClient.fetch(directorQuery).then(directorData => {
            setDirector(directorData)
        })
        return
    }, [id])

    return (
        <Container>
            {director.map((data, idx) => {
                return (
                    <DirectorGrid key={idx}>
                        <MainVideoContainer>
                            <Video muted='muted' loop='loop' playsInline autoPlay poster='../../images/logo.png'>
                                <source src={data.video1URL} />
                            </Video>
                        </MainVideoContainer>
                        <SecondaryVideo>
                            <Video muted='muted' loop='loop' playsInline autoPlay>
                                <source src={data.video2URL} />
                            </Video>
                        </SecondaryVideo>
                        <DirectorBio>
                            <ProfileImg src={data.directorProfileImg} alt="Director" />
                            <h1>{data.directorName}</h1>
                            <PortableText
                                blocks={data.directorBio}
                            />
                        </DirectorBio>
                    </DirectorGrid>
                )
            })}
        </Container>
    )
}

export default withRouter(DirectorProfile)