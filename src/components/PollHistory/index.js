import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Infinate from 'react-infinite-scroll-component';

import {
  Heading1 as BaseHeading1,
  Heading2,
} from '../common/styled/typography';
import PollPreview from './Preview';

const CONTAINER_PADDING = 50;

const Container = styled.div`
  margin-top: 50px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
`;

const Heading = styled(BaseHeading1)`
  width: 100%;
  padding: 30px ${CONTAINER_PADDING}px 20px;
  text-align: center;
  ${({ hasItems, theme }) =>
    hasItems && `border-bottom: 1px solid ${theme.colors.gray};`};
  margin-bottom: 0;
  text-transform: capitalize;
`;

const ScrollMessage = styled(Heading2)`
  display: block;
  width: 100%;
  margin: 25px 0 0;
`.withComponent('div');

const PollHistory = ({
  heading,
  polls,
  type,
  getPollHistory,
  hasMore,
  uid,
}) => {
  const hasItems = polls.length > 0;
  let containerHeight = 350;

  if (polls.length < 4) containerHeight = 125;
  else if (polls.length < 7) containerHeight = 250;
  return (
    <Container>
      <Heading hasItems={hasItems}>{heading}</Heading>
      {hasItems && (
        <Infinate
          dataLength={hasMore ? polls.length + 1 : polls.length}
          height={containerHeight}
          next={() => {
            getPollHistory(uid, type);
          }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '0 14px 0 24px',
            marginBottom: 25,
          }}
          loader={<ScrollMessage>Loading...</ScrollMessage>}
          hasMore={hasMore}>
          {polls.map(poll => {
            return <PollPreview key={poll.id} {...poll} />;
          })}
        </Infinate>
      )}
    </Container>
  );
};

PollHistory.propTypes = {
  uid: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  getPollHistory: PropTypes.func.isRequired,
  polls: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default PollHistory;
