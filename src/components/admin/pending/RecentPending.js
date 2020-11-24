import React from "react";
import PendingColumn from "./PendingColumn";
import PendingItem from "./PendingItem";
import styled from "styled-components";

const RecentPending = () => {
  return (
    <PendingWrapper>
      <div className=" title d-flex justify-content-between mr-4">
        <h6>recent pending</h6>
        <p>
          total <span>10</span>
        </p>
      </div>
      <div className="card mr-4 px-4 pt-3 pb-4">
        <PendingColumn />
        <PendingItem />
      </div>
    </PendingWrapper>
  );
};

const PendingWrapper = styled.div`
  width: 50%;
  text-transform: capitalize;
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
  
  .title {
    h6 {
      letter-spacing: 0.44px;
      font-family: MontserratBold;
      color: #173049;
      opacity: 1;
    }
    p {
      letter-spacing: 0.44px;
      font-family: MontserratRegular;
      color: #173049;
      opacity: 0.8;
    }
  }
  .card {
    background: white;
    @media (max-width: 400px) {
      overflow-x: scroll;
      width: 90%;
    }
  }
`;
export default RecentPending;
