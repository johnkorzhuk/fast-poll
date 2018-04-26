import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
  height: 80px;
  width: 100%;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
  filter: grayscale(1);
  transition: filter 200ms linear;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 22px;
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

    &:nth-child(3n + 0) {
      margin-right: 0;
    }
  }
`


const PollPreview = ({ title, id }) => {
  return (
    <Container to={`/poll/${id}`}>
      {title}
    </Container>
  );
};

PollPreview.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default PollPreview;
