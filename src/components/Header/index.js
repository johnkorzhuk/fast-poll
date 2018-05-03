import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import headerBackground from '../../assets/images/header.svg'

import { Container as BaseContainerStyles } from '../common/styled/layout';
import SignIn from '../SignIn/index';
import { Google as GoogleIcon, FastPoll } from '../common/logos/index';
import Avatar from './Avatar';
import Nav, { NavItem } from './Nav';

const HeaderContainer = styled.header`
  margin-bottom: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: ${({ theme }) => theme.gradients.primary};
  background: url(${headerBackground});
  height: 210px;
  background-size: cover;
  display: flex;
  align-items: center;
`;

const Container = BaseContainerStyles.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  margin-right: 5px;
`;

const MenuContainer = styled.div`
  position: relative;
`;

const BACKGROUND = 'background-color: #20232a';

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
      <Link to="/">
        <FastPoll />
      </Link>
      {isAuthed ? (
        <MenuContainer>
          <Avatar
            photoURL={photoURL}
            onClick={() => toggleOverlay(!overlayIsOpen)}
          />
          {overlayIsOpen && (
            <Nav isOpen={overlayIsOpen}>
              <NavItem onClick={() => onNavItemClick('/polls')}>
                My Polls
              </NavItem>

              <NavItem onClick={signOut}>Sign Out</NavItem>
            </Nav>
          )}
        </MenuContainer>
      ) : (
        <SignIn
          onClick={() => signIn('google')}
          icon={<StyledGoogleIcon />}
          text="Sign In"
        />
      )}
    </Container>
  </HeaderContainer>
);

Header.defaultProps = {
  background: BACKGROUND,
};

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
