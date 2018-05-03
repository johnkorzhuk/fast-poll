import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  getInitialPollData,
  checkIfUserHasVoted,
  startListeningToResultChanges,
  selectOption,
  voteOnPoll,
  setShowResults,
} from '../store/poll/actions';
import { selectIsOwner } from '../store/poll/selectors';
import {
  selectOrderedOptions,
  selectTotalVotes,
} from '../store/poll/options/selectors';

import withAuth from './withAuth';
import Poll from '../components/Poll/index';

class PollContainer extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    uid: PropTypes.string,
    selection: PropTypes.string,
    title: PropTypes.string,
    signIn: PropTypes.func.isRequired,
    getInitialPollData: PropTypes.func.isRequired,
    checkIfUserHasVoted: PropTypes.func.isRequired,
    setShowResults: PropTypes.func.isRequired,
    startListeningToResultChanges: PropTypes.func.isRequired,
    voteOnPoll: PropTypes.func.isRequired,
    selectOption: PropTypes.func.isRequired,
    authLoading: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    created: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        editing: PropTypes.bool.isRequired,
        votes: PropTypes.number.isRequired,
      }),
    ),
  };

  // pull the pollId from the route param, then fetch the poll
  componentDidMount() {
    const { firebase } = this.context;
    const { history, match, getInitialPollData, created, uid } = this.props;

    if (match.params.pollId.length === 6) {
      getInitialPollData(firebase, history, {
        pollId: match.params.pollId,
        created,
      });

      if (uid) {
        this.checkVote(uid);
      }
    } else {
      history.push('/404');
    }
  }

  // since we don't know when the user will be authenticated if ever,
  // we need to add checks here and sign in anonymously if not
  componentWillReceiveProps(nextProps) {
    const { uid, authLoading, signIn } = this.props;
    const { uid: nextUid, authLoading: nextAuthLoading } = nextProps;

    if ((!uid && !nextUid) || (uid && !nextUid)) {
      if (!authLoading && !nextAuthLoading) {
        signIn('anonymous');
      }
    } else if (uid !== nextUid) {
      // a uid exists, check if the user has already voted
      this.checkVote(nextUid);
    }
  }

  componentWillUnmount() {
    if (this.stopResultListener) {
      this.stopResultListener();
    }
  }

  handleShowResults = () => {
    const { setShowResults, selection, selectOption } = this.props;

    if (selection) {
      selectOption('');
    }

    setShowResults(true);
    this.startResultListener();
  };

  handleSelectOption = id => {
    const { selectOption } = this.props;

    selectOption(id);
  };

  handleVote = () => {
    const { uid, signIn } = this.props;
    // in the case a user votes and they've not been logged in
    if (!uid) {
      signIn('anonymous').then(({ uid }) => {
        this.vote(uid);
      });
    } else {
      this.vote(uid);
    }
  };

  vote(uid) {
    const { firebase } = this.context;
    const { voteOnPoll, selection, match, isAuthed, title } = this.props;
    const { pollId } = match.params;

    return voteOnPoll(firebase, {
      uid,
      pollId,
      selection,
      isAuthed,
      title,
    }).then(() => {
      this.startResultListener();
    });
  }

  checkVote(uid) {
    const { firebase } = this.context;
    const { match, checkIfUserHasVoted } = this.props;
    const { pollId } = match.params;

    return checkIfUserHasVoted(firebase, { uid, pollId }).then(optionId => {
      if (optionId) {
        this.startResultListener();
      }
    });
  }

  startResultListener() {
    const { firebase } = this.context;
    const { match, startListeningToResultChanges } = this.props;
    const { pollId } = match.params;

    if (!this.stopResultListener) {
      this.stopResultListener = startListeningToResultChanges(firebase, {
        pollId,
      });
    }
  }

  render() {
    return (
      <Poll
        {...this.props}
        onShowResults={this.handleShowResults}
        onSelectOption={this.handleSelectOption}
        onVote={this.handleVote}
      />
    );
  }
}

const enhance = compose(
  withRouter,
  withAuth(),
  connect(
    (state, { match }) => {
      return {
        ...state.poll.data,
        authLoading: state.auth.loading,
        options: selectOrderedOptions(state),
        created: state.poll.data.created === match.params.pollId,
        isOwner: selectIsOwner(state),
        totalVotes: selectTotalVotes(state),
      };
    },
    {
      getInitialPollData,
      checkIfUserHasVoted,
      startListeningToResultChanges,
      selectOption,
      voteOnPoll,
      setShowResults,
    },
  ),
);

export default enhance(PollContainer);
