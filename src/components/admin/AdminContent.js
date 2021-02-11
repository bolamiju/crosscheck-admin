import React from "react";
import { useRouteMatch } from "react-router-dom";
import Overview from "./Overview";
import Requests from "./Requests";
import Transcript from './Transcript';
import History from './History';
import Institutions from './ManageInstitutions'


const AdminContent = (props) => {
  const {
    match: { params },
    history,
  } = props;
  let route = useRouteMatch();
  return (
    <div>
      <>
        {" "}
        {route && route.url === "/education" ? (
        <Requests />
      ) : route && route.url === "/transcript" ? (
        <Transcript />
      ) : route && route.url === "/history" ? (
          <History />
      ) : route && route.url === "/institutions" ? (
        <Institutions />
    ): (
        <Overview history={history} />
      )}
      </>
    </div>
  );
};

export default AdminContent;
