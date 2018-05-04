import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

import { Heading2 } from '../common/styled/typography';
import PollPreview from './Preview';

const Container = styled.div`
  margin-top: 50px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 500px;
`;

const PollContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 95%;

  @media (min-width: 800px) {
    width: 98%;
  }
`;

const I_SCROLL_OPTIONS = {
  scrollY: true,
  disablePointer: true,
  disableTouch: false,
  disableMouse: true,
  mouseWheel: true,
  scrollbars: true,
  interactiveScrollbars: true,
};

const PollHistory = ({ heading, polls }) => {
  return (
    <Container>
      <Heading2>{heading}</Heading2>
      <ReactIScroll iScroll={iScroll} options={I_SCROLL_OPTIONS}>
        <PollContainer>
          {polls.map(poll => {
            return <PollPreview key={poll.id} {...poll} />;
          })}
        </PollContainer>
      </ReactIScroll>
    </Container>
  );
};

PollHistory.propTypes = {
  heading: PropTypes.string.isRequired,
  polls: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default PollHistory;
