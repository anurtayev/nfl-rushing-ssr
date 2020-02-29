import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import App from "./app/App";
import { ServerStyleSheet } from "styled-components";

const sheet = new ServerStyleSheet();

export default state => {
  const content = renderToString(sheet.collectStyles(<App {...state} />));

  const helmet = Helmet.renderStatic();

  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${sheet.getStyleTags()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">${content}</div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(state.data)}
            </script>
            <script src="/bundle.js"></script>
        </body>
    </html>
    `;
};
