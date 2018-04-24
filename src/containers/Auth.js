import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { signIn, signOut, startListeningToAuthChanges } from '../store/auth/actions'
import { selectAuthedState } from '../store/auth/selectors'

class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    uid: PropTypes.string,
    isAnonymous: PropTypes.bool,
    photoURL: PropTypes.string,
    isAuthed: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    startListeningToAuthChanges: PropTypes.func.isRequired,
  };

  static contextTypes = {
    firebase: PropTypes.object,
  };

  componentDidMount() {
    const { auth } = this.context.firebase;
    const { startListeningToAuthChanges }  = this.props
    // onAuthStateChanged returns an unsubscribe method
    this.stopAuthListener = startListeningToAuthChanges(auth)
  }

  componentWillUnmount() {
    this.stopAuthListener();
  }

  handleSignIn = provider => {
    const { auth } = this.context.firebase;
    const { signIn } = this.props

    signIn(auth, provider)
  };

  handleSignOut = () => {
    const { auth } = this.context.firebase;
    const { signOut } = this.props

    return signOut(auth)
  };

  render() {
    const { children, ...props } = this.props

    return children({
      ...props,
      signIn: this.handleSignIn,
      signOut: this.handleSignOut,
    });
  }
}

export default connect((state) => {
  return {
    ...state.auth,
    isAuthed: selectAuthedState(state)
  }
}, { signIn, signOut, startListeningToAuthChanges })(Auth);
