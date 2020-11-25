import React from "react";
import styled from "styled-components";

const PendingColumn = () => {
  return (
    <ColumnWrapper className=" container-fluid">
      <div className="row justify-content-center">
        <div className="heading mx-auto">
          <p>requester</p>
        </div>
        <div className="heading mx-auto">
          <p>type</p>
        </div>
        <div className="heading mx-auto">
          <p>date</p>
        </div>
      </div>
    </ColumnWrapper>
  );
};

const ColumnWrapper = styled.div`
  padding-left: 6rem;
  padding-right: 6rem;
  .heading {
    font-family: MontserratBold;
    letter-spacing: 0.32px;
    color: #707070;
    opacity: 1;
  }
`;

export default PendingColumn;
