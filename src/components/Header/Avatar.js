import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { baseButtonStyles } from '../styled/theme';

const AVATAR_SIZE = 40;

const Container = styled.button`
  ${baseButtonStyles} padding: 0;
  border-radius: 50%;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  background-image: ${({ photoURL }) => `url(${photoURL})`};
  background-position: center;
  background-size: contain;
  cursor: pointer;
`;

const Avatar = ({ photoURL, ...props }) => {
  return <Container photoURL={photoURL} {...props} />;
};

Avatar.propTypes = {
  photoURL: PropTypes.string,
};

export default Avatar;
