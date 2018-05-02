import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  signIn,
  signOut,
  startListeningToAuthChanges,
  setAuthLoading,
} from '../store/auth/actions';
import { selectAuthedState } from '../store/auth/selectors';

const withAuth = (listenForAuthChanges = false) => WrappedComponent => {
  class Auth extends React.Component {
    static propTypes = {
      uid: PropTypes.string,
      isAnonymous: PropTypes.bool,
      photoURL: PropTypes.string,
      isAuthed: PropTypes.bool.isRequired,
      signIn: PropTypes.func.isRequired,
      signOut: PropTypes.func.isRequired,
      startListeningToAuthChanges: PropTypes.func.isRequired,
      setAuthLoading: PropTypes.func.isRequired,
    };

    static contextTypes = {
      firebase: PropTypes.object,
    };

    componentDidMount() {
      const { firebase } = this.context;
      const { startListeningToAuthChanges, setAuthLoading } = this.props;

      if (listenForAuthChanges && !this.stopAuthListener) {
        setAuthLoading(true);
        // onAuthStateChanged returns an unsubscribe method
        this.stopAuthListener = startListeningToAuthChanges(firebase);
      }
    }

    componentWillUnmount() {
      if (this.stopAuthListener) {
        this.stopAuthListener();
      }
    }

    stopAuthListener = null;

    handleSignIn = provider => {
      const { firebase } = this.context;
      const { signIn } = this.props;

      signIn(firebase, provider);
    };

    handleSignOut = () => {
      const { firebase } = this.context;
      const { signOut } = this.props;

      return signOut(firebase);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          signIn={this.handleSignIn}
          signOut={this.handleSignOut}
        />
      );
    }
  }

  return connect(
    state => {
      return {
        ...state.auth,
        isAuthed: selectAuthedState(state),
      };
    },
    { signIn, signOut, startListeningToAuthChanges, setAuthLoading },
  )(Auth);
};

export default withAuth;
