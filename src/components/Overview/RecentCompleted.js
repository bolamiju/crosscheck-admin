import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faAngleDoubleLeft,faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getVerificationsByStatus,
  getTranscriptsByStatus,
} from "../../state/actions/verifications";

const RecentPending = () => {
  const [activeTab] = useState("completed");
  const [status] = useState("status");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8

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

  const orderCount = Math.ceil(allHistory.length / pageSize);

  const handleNext=(data)=>{
    return setCurrentPage(data.selected)
  }

  return (
    <PendingWrapper>
      <div className=" title d-flex justify-content-between mr-4">
        <h6>recent completed</h6>
        <p>
          total <span>{allHistory?.length || ""}</span>
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
              {allHistory.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((history) => (
                <tr>
                  <td>{`${history.firstName}  ${history.lastName}`}</td>
                  <td>{history.institution}</td>
                  <td>{history.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-line">
        <p>
          Showing{" "}
          {
            allHistory.slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize
            ).length
          }{" "}
          of {allHistory.length} of entries
        </p>
        <ReactPaginate
                previousLabel={<FontAwesomeIcon
                  className="icon"
                  icon={faAngleDoubleLeft}
                  style={{ fontSize: "15px" }}
                />}
                nextLabel={<FontAwesomeIcon
                  className="icon"
                  icon={faAngleDoubleRight}
                  style={{ fontSize: "15px" }}
                />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={orderCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e) => handleNext(e)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              /> 
      </div>
        </div>
        
      ) :( <div className="details-info">
          {" "}
          <p>No pending order</p>
        </div>)
      }
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
    flex-direction: column;
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
