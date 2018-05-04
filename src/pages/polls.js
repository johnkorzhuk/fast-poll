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
import { Heading1, Paragraph } from '../components/common/styled/typography';
import PollHistory from '../components/PollHistory/index';
import SignIn from '../components/SignIn/index';
import { Google as GoogleIcon } from '../components/common/logos/index';

const Container = styled.main`
  height: 100%;

  > h1 {
    text-align: center;
  }
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
    uid: PropTypes.string.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    getPollHistory: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
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
    const { created, votedOn, isAuthed, signIn, loading } = this.props;
    return (
      <Container>
        <Heading1>Poll History</Heading1>
        {isAuthed
          ? [
              <PollHistory polls={created} heading="Created" key="created" />,
              <PollHistory polls={votedOn} heading="Voted on" key="voted" />,
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
      };
    },
    { getPollHistory },
  ),
);

export default enhance(MyPolls);
