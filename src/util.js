import { getSortedDataSet, resolveData } from "./model";
import URL from "url";

const nameRegex = new RegExp("^[a-zA-Z.' ]*$");

export const sanitizeInput = ({ filter = "", sortBy = "" }) => ({
  sanitizedFilter: nameRegex.test(filter) ? filter : "",
  sanitizedSortBy: ["yds", "td", "lng"].some(element => sortBy === element)
    ? sortBy
    : "yds"
});

export const getState = url => {
  const {
    query: { filter, sortBy }
  } = URL.parse(url, true);

  const { sanitizedFilter, sanitizedSortBy } = sanitizeInput({
    filter,
    sortBy
  });

  const data = resolveData({
    data: getSortedDataSet(sanitizedSortBy),
    filter: sanitizedFilter
  });

  return {
    data,
    filter: sanitizedFilter,
    sortBy: sanitizedSortBy
  };
};
