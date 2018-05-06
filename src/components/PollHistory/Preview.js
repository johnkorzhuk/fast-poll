import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';

import { primaryBold } from '../common/styled/typography';

const Container = styled(Link)`
  ${primaryBold('1.8rem')};
  height: 80px;
  width: 100%;
  padding: 20px;
  background-image: ${({ theme }) => theme.gradients.secondary};
  filter: grayscale(1);
  transition: filter 200ms linear;
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  text-decoration: none;
  border-radius: 10px;

  &:hover {
    filter: grayscale(0);
  }

  @media (min-width: 500px) {
    width: calc(50% - 20px);
    &:nth-child(odd) {
      margin-right: 40px;
    }
  }

  @media (min-width: 800px) {
    width: calc(33% - 25px);
    margin-right: 40px;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

const PollPreview = ({ title, id }) => {
  return (
    <Container to={`/poll/${id}`}>
      {title.length > 20 ? `${title.substr(0, 20)}...` : title}
    </Container>
  );
};

PollPreview.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default PollPreview;
