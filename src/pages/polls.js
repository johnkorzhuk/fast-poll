import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

// import ReactIScroll from "react-iscroll"
// import iScroll from "iscroll"

import {
  selectCreatedPolls,
  selectVotedOnPolls,
  selectSortedPolls,
} from '../store/history/selectors';
import { getPollHistory } from '../store/history/actions';
import { checkIfUserHasVoted } from '../store/poll/actions';

import withAuth from '../containers/withAuth';
import { Heading1 } from '../components/common/styled/typography';
import PollPreview from '../components/Preview/index';

const Container = styled.main`
  height: 100%;
`;

const PollItemListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const pollType = PropTypes.arrayOf(
  PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
);

class MyPolls extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    created: pollType,
    votedOn: pollType,
    uid: PropTypes.string.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    getPollHistory: PropTypes.func.isRequired,
    checkIfUserHasVoted: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isAuthed, uid } = this.props;

    if (uid && isAuthed) {
      this.getPollHistory(uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthed } = this.props;
    const { uid: nextUid, isAuthed: nextIsAuthed } = nextProps;

    if (isAuthed !== nextIsAuthed && nextIsAuthed) {
      this.getPollHistory(nextUid);
    }
  }

  getPollHistory(uid) {
    const { firebase } = this.context;
    const { getPollHistory } = this.props;

    getPollHistory(firebase, { uid }).then(([lastCreatedRef, lastVotedRef]) => {
      this.lastCreatedRef = lastCreatedRef;
      this.lastVotedRef = lastVotedRef;
    });
  }

  render() {
    const { created, votedOn } = this.props;

    return (
      <Container>
        <Heading1>my polls</Heading1>

        <PollItemListContainer>
          {created.map(poll => {
            return <PollPreview key={poll.id} {...poll} />;
          })}
        </PollItemListContainer>

        <Heading1>voted on</Heading1>
        <PollItemListContainer>
          {votedOn.map(poll => {
            return <PollPreview key={poll.id} {...poll} />;
          })}
        </PollItemListContainer>
      </Container>
    );
  }
}

const enhance = compose(
  withAuth(),
  connect(
    state => {
      return {
        created: selectSortedPolls(selectCreatedPolls)(state),
        votedOn: selectSortedPolls(selectVotedOnPolls)(state),
      };
    },
    { getPollHistory, checkIfUserHasVoted },
  ),
);

export default enhance(MyPolls);
