import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import headerBackgroundPNG from '../../assets/images/header.png';

import { Container as BaseContainerStyles } from '../common/styled/layout';
import { Link as LinkTheme } from '../common/styled/theme';
import SignIn from '../SignIn/index';
import { Google as GoogleIcon, FastPoll } from '../common/logos/index';
import Avatar from './Avatar';
import Nav, { NavItem } from './NavMenu';
import Icon from '../common/icons/index';

const HeaderContainer = styled.header`
  margin-bottom: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: ${({ theme }) => theme.gradients.primary};
  background: url(${headerBackgroundPNG});
  height: 100px;
  background-size: cover;
  display: flex;
  align-items: center;

  @media (min-width: 800px) {
    height: 210px;
  }
`;

const Container = styled(BaseContainerStyles)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  margin-right: 5px;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

const MenuContainer = styled.div`
  position: relative;
  right: 0;
  padding-bottom: 13px;
  padding-left: 20px;
  margin-bottom: -13px;
  margin-left: -20px;
`;

const LogoContainer = styled.div`
  height: 50%;
  overflow: hidden;
  width: 42vw;
  max-width: 300px;
`;

const NavIcon = styled(Icon)`
  margin-right: 10px;
`;

const StyledLink = styled(LinkTheme)`
  margin-right: 25px;

  @media (min-width: 500px) {
    margin-right: 40px;
  }
`;

const Header = ({
  background,
  isAuthed,
  signIn,
  signOut,
  photoURL,
  toggleOverlay,
  overlayIsOpen,
  onNavItemClick,
}) => (
  <HeaderContainer background={background}>
    <Container>
      <LogoContainer>
        <Link to="/">
          <FastPoll />
        </Link>
      </LogoContainer>
      <NavContainer>
        <StyledLink to="/">New</StyledLink>
        {isAuthed ? (
          <MenuContainer
            onMouseEnter={() => !overlayIsOpen && toggleOverlay(!overlayIsOpen)}
            onMouseLeave={() => overlayIsOpen && toggleOverlay(!overlayIsOpen)}>
            <Avatar
              photoURL={photoURL}
              onClick={() => toggleOverlay(!overlayIsOpen)}
            />
            <Nav isOpen={overlayIsOpen}>
              <NavItem
                onClick={() => onNavItemClick('/polls')}
                isOpen={overlayIsOpen}>
                <NavIcon size={18} gradient="secondary" icon="poll" />
                My Polls
              </NavItem>

              <NavItem onClick={signOut} isOpen={overlayIsOpen}>
                <NavIcon size={18} gradient="primary" icon="power-circle" />
                Sign Out
              </NavItem>
            </Nav>
          </MenuContainer>
        ) : (
          <SignIn
            onClick={() => signIn('google')}
            icon={<StyledGoogleIcon />}
            text="Sign In"
          />
        )}{' '}
      </NavContainer>
    </Container>
  </HeaderContainer>
);

Header.propTypes = {
  background: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
  onNavItemClick: PropTypes.func.isRequired,
  photoURL: PropTypes.string,
  isAuthed: PropTypes.bool.isRequired,
  overlayIsOpen: PropTypes.bool.isRequired,
};

export default Header;
