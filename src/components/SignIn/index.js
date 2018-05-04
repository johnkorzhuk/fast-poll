import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { baseButtonStyles } from '../common/styled/theme';
import { primarySemiBold } from '../common/styled/typography';

const Container = styled.button`
  ${baseButtonStyles};
  ${primarySemiBold()};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px 20px;
  color: ${({ theme }) => theme.colors.darkGray};
  border: none;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: color 200ms linear;
  border-radius: 17px;

  > span {
    margin: 0 5px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Signin = ({ onClick, icon, text, ...props }) => {
  return (
    <Container onClick={onClick} {...props}>
      {icon && cloneElement(icon)}
      <span>{text}</span>
    </Container>
  );
};

Signin.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
};

export default Signin;
