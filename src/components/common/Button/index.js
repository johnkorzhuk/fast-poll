import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Link from 'gatsby-link';

import { Button as BaseButton } from '../styled/theme';

const Container = styled.div`
  position: relative;
  display: inline-block;
  outline: none;

  &:hover,
  &:focus {
    > .js-gradient {
      filter: blur(6px) hue-rotate(20deg);
      opacity: 1;
    }
  }
`;

const LinkButton = BaseButton.extend`
  text-decoration: none;
  display: inline-block;
`.withComponent(Link);

const Gradient = styled.div`
  opacity: 0;
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-image: ${({ theme, type }) => theme.gradients[type]};
  transition: opacity 200ms linear;
  padding: 4px;
  z-index: 1;
  border-radius: 20px;
  transition: filter 200ms linear, opacity 200ms linear;
`;

const Button = ({ type, children, to, ...props }) => {
  return (
    <Container tabIndex={0} {...props}>
      {to ? (
        <LinkButton type={type} to={to}>{children}</LinkButton>
      ) : (
        <BaseButton type={type}>{children}</BaseButton>
      )}
      <Gradient type={type} className="js-gradient" />
    </Container>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.element,
  to: PropTypes.string
}

export default Button;
