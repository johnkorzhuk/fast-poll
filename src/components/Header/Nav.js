import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.nav`
  min-width: 150px;
  border-radius: 15px;
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 10;
  background-color: white;
`

export const NavItem = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  user-select: none;
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: background-color 200ms linear;
  font-size: 16px;
  text-decoration: none !important;
  border-radius: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:last-child {
    border-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
`

const Nav = ({
  isOpen,
  children
}) => {

  return (
    <Container aria-haspopup="true" aria-expanded={isOpen}>
      {children}
    </Container>
  )
}

Nav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired)
}

export default Nav