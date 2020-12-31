import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  getVerificationsByStatus,
  getTranscriptsByStatus,
} from "../../state/actions/verifications";

const RecentPending = () => {
  const [activeTab] = useState("completed");
  const [status] = useState("status");

  const dispatch = useDispatch();
  const { completedVerifications } = useSelector((state) => state.verifications);
  const { completedTranscripts } = useSelector((state) => state.transcripts);

  useEffect(() => {
    // if (activeTab === "pending") {
    dispatch(getVerificationsByStatus("pending"));
    dispatch(getVerificationsByStatus("completed"));
    // }
  }, [dispatch]);

  useEffect(() => {
    // if (activeTab === "pending") {
    dispatch(getTranscriptsByStatus("pending"));
    dispatch(getTranscriptsByStatus("completed"));
    // }
  }, [dispatch]);

  const allHistory = [...completedVerifications, ...completedTranscripts];

  const filteredPending = allHistory.filter((history) =>
    history[status].toLowerCase().includes(activeTab)
  );

  return (
    <PendingWrapper>
      <div className=" title d-flex justify-content-between mr-4">
        <h6>recent completed</h6>
        <p>
          total <span>125</span>
        </p>
      </div>
      {activeTab === "completed" ? (
        <div className="new-table">
          <table
            cellSpacing="0"
            cellPadding="0"
            border="0"
            className="ideTable"
          >
            <thead className="table-headers">
              <tr>
                <th>Requester</th>
                <th>Institution</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredPending.map((history) => (
                <tr>
                  <td>{`${history.firstName}  ${history.lastName}`}</td>
                  <td>{history.institution}</td>
                  <td>{history.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="details-info">
          {" "}
          <p>No completed order</p>
        </div>
      )}
    </PendingWrapper>
  );
};

const PendingWrapper = styled.div`
  width: 500px;
  text-transform: capitalize;
  @media (max-width: 400px) {
    margin-top: 5rem;
  }
  @media (max-width: 500px) {
    margin-top: 5rem;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }

  .title {
    @media (max-width: 400px) {
      padding-left: 1.3rem;
    }
    @media (max-width: 500px) {
      padding-left: 1.3rem;
    }
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
  .new-table {
    background: white;
    text-align: center;
    min-height: 300px;
    display: flex;
    justify-content: space-between;

    th {
      padding: 0.5rem 3.3rem;
    }
    td {
      border-top: 0.2rem solid var(--mainWhite);
      padding: 10px;
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
