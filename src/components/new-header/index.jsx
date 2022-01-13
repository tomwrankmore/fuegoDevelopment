import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import sanityClient from '../../Client'
import { Link, withRouter } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url'
import { IoMenu, IoClose } from 'react-icons/io5';
import NavOverlay from '../nav-overlay';

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
	return builder.image(source)
}

const StyledHeader = styled.header`
    height: 80px;
    position: fixed;
    width: 100%;
    z-index: 100;
`;

const InnerHeader = styled.div`
    height: 100%;
    width: 100%;
    background: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    top: .75rem;
    left: 0;
    right: 0;
    z-index: 10;
    color: #fff;
    padding: 0 2rem;
`

const StyledButton = styled.button`
    border: none;
    border-radius: 0;
    background: none;
    font-size: 2rem;
    margin: 0;
    padding: 0;
    display: flex;
    align-content: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
`;

const LogoContainer = styled.div`
	width: 100px;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const LogoLink = styled(Link)`
	width: 100%;
	height: auto;
`

const LogoImg = styled.img`
	min-width: 100px;
	max-width: 70%;
	height: auto;
`

const HeaderComp = ({ history }) => {
    // withRouter gives access to history prop to tell if URL has been changed.
    
    // state for menu
    const [menuState, setMenuState] = useState({
        initial: false,
        clicked: null,
        menuIcon: <IoMenu />,
    });

    // state for disabled menu button
    const [disabled, setDisabled] = useState(false);

    // useEffect for page changes
    useEffect(() => {
        // listen for page changes.
        history.listen(() => {
            setMenuState({
                clicked: false,
                menuIcon: <IoMenu />,
            });
        });
    });

    // Determine if menu button should be disabled
    // initial state is false, when we click button and run handleMenu it's set to true, the after 500ms returns to false.
    const disableMenu = () => {
        setDisabled(!disabled);
        setTimeout(() => {
            setDisabled(false);
        }, 1200);
    };

    const handleMenu = () => {
        disableMenu();
        if (menuState.initial === false) {
            setMenuState({
                initial: null,
                clicked: true,
                menuIcon: <IoClose />,
            });
        } else if (menuState.clicked === true) {
            setMenuState((prevState) => ({
                ...prevState,
                clicked: !menuState.clicked,
                menuIcon: <IoMenu />,
            }));
        } else if (menuState.clicked === false) {
            setMenuState((prevState) => ({
                ...prevState,
                clicked: !menuState.clicked,
                menuIcon: <IoClose />,
            }));
        }
    };

    const [header, setHeader] = useState({
		menu: [],
		logo: '',
		phone: '',
		email: '',
	})

    useEffect(() => {
		const headerQuery = `*[_type == "header"]`
		sanityClient.fetch(headerQuery).then(header => {
			header.forEach(header => {
				setHeader(header)
			})
		})
		return
	}, [])

    return (
        <StyledHeader>
            <InnerHeader className='innerHeader'>
                <LogoContainer>
                    <LogoLink to="/">
                        <LogoImg
                            alt="Logo"
                            // src={
                            //     window.location.pathname === '/' ||
                            //     window.location.pathname === '/home'
                            //         ? urlFor(header.invertedLogo).width(500).url()
                            //         : urlFor(header.logo).width(500).url()
                            // }
                            src={urlFor(header.invertedLogo).width(500).url()}
                        />
                    </LogoLink>
                </LogoContainer>
                <StyledButton disabled={disabled} className="menu" onClick={handleMenu}>
                    {menuState.menuIcon}
                </StyledButton>
            </InnerHeader>
            <NavOverlay menuState={menuState} handleMenu={handleMenu} />
        </StyledHeader>
    );
};

const NewHeader = withRouter(HeaderComp);
export default NewHeader;
