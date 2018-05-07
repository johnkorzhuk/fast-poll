import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';

import { toggleOverlay } from '../store/ui/actions';

import Header from '../containers/Header';
import { Container as BaseContainerStyles } from '../components/common/styled/layout';

import './index.css';

const Container = BaseContainerStyles.extend`
  padding-top: 0;
`;

class TemplateWrapper extends Component {
  handleContainerClick = () => {
    const { overlayIsOpen, toggleOverlay } = this.props;

    if (overlayIsOpen) {
      toggleOverlay(false);
    }
  };

  render() {
    const { children, data, ...props } = this.props;
    return (
      // eslint-disable-next-line
      <div onClick={this.handleContainerClick}>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: 'Create fast and easy polls',
            },
            { name: 'keywords', content: 'polling, rating' },
            { name: 'msapplication-TileColor', content: '#08AEEA' },
            { name: 'theme-color', content: '#2AF598' },
          ]}>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix('/favicons/apple-touch-icon.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix('/favicons/favicon-32x32.png')}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix('/favicons/favicon-16x16.png')}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:700|Open+Sans:400,600,700"
            rel="stylesheet"
          />
        </Helmet>
        <Header background="background-image: linear-gradient(116deg, #08AEEA 0%, #2AF598 100%)" />
        <Container>
          {children({
            ...props,
          })}
        </Container>
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
  overlayIsOpen: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
};

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default connect(
  state => {
    return {
      overlayIsOpen: state.ui.overlay,
    };
  },
  { toggleOverlay },
)(TemplateWrapper);
