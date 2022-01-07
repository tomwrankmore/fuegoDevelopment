import React, { useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DirectorsContext } from '../../store/DirectorsContext'
import gsap from 'gsap'

const DirectorsContainer = styled.div`
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    display: grid;
    justify-content: center;
    align-content: center;
`

// const PageTitle = styled.h1`
//     text-align: center;
//     font-weight: bold;
//     font-size: clamp(1.5rem, 5vw, 8rem);
//     border: solid 1px ${colors.text};
//     padding: 2vh 2vw;
//     box-shadow: 0px 0px 15px 5px #000000;
//     `

// const DirectorsDescription = styled.p`
//     max-width: 50vw;
//     margin-bottom: 2rem;
// `

const DirectorsList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: clamp(1.5rem,4vw,6rem);
    font-weight: bold;
    text-transform: uppercase;

    li {
        display: grid;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 0;
        a {
            text-decoration: none;
            display: block;
        }
    }
`

const Directors = () => {
	const { directorData } = useContext(DirectorsContext)

    const dRef = useRef()
    let q = gsap.utils.selector(dRef);

    useEffect(() => {
        gsap.from(q('.d-item'), {
            yPercent: 100,
            autoAlpha: 0,
            delay: 0.5,
            duration: 0.875,
            ease: 'back',
            stagger: {
                amount: 0.15
            }
        })
        return () => {
            return
        }
    }, [q])

	return (
        <DirectorsContainer>
            {/* <PageTitle>Directors</PageTitle> */}
            {/* <DirectorsDescription>Copy to describe the list of Directors for page context. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, quas saepe vero voluptates perferendis ipsa, quae, ducimus illum molestias error quos enim. Temporibus omnis id, voluptatum recusandae repellat obcaecati nemo.</DirectorsDescription> */}
            <DirectorsList ref={dRef}>
                {directorData.map((director, idx) => {
                    return (
                        <li key={idx}>
                            <Link to={{ pathname: `/directors/${director.slug.current}` }} className='d-item'>
                                {director.directorName}
                            </Link>
                        </li>
                    )
                })}
            </DirectorsList>
        </DirectorsContainer>
    )
}

export default Directors