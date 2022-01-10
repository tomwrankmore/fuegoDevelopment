import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaVimeoV, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { device } from '../../style-variables/mediaQueries'
import colors from '../../style-variables/colors'

import {
    fadeInUp,
    handleHover,
    handleHoverExit,
    staggerReveal,
    staggerText,
    socialReveal
  } from '../../components/animations';

const OverlayWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    display: none;

    .overlay-secondary-bg-color {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: #8f8e8c6e;
    }
    .overlay-layer {
        position: relative;
        background-color: ${colors.navOverlayBG};
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .menu-links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 80vw;
        flex-wrap: wrap;
        flex-direction: column;
    }
`;

const Nav = styled.nav`
    width: 100%;
    display: block;
    @media ${device.mediaMinLarge} {
        width: 50%;
    }
`;

const NavigationList = styled.ul`
    margin: 0;
    padding: 0;
    text-align: left;
    text-transform: uppercase;

    li {
        list-style: none;
        cursor: pointer;
        font-weight: 700;
        font-size: clamp(1.5rem, 5vw, 8rem);
        overflow: hidden;
        position: relative;
        display: grid;
        align-content: center;
        justify-content: center;
        border-bottom: dotted 1px #606060;
        padding: 0.5rem 0;

        a {
            color: #FAF9F6;
            text-decoration: none;
            &:hover {
                color: #ffffff;
            }
        }
    }
`;

const Container = styled.div`
    width: 100vw;
`;

const Wrapper = styled.div`
    position: relative;
    display: grid;
    align-content: center;
    justify-content: center;
    height: 100vh;
`;

const Info = styled.div`
    color: #fff;
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    @media ${device.mediaMinLarge} {
        width: 50%;
    }
    h3 {
        font-size: 1.2rem;
        margin: 0 auto 8px auto;
    }
    p {
        margin: 0 auto;
        font-size: 0.8rem;
    }
`;

const Socials = styled.div`
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: space-around;
    border-top: dotted 1px #606060;
    padding: 1rem 0;
    overflow: hidden;
    @media ${device.mediaMinLarge} {
        width: 50%;
    }

    a {
        font-size: 4rem;
        color: white;
        display: block;
    }
`;

const NavOverlay = ({ menuState }) => {

    const overlayRef = useRef(null)
    const menuLinksRef = useRef(null)
    const revealOverlay = useRef(null)
    const revealOverlayBG = useRef(null)
    const info = useRef(null)
    const socialsRef = useRef(null)

    // array containing navigation li's
    const navRefs = useRef([])
    navRefs.current = []

    const addToNavRefs = (el) => {
        if(el && !navRefs.current.includes(el)) {
            navRefs.current.push(el)
        }
    }

    useEffect(() => { 

        if (menuState.clicked === false) {
            // close menu
            gsap.to([revealOverlay.current, revealOverlayBG.current], {
                duration: 0.8,
                height: 0,
                ease: 'power3.inOut',
                stagger: {
                    amount: 0.07
                }
            })
            gsap.to(overlayRef.current, {
                duration: 1,
                css: {display: "none"}
            })
        } else if (menuState.clicked === true || 
            (menuState.clicked === true && menuState.initial === null)
        ) {
            // open menu
            gsap.to(overlayRef.current, {
                duration: 0,
                css: {display: "block"}
            })
            gsap.to([revealOverlay.current, revealOverlayBG.current], {
                duration: 0,
                opacity: 1,
                height: '100%',
            })
            gsap.from(menuLinksRef.current, {
                delay: 0.2,
                y: -200
            })
            staggerReveal(revealOverlayBG.current, revealOverlay.current,)
            fadeInUp(info.current)
            staggerText(navRefs.current)
            socialReveal(socialsRef)
        }
    }, [menuState.clicked, menuState.initial]);

    return (
        <OverlayWrapper ref={overlayRef}>
            <div className="overlay-secondary-bg-color" ref={revealOverlayBG} />
            <div className="overlay-layer"  ref={revealOverlay}>
                <div className="overlay-backround-color" />
                <Container>
                    <Wrapper>
                        <div className="menu-links" ref={menuLinksRef}>
                            <Nav>
                                <NavigationList>
                                    <li>
                                        <Link to="/content" onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)} ref={addToNavRefs}>Work</Link>
                                    </li>
                                    <li>
                                        <Link to="/directors" onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)} ref={addToNavRefs}>Directors</Link>
                                    </li>
                                    <li>
                                        <Link to="/about" onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)} ref={addToNavRefs}>About</Link>
                                    </li>
                                </NavigationList>
                            </Nav>
                            <Info ref={info}>
                                <h3>Get in Contact</h3>
                                <p>
                                    <a href="mailto:hello@fuegofilms.co.uk">hello@fuegofilms.co.uk</a>
                                </p>
                            </Info>
                            <Socials ref={socialsRef}>
                                <a href="https://vimeo.com/fuegofilmsltd" target='_blank'>
                                    <FaVimeoV />
                                </a>
                                <a href="https://www.instagram.com/fuegofilmsldn/?hl=en" target='_blank'>
                                    <FaInstagram />
                                </a>
                            </Socials>
                        </div>
                    </Wrapper>
                </Container>
            </div>
        </OverlayWrapper>
    );
};

export default NavOverlay;
