import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/store/index';
import theme from './src/constants/theme';
import { ThemeProvider } from 'styled-components';
import FirebaseProvider from './src/containers/FirebaseProvider';
import firebase from './src/services/firebase';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <FirebaseProvider firebase={firebase}>{element}</FirebaseProvider>
      </ThemeProvider>
    </Provider>
  );
};
