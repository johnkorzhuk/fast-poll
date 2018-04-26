import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { toggleHeaderNav } from '../store/ui/actions'

import Header from '../components/Header/index'

class HeaderContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    toggleHeaderNav: PropTypes.func.isRequired,
  }

  handleNavItemClick = (to) => {
    const { history, toggleHeaderNav } = this.props

    history.push(to)
    toggleHeaderNav(false)
  }

  render() {
    return (
      <Header {...this.props} onNavItemClick={this.handleNavItemClick}/>
    )
  }
}

const enhance = compose(
  withRouter,
  connect((state) => {
    return {
      navIsOpen: state.ui.headerNav.isOpen
    }
  }, { toggleHeaderNav })
)

export default enhance(HeaderContainer);
