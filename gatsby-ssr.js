/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components'

import theme from './src/constants/theme'
import createStore from './src/store/index';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const store = createStore();

  const ConnectedBody = () => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{bodyComponent}</Provider>
    </ThemeProvider>
  );

  const sheet = new ServerStyleSheet()
  const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />))
  const styleElement = sheet.getStyleElement()

  replaceBodyHTMLString(bodyHTML)
  setHeadComponents([styleElement])
};
