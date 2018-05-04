import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { primarySemiBold } from '../common/styled/typography';

const Container = styled.nav`
  min-width: 150px;
  max-height: ${({ isOpen }) => (isOpen ? '100px' : '20px')};
  border-radius: 15px;
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0;
  top: 50px;
  z-index: ${({ isOpen }) => (isOpen ? 10 : -1)};
  background-color: ${({ theme }) => theme.colors.white};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) =>
    isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: opacity 100ms linear, transform 100ms linear,
    max-height 100ms linear, z-index 150ms linear;
`;

export const NavItem = styled.div`
  ${primarySemiBold('1.4rem')};
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  user-select: none;
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: background-color 200ms linear;
  text-decoration: none !important;
  border-radius: 0;
  display: flex;
  align-items: center;
  max-height: ${({ isOpen }) => (isOpen ? '50px' : '20px')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: max-height 30ms linear, opacity 50ms linear;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  &:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  &:last-child {
    border-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
`;

const Nav = ({ isOpen, children }) => {
  return (
    <Container aria-haspopup="true" aria-expanded={isOpen} isOpen={isOpen}>
      {children}
    </Container>
  );
};

Nav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
};

export default Nav;
