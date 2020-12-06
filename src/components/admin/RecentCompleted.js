import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { getVerificationsByStatus, getTranscriptsByStatus } from "../../state/actions/verifications";



const RecentPending = () => {

  const [activeTab, setActiveTab] = useState("completed");


  const dispatch = useDispatch();
  const { verificationsby_status, transcriptsby_status } = useSelector((state) => state.verifications);

 

  useEffect(() => {
    dispatch(getVerificationsByStatus('completed'));
  }, [dispatch])

  useEffect(() => {
    dispatch(getTranscriptsByStatus('completed'));
  }, [dispatch])
  
  const allHistory = verificationsby_status.concat(transcriptsby_status)
    

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
              {allHistory.map(history => (
                <tr>
                <td>{`${history.firstName}  ${history.lastName}`}</td>
                <td>{history.institution}</td>
                <td>{history.date}</td>
              </tr>
              ))}
          </tbody>
          
          </table>
      </div>
      ): <div className="details-info"> <p>No completed order</p></div>}
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

    td,
      th {
        padding: 10px;
      }
      td {
        border-top: 0.2rem solid var(--mainWhite);
      }
  }
  .card {
    background: white;
    @media (max-width: 400px) {
      overflow-x: scroll;
      width: 90%;
    }
  }
`
export default RecentPending;
