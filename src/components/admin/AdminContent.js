import React from "react";
import { useRouteMatch } from "react-router-dom";
import Overview from "./Overview";
import Requests from "./Requests";
import Transcript from './Transcript';
// import Identity from './Identity';
// import Check from './Check';
import History from './History';


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
          : route && route.url === "/transcript" ? (
            <Transcript />
          )
            : route && route.url === "/education" ? (
            <Requests />
            )
            // : route && route.url === "/" ? (
            //   <Identity />
            //   )
            //   : route && route.url === "/" ? (
            //     <Check />
            //     )
                  : route && route.url === "/history" ? (
                    <History />
                  )
            : (
        <Overview history={history} />
         )}
      </>
    </div>
  );
};

export default AdminContent;
