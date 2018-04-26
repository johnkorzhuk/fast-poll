import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Container as BaseContainerStyles } from '../../styledComponents/layout';
import SignIn from '../SignIn/index';
import GoogleIcon from '../Icons/Google';
import Avatar from './Avatar';
import Nav, { NavItem } from './Nav';

const Container = BaseContainerStyles.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContainer = styled.header`
  ${props => props.background};
  margin-bottom: 1.45rem;
`;

const Heading1 = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
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
  title,
  isAuthed,
  signIn,
  signOut,
  photoURL,
  toggleHeaderNav,
  navIsOpen,
  onNavItemClick
}) => (
  <HeaderContainer background={background}>
    <Container>
      <Heading1>
        <StyledLink to="/">{title}</StyledLink>
      </Heading1>
      {isAuthed ? (
        <MenuContainer>
          <Avatar
            photoURL={photoURL}
            onClick={() => toggleHeaderNav(!navIsOpen)}
          />
          {navIsOpen && (
            <Nav isOpen={navIsOpen}>

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
          text="Sign in"
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
  toggleHeaderNav: PropTypes.func.isRequired,
  onNavItemClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  photoURL: PropTypes.string,
  isAuthed: PropTypes.bool.isRequired,
  navIsOpen: PropTypes.bool.isRequired,
};

export default Header
