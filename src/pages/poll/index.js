import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Poll from '../../containers/Poll';

const PollPage = () => {
  return (
    <Route
      render={({ location }) => {
        return (
          <div>
            <Route exact path="/poll/" render={() => <Redirect to="/" />} />
            <Route
              location={location}
              key={location.key}
              path="/poll/:pollId/"
              component={Poll}
            />
          </div>
        );
      }}
    />
  );
};

PollPage.propTypes = {};

export default PollPage;
