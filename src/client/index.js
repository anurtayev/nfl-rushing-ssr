import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { sanitizeInput } from "../util";

// eslint-disable-next-line
const data = window.__PRELOADED_STATE__;
// eslint-disable-next-line
delete window.__PRELOADED_STATE__;

const parseQS = queryString =>
  queryString
    .slice(1)
    .split("&")
    .reduce((acc, cur) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {});

const { sanitizedFilter, sanitizedSortBy } = sanitizeInput(
  // eslint-disable-next-line
  parseQS(location.search)
);

ReactDOM.hydrate(
  <App filter={sanitizedFilter} sortBy={sanitizedSortBy} data={data} />,
  // eslint-disable-next-line
  document.getElementById("root")
);
