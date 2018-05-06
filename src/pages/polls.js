import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import {
  selectCreatedPolls,
  selectVotedOnPolls,
  selectSortedPolls,
} from '../store/history/selectors';
import { getPollHistory } from '../store/history/actions';

import withAuth from '../containers/withAuth';
import { Paragraph } from '../components/common/styled/typography';
import PollHistory from '../components/PollHistory/index';
import SignIn from '../components/SignIn/index';
import { Google as GoogleIcon } from '../components/common/logos/index';

const Container = styled.main`
  margin-bottom: 100px;
`;

const StyledGoogleIcon = styled(GoogleIcon)`
  margin-right: 5px;
`;

const StyledSignIn = styled(SignIn)`
  display: inline-flex;
  box-shadow: 0px 10px 30px ${({ theme }) => theme.colors.gray};
  transition: box-shadow 200ms linear;

  &:hover {
    box-shadow: 0px 10px 30px ${({ theme }) => theme.colors.darkGray};
  }
`;

const StyledParagraph = styled(Paragraph)`
  display: inline;
  margin-left: 10px;
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
    createdLoading: PropTypes.bool.isRequired,
    createdHasMore: PropTypes.bool.isRequired,
    votedOnLoading: PropTypes.bool.isRequired,
    votedOnHasMore: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    getPollHistory: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isAuthed, uid, created, votedOn } = this.props;

    if (uid && isAuthed) {
      if (created.length === 0 || votedOn.length === 0) {
        this.handleGetPollHistory(uid);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthed } = this.props;
    const { uid: nextUid, isAuthed: nextIsAuthed } = nextProps;

    if (isAuthed !== nextIsAuthed && nextIsAuthed) {
      this.handleGetPollHistory(nextUid);
    }
  }

  handleGetPollHistory = (uid, type) => {
    const { firebase } = this.context;
    const { getPollHistory } = this.props;

    getPollHistory(firebase, { uid, type });
  };

  render() {
    const {
      created,
      votedOn,
      isAuthed,
      signIn,
      loading,
      getPollHistory,
      createdLoading,
      votedOnLoading,
      createdHasMore,
      votedOnHasMore,
      ...props
    } = this.props;
    return (
      <Container>
        {isAuthed
          ? [
              <PollHistory
                polls={created}
                heading="created"
                key="created"
                type="created"
                loading={createdLoading}
                getPollHistory={this.handleGetPollHistory}
                hasMore={createdHasMore}
                {...props}
              />,
              <PollHistory
                polls={votedOn}
                heading="voted on"
                key="voted"
                type="votedOn"
                loading={votedOnLoading}
                getPollHistory={this.handleGetPollHistory}
                hasMore={votedOnHasMore}
                {...props}
              />,
            ]
          : !loading && (
              <div>
                <StyledSignIn
                  onClick={() => signIn('google')}
                  icon={<StyledGoogleIcon />}
                  text="Sign In"
                />
                <StyledParagraph>to see your poll history.</StyledParagraph>
              </div>
            )}
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
        createdLoading: state.history.created.loading,
        votedOnLoading: state.history.votedOn.loading,
        createdHasMore: !state.history.created.empty,
        votedOnHasMore: !state.history.votedOn.empty,
      };
    },
    { getPollHistory },
  ),
);

export default enhance(MyPolls);
