import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";

export const fieldNames = {
  player: "Player's name",
  team: "Player's team abreviation",
  pos: "Player's postion",
  attg: "Rushing Attempts Per Game Average",
  att: "Rushing Attempts",
  yds: "Total Rushing Yards",
  avg: "Rushing Average Yards Per Attempt",
  ydsg: "Rushing Yards Per Game",
  td: "Total Rushing Touchdowns",
  lng: "Longest Rush",
  first: "Rushing First Downs",
  firstPercentage: "Rushing First Down Percentage",
  twentyPlus: "Rushing 20+ Yards Each",
  fortyPlus: "Rushing 40+ Yards Each",
  fum: "Rushing Fumbles"
};

const ControlPanel = styled.div`
  padding: 1em;
  margin: 1em;
  display: flex;
  justify-content: space-between;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: auto repeat(14, 6%);
  border: 1px solid black;
`;

const Cell = styled.span`
  padding: 0.3em 0.5em 0.3em 0.5em;
  border: 1px solid black;
`;

const LinkCell = styled.a`
  padding: 0.5em;
  border: 1px solid black;
`;

const HeaderCell = ({ nav, children }) => {
  return nav ? (
    <LinkCell href={nav}>{children}</LinkCell>
  ) : (
    <Cell>{children}</Cell>
  );
};

HeaderCell.propTypes = {
  nav: PropTypes.string,
  children: PropTypes.any
};

const ControlFilterPrompt = styled.span`
  flex-basis: 10%;
`;

const ControlFilterInput = styled.input`
  flex-basis: 40%;
  margin-right: 1em;
`;

const ControlFilterSubmit = styled.button`
  flex-basis: 10%;
  margin-right: 1em;
`;

const ControlFilterReset = styled.button`
  flex-basis: 10%;
  margin-right: 1em;
`;

const ControlFilterDownloadLink = styled.a`
  flex-basis: 30%;
`;

const queryParams = (filter, sortBy) =>
  `?filter=${filter ? filter : ""}&sortBy=${sortBy}`;

const navigate = url => {
  // eslint-disable-next-line
  window.location.href = url;
};

export default function App({ filter, sortBy, data }) {
  const [filterInput, setFilterInput] = useState(filter);
  const [linkHref, setLinkHref] = useState("/download");

  const onClickApply = () => {
    navigate("/" + queryParams(filterInput, sortBy));
  };

  const onClickReset = () => {
    setFilterInput("");
    navigate("/" + queryParams("", sortBy));
  };

  const onClickDownload = () => {
    setLinkHref("/download" + queryParams(filterInput, sortBy));
  };

  const onChangeInput = event => {
    setFilterInput(event.target.value);
  };

  return (
    <main>
      <Helmet>
        <title>NFL Rushing</title>
      </Helmet>
      <ControlPanel>
        <ControlFilterPrompt>filter: </ControlFilterPrompt>
        <ControlFilterInput
          type="text"
          defaultValue={filterInput}
          onChange={onChangeInput}
        />
        <ControlFilterSubmit onClick={onClickApply}>Apply</ControlFilterSubmit>
        <ControlFilterReset onClick={onClickReset}>Reset</ControlFilterReset>
        <ControlFilterDownloadLink
          href={linkHref}
          onClick={onClickDownload}
          download
        >
          Download filtered data
        </ControlFilterDownloadLink>
      </ControlPanel>
      <Table>
        <HeaderCell>{fieldNames.player}</HeaderCell>
        <HeaderCell>{fieldNames.team}</HeaderCell>
        <HeaderCell>{fieldNames.pos}</HeaderCell>
        <HeaderCell>{fieldNames.attg}</HeaderCell>
        <HeaderCell>{fieldNames.att}</HeaderCell>
        <HeaderCell
          nav={sortBy !== "yds" ? queryParams(filter, "yds") : undefined}
        >
          {fieldNames.yds}
        </HeaderCell>
        <HeaderCell>{fieldNames.avg}</HeaderCell>
        <HeaderCell>{fieldNames.ydsg}</HeaderCell>
        <HeaderCell
          nav={sortBy !== "td" ? queryParams(filter, "td") : undefined}
        >
          {fieldNames.td}
        </HeaderCell>
        <HeaderCell
          nav={sortBy !== "lng" ? queryParams(filter, "lng") : undefined}
        >
          {fieldNames.lng}
        </HeaderCell>
        <HeaderCell>{fieldNames.first}</HeaderCell>
        <HeaderCell>{fieldNames.firstPercentage}</HeaderCell>
        <HeaderCell>{fieldNames.twentyPlus}</HeaderCell>
        <HeaderCell>{fieldNames.fortyPlus}</HeaderCell>
        <HeaderCell>{fieldNames.fum}</HeaderCell>
        {data.map((entry, index) => (
          <TableRow {...entry} key={index} />
        ))}
      </Table>
    </main>
  );
}

App.propTypes = {
  filter: PropTypes.string,
  sortBy: PropTypes.string,
  data: PropTypes.array
};

const TableRow = ({
  player,
  team,
  pos,
  attg,
  att,
  yds,
  avg,
  ydsg,
  td,
  lng,
  first,
  firstPercentage,
  twentyPlus,
  fortyPlus,
  fum
}) => {
  return (
    <>
      <Cell>{player}</Cell>
      <Cell>{team}</Cell>
      <Cell>{pos}</Cell>
      <Cell>{attg}</Cell>
      <Cell>{att}</Cell>
      <Cell>{yds}</Cell>
      <Cell>{avg}</Cell>
      <Cell>{ydsg}</Cell>
      <Cell>{td}</Cell>
      <Cell>{lng}</Cell>
      <Cell>{first}</Cell>
      <Cell>{firstPercentage}</Cell>
      <Cell>{twentyPlus}</Cell>
      <Cell>{fortyPlus}</Cell>
      <Cell>{fum}</Cell>
    </>
  );
};

TableRow.propTypes = {
  player: PropTypes.string,
  team: PropTypes.string,
  pos: PropTypes.string,
  attg: PropTypes.number,
  att: PropTypes.number,
  yds: PropTypes.any,
  avg: PropTypes.any,
  ydsg: PropTypes.any,
  td: PropTypes.any,
  lng: PropTypes.any,
  first: PropTypes.any,
  firstPercentage: PropTypes.any,
  twentyPlus: PropTypes.any,
  fortyPlus: PropTypes.any,
  fum: PropTypes.number
};
