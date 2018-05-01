/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'

import createStore from './src/store/index';

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) => {
  const store = createStore();

  const ConnectedBody = () => (
    <Provider store={store}>{bodyComponent}</Provider>
  );

  const sheet = new ServerStyleSheet()
  const bodyHTML = renderToString(sheet.collectStyles(<ConnectedBody />))
  const styleElement = sheet.getStyleElement()

  replaceBodyHTMLString(bodyHTML)
  setHeadComponents(styleElement)
};
