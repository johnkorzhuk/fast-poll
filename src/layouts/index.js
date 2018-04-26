import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';
import styled from 'styled-components'

import { toggleHeaderNav } from '../store/ui/actions'

import Auth from '../containers/Auth';
import Header from '../containers/Header';
import { Container as BaseContainerStyles } from '../styledComponents/layout';

import './index.css';

const Container = BaseContainerStyles.extend`
  padding-top: 0;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
`

const TemplateWrapper = ({ children, data, headerNavIsOpen,toggleHeaderNav, ...props }) => (
  <Auth>
    {auth => {
      return (
        <div>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: 'description',
                content: 'Create polls fast & easy',
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
          </Helmet>
          <Header
            background="background-image: linear-gradient(116deg, #08AEEA 0%, #2AF598 100%)"
            title={data.site.siteMetadata.title}
            {...auth}
          />
          {headerNavIsOpen && <Overlay onClick={() => toggleHeaderNav(false)}/>}
          <Container>
            {children({
              ...props,
              ...auth,
            })}
          </Container>
        </div>
      );
    }}
  </Auth>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
  headerNavIsOpen: PropTypes.bool.isRequired,
  toggleHeaderNav: PropTypes.func.isRequired,
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

export default connect((state) => {
  return {
    headerNavIsOpen: state.ui.headerNav.isOpen
  }
}, {toggleHeaderNav})(TemplateWrapper);
