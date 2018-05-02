import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggleOverlay } from '../store/ui/actions';

import Header from '../components/Header/index';
import withAuth from './withAuth';

class HeaderContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    toggleOverlay: PropTypes.func.isRequired,
  };

  handleNavItemClick = to => {
    const { history } = this.props;

    history.push(to);
  };

  render() {
    return <Header {...this.props} onNavItemClick={this.handleNavItemClick} />;
  }
}

const enhance = compose(
  withAuth(true),
  withRouter,
  connect(
    state => {
      return {
        ...state.auth,
        overlayIsOpen: state.ui.overlay,
      };
    },
    { toggleOverlay },
  ),
);

export default enhance(HeaderContainer);
