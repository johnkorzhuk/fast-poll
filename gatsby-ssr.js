/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

import wrapWithProvider from './wrap-with-provider';

export const wrapRootElement = wrapWithProvider;

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const ConnectedBody = () => ({ bodyComponent });

  const sheet = new ServerStyleSheet();
  const bodyHTML = ReactDOMServer.renderToString(
    sheet.collectStyles(<ConnectedBody />),
  );
  const styleElement = sheet.getStyleElement();

  replaceBodyHTMLString(bodyHTML);
  setHeadComponents([styleElement]);
};
