import React, { useState, useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from './AdminLayout';
import { getAllInstitutions } from "../../state/actions/institutions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import chat from "../../asset/comment.svg";
import styled from "styled-components";
import { getUserVerification, getUserTranscript } from "../../state/actions/verifications";


const History = ({ history }) => {
    

    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();
    const { userVerifications, newTranscript } = useSelector(
      (state) => state.verifications
    );
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [id, setId] = useState("");
    const [searchParameter] = useState("status");
    const user = JSON.parse(localStorage.getItem("user"));
  
    useEffect(() => {
      dispatch(getUserTranscript(user.email));
    }, [dispatch]);
  
    const allHistory = userVerifications.concat(newTranscript);
    useEffect(() => {
      dispatch(getUserVerification(user.email));
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getAllInstitutions());
      dispatch(getUserVerification(user.email));
    }, [dispatch]);
  
  
  
  
    const verificationsNavigation = (e, index) => {
      e.preventDefault();
      if (index < 0 || index >= verificationsCount) {
        return;
      } else {
        setCurrentPage(index);
      }
    };
  
    const filteredItems = allHistory.filter((history) =>
      history[searchParameter]
        .toLocaleLowerCase()
        .includes(input.toLocaleLowerCase())
    );
  
    const pageSize = 10;
  
    const verificationsCount = Math.ceil(filteredItems.length / pageSize);
  
    const handleOpen = (id) => {
      setOpen(true);
      setId(id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    function handleInputChange(e) {
      setInput(e.target.value);
    }
  
    const truncateString = (str) => {
      if (str.length <= 24) {
        return str;
      }
      return str.slice(0, 32) + "...";
    };


    return (
        <AdminLayout history={history}>
            <HistoryWrapper>
                <div className="py-5 mx-5">
                    <h6>Request history</h6>
                      {/* <Table> */}
        <div className="new-table" id="tableScroll">
          <p
            className="history"
            style={{ marginBottom: "45px", marginTop: "25px" }}
          >
            Verification history
          </p>
          <div className="showing-search">
            <p className="showing">Showing ({filteredItems.length}) entries</p>
            {searchParameter === "status" && (
              <div className="search-input">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="search"
                />
                <FontAwesomeIcon
                  className="icon"
                  icon={faSearch}
                  style={{ fontSize: "15px" }}
                />
              </div>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Institution</th>
                <th>Status</th>
                <th>message</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {filteredItems.length > 0
                ? filteredItems
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map(
                    ({ status, firstName, lastName, institution, date, _id }) => (
                      <>
                        <tr>
                          <td>{date}</td>
                          <td>{`${firstName}  ${lastName}`}</td>
                          <td>{truncateString(institution)}</td>
                          <td
                            style={{
                              color:
                                status === "completed"
                                  ? "#7DC900"
                                  : status === "pending"
                                    ? "red"
                                    : "orange",
                            }}
                          >
                            {status}
                          </td>
                          <td onClick={() => handleOpen(_id)}>
                            <img src={chat} alt="message" />
                          </td>
                        </tr>
                        <tr className="space"></tr>
                      </>
                    )
                  )
                : ""}
            </tbody>
            <Modal open={open} onClose={handleClose} id={id} />
          </table>
          <div className="pagination-line">
            <p>
              Showing{" "}
              {
                filteredItems.slice(
                  currentPage * pageSize,
                  (currentPage + 1) * pageSize
                ).length
              }{" "}
              of {verificationsCount} of entries
            </p>
            <Pagination aria-label="Page navigation example">
              <PaginationItem
                disabled={currentPage <= 0}
                className="prev"
                onClick={(e) => verificationsNavigation(e, currentPage - 1)}
              >
                <PaginationLink previous href={() => false} />
              </PaginationItem>

              {[...Array(verificationsCount)].map((page, i) => (
                <PaginationItem
                  active={i === currentPage}
                  key={i}
                  onClick={(e) => verificationsNavigation(e, i)}
                >
                  <PaginationLink href={() => false}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                disabled={currentPage >= verificationsCount - 1}
                onClick={(e) => verificationsNavigation(e, currentPage + 1)}
              >
                <PaginationLink next href={() => false} className="next" />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
        {/* </Table> */}
                </div>
            
            </HistoryWrapper>
        </AdminLayout>
    )
}

const HistoryWrapper = styled.div`
 background: var(--mainWhite);
  width: 100%;
  margin-top: -1.25rem;
  overflow-y: scroll;
  height: 100%;
  h6 {
    font-family: MontserratRegular;
    letter-spacing: 0px;
    color: #0092e0;
    opacity: 1;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: normal;
    opacity: 1;
    padding-bottom: -1.5rem;
  }
  .new-table {
    /* margin-top: 10px; */
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029;

    /* height: 90%; */
    overflow-x: hidden;
    margin-bottom: 10px;
    padding-bottom: 20px;
    .hide-table {
      display: none;
    }

    table {
      margin: 0 auto;
      width: 95%;
      border-collapse: collapse;
      text-align: left;
      overflow: hidden;
      font-size: 14px;
      .mobile-header {
        display: none;
      }

      td,
      th {
        padding: 10px;
        @media (max-width: 500px) {
          padding: 9px !important;
        }
      }

      td {
        /* border-left: 1px solid #ecf0f1;
        border-right: 1px solid #ecf0f1; */
      }

      th {
        background-color: #1e2a36;
        color: white;
      }

      /* tr:nth-of-type(even) td {
        background-color: lighten(#4ecdc4, 35%);
      } */
      tr {
        cursor: pointer;
        &:nth-child(odd) {
          background-color: #f3f2ee;
        }
        &:hover {
          background-color: #d9f4f2;
        }
      }
    }
    .history {
      margin-left: 50px;
      font-family: MontserratBold;
      letter-spacing: 0.44px;
      color: #173049;
      opacity: 1;
    }
    .showing-search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 4rem;

      .showing {
        font-family: MontserratRegular;
        letter-spacing: 0.44px;
        color: #707070;
        opacity: 1;
        margin-left: 50px;
      }
      .search-input {
        position: relative;
        padding: 0.5rem;

        input {
        height: 1rem;
        padding: 0.2rem;
        outline: none;
      }
      .icon {
        position: absolute;
        top: 30%;
        right:5%;
        opacity: 0.7;
        color: #2C3E50;
      }
    }
      
    }
  }
`

export default History;
