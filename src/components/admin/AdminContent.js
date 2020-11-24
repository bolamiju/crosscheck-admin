import React from "react";
import { useRouteMatch } from "react-router-dom";
import Overview from "./Overview";
import Request from "./Request";
import Requests from "./Requests";

import styled from "styled-components";

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
          {route && route.url === "/requests" ? (
            <Requests />
        )
          // : route && route.url === "/requests" ? (
          //   <Requests />
          // )
            : (
        <Overview history={history} />
         )}
      </>
    </div>
  );
};

export default AdminContent;
