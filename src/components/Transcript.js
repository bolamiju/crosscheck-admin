import React, { useState, useEffect } from "react";
import AdminLayout from "./admin/AdminLayout";
import ReactToExcel from "react-html-table-to-excel";
import styled from "styled-components";
import qualifications from "../asset/qualification.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";
import { DatePicker, Space,Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  getTranscriptsByStatus,
  updateTranscriptRequest,
} from "../state/actions/verifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const {Option} = Select

const Requests = ({ history }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [activeCard, setActiveCard] = useState("new");
  const [display, setDisplay] = useState("empty");
  const [background, setBackground] = useState("");
  const [transcriptStatus, setTranscriptStatus] = useState("");
  const [info, setInfo] = useState({});
  const [searchParameter, setSearchParameter] = useState("firstName");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const {
    pendingTranscripts,
    completedTranscripts,
    processingTranscripts,
  } = useSelector((state) => state.transcripts);
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (activeTab === "pending") {
      dispatch(getTranscriptsByStatus("pending"));
    } else if (activeTab === "processing") {
      dispatch(getTranscriptsByStatus("processing"));
    } else if (activeTab === "completed") {
      dispatch(getTranscriptsByStatus("completed"));
    }
  }, [dispatch, activeTab]);

  const handleBackground = (background) => {
    setBackground(background);
  };

  const handleTranscriptStatus = (val) => {
    setTranscriptStatus(val);
  };
  const handleUpdateTranscript = async () => {
    if (!transcriptStatus) {
      return toast.error("select an option");
    }
    setLoading(true);
    const response = await updateTranscriptRequest(info?._id,info?.email, {
      transcriptStatus,updated_by:`${user.firstName} ${user.lastName}`
    });
   
    if (response.data.message === "transcript updated") {
      toast.success("update sucessful !!");
      setTranscriptStatus("");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("update Unsucessful. Try again !");
    }
  };
  const handleDateRange = (value, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const min = Date.parse(startDate);
  const max = Date.parse(endDate);

  // pending name filter
  const pendingFilterOrder = pendingTranscripts.filter((transcript) =>
    transcript[searchParameter]
      .toLowerCase()
      .includes(firstNameInput.toLowerCase())
  );

  // pending date filter
  const pendingDateFilter = pendingTranscripts.filter((transcript) => {
    if (
      Date.parse(transcript[searchParameter]) >= min &&
      Date.parse(transcript[searchParameter]) <= max
    ) {
      return transcript;
    }
  });

  // processsing name filter
  const processingFilterOrder = processingTranscripts.filter((transcript) =>
    transcript[searchParameter]
      .toLowerCase()
      .includes(firstNameInput.toLowerCase())
  );
  // processing date filter
  const processingDateFilter = processingTranscripts.filter((transcript) => {
    if (
      Date.parse(transcript[searchParameter]) >= min &&
      Date.parse(transcript[searchParameter]) <= max
    ) {
      return transcript;
    }
  });

  // completed name filter
  const completedFilterOrder = completedTranscripts.filter((transcript) =>
    transcript[searchParameter]
      .toLowerCase()
      .includes(firstNameInput.toLowerCase())
  );

  // completed date filter
  const completedDateFilter = completedTranscripts.filter((transcript) => {
    if (
      Date.parse(transcript[searchParameter]) >= min &&
      Date.parse(transcript[searchParameter]) <= max
    ) {
      return transcript;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParameter(e.target.value);
    setFirstNameInput("");
  };

  const handleChange = (e) => {
    setFirstNameInput(e.target.value);
  };

  return (
    <AdminLayout history={history}>
      <RequestWrapper>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ marginTop: "20px" }}
        />
        <div className="select col-12 mx-auto text-center my-3">
          <select
            defaultValue="no-value"
            name="searchParameter"
            className="option mr-4"
            onChange={handleSubmit}
          >
            <option value="no-value" disabled>
              Filter by
            </option>
            <option value="firstName">Name</option>
            <option value="date">Date</option>
            <option value="_id">Id</option>
          </select>
          {searchParameter === "firstName" && (
            <input
              type="text"
              name="firstNameInput"
              value={firstNameInput}
              onChange={handleChange}
            />
          )}
          {searchParameter === "date" && (
            <Space direction="version">
              <RangePicker
                allowClear={false}
                onChange={handleDateRange}
                style={{ width: 350 }}
              />
            </Space>
          )}
        </div>

        <div className="">
          <div className="request-container p-5">
            <ul className=" list d-flex">
              <li
                onClick={() => {
                  setActiveTab("pending");
                }}
                className={activeTab === "pending" ? "activeTab" : ""}
              >
                <img className="active" src={qualifications} alt="details" />
                &nbsp; Pending Order
              </li>
              <li
                onClick={() => {
                  setActiveTab("processing");
                }}
                className={activeTab === "processing" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp; Processing Order
              </li>
              <li
                onClick={() => {
                  setActiveTab("completed");
                }}
                className={activeTab === "completed" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp; Completed Order
              </li>
            </ul>
          </div>
          <div className="box d-block d-lg-flex py-1">
            <div>
              <div className="cards px-5 py-5">
                <div
                  onClick={() => {
                    setActiveCard("new");
                  }}
                  className={activeCard === "new" ? "activeCard1" : "card1"}
                >
                  <h6>new</h6>
                  <div className="para-icon">
                    <p>
                      View new transcript <br /> orders
                    </p>
                    <div className="icon-box">
                      <FontAwesomeIcon
                        className="icon"
                        icon={faLongArrowAltDown}
                        style={{ fontSize: "20px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div
                  onClick={() => {
                    setActiveCard("pendings");
                  }}
                  className={
                    activeCard === "pendings" ? "activeCard2" : "card2"
                  }
                >
                  <h6>pendings</h6>
                  <div className="para-icon">
                    <p>
                      Take actions on <br /> pending activities
                    </p>
                    <div className="icon-box">
                      <FontAwesomeIcon
                        className="icon"
                        icon={faLongArrowAltDown}
                        style={{ fontSize: "20px" }}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
              <div>
                {activeCard === "new" ? (
                  <h6 className="transcript-order">New Transcript orders</h6>
                ) : (
                  <h6 className="transcript-order"> pending order</h6>
                )}
                {activeCard === "new" && activeTab === "pending" ? (
                  <div className="new-table">
                    <table
                      cellSpacing="0"
                      cellPadding="0"
                      border="0"
                      className="ideTable"
                      id="table-to-xls"
                    >
                      <thead className="table-headers">
                        <tr>
                          <th>Requester</th>
                          <th>Institution</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(searchParameter === "firstName"
                          ? pendingFilterOrder
                          : pendingDateFilter
                        ).length > 0 ? (
                          (searchParameter === "firstName"
                            ? pendingFilterOrder
                            : pendingFilterOrder
                          ).map((verification) => (
                            <tr
                              key={verification._id}
                              onClick={() => {
                                setDisplay("populated");
                                setInfo(verification);
                                handleBackground(verification._id);
                              }}
                              className={
                                background === verification._id
                                  ? "activeOrder"
                                  : ""
                              }
                            >
                              <td>{`${verification.firstName} ${verification.lastName}`}</td>
                              <td>{verification.institution}</td>
                              <td>{verification.date}</td>
                            </tr>
                          ))
                        ) : (
                          <div className="no-order">
                            <p>No pending verification requests</p>
                          </div>
                        )}
                        <tr>
                          <td></td>
                          <td></td>
                          <td><ReactToExcel
                      className="excel-sheet"
                      table="table-to-xls"
                      filename="excelFile"
                      sheet="sheet 1"
                      buttonText="EXPORT"
                    /></td>
                        </tr>
                      </tbody>
                    </table>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>
              {activeCard === "new" && activeTab === "processing" ? (
                <div className="new-table">
                  <table
                    cellSpacing="0"
                    cellPadding="0"
                    border="0"
                    className="ideTable"
                    id="table-to-xls"
                  >
                    <thead className="table-headers">
                      <tr>
                        <th>Requester</th>
                        <th>Institution</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(searchParameter === "firstName"
                        ? processingFilterOrder
                        : processingDateFilter
                      ).length > 0 ? (
                        (searchParameter === "firstName"
                          ? processingFilterOrder
                          : processingDateFilter
                        ).map((transcript) => (
                          <tr
                            key={transcript._id}
                            onClick={() => {
                              setDisplay("populated");
                              setInfo(transcript);
                              handleBackground(transcript._id);
                            }}
                            className={
                              background === transcript._id ? "activeOrder" : ""
                            }
                          >
                            <td>{`${transcript.firstName} ${transcript.lastName}`}</td>
                            <td>{transcript.institution}</td>
                            <td>{transcript.date}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="no-order">
                          <p>No transcript is being processed</p>
                        </div>
                      )}
                      <tr>
                        <td></td>
                        <td></td>
                        <td> <ReactToExcel
                    className="excel-sheet"
                    table="table-to-xls"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText="EXPORT"
                  /></td>
                      </tr>
                    </tbody>
                  </table>
                 
                </div>
              ) : (
                ""
              )}

              {activeCard === "new" && activeTab === "completed" ? (
                <div className="new-table">
                  <table
                    cellSpacing="0"
                    cellPadding="0"
                    border="0"
                    className="ideTable"
                    id="table-to-xls"
                  >
                    <thead className="table-headers">
                      <tr>
                        <th>Requester</th>
                        <th>Institution</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(searchParameter === "firstName"
                        ? completedFilterOrder
                        : completedDateFilter
                      ).length > 0 ? (
                        (searchParameter === "firstName"
                          ? completedFilterOrder
                          : completedDateFilter
                        ).map((transcript) => (
                          <tr
                            key={transcript._id}
                            onClick={() => {
                              setDisplay("populated");
                              setInfo(transcript);
                              handleBackground(transcript._id);
                            }}
                            className={
                              background === transcript._id ? "activeOrder" : ""
                            }
                          >
                            <td>{`${transcript.firstName} ${transcript.lastName}`}</td>
                            <td>{transcript.institution}</td>
                            <td>{transcript.date}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="no-order">
                          <p>No completed verifications</p>
                        </div>
                      )}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>  <ReactToExcel
                    className="excel-sheet"
                    table="table-to-xls"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText="EXPORT"
                  /></td>
                      </tr>
                    </tbody>
                  </table>
                
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="details">
              <h6>Details</h6>
              {display === "populated" && (
                <div className="container p-3">
                  <h5>individual details</h5>
                  <div className="individual-details">
                    <div className="para pt-2">
                      <p>first name: {info.firstName}</p>
                      <p className="p1">last name: {info.lastName}</p>
                    </div>
                    <div className="para">
                      <p>matric number: {info.studentId}</p>
                      <p className="p2">course: {info.course}</p>
                    </div>
                    <div className="para">
                      <p>grad year: {info.graduationYear}</p>
                      <p className="p3">reference id: IDF33245</p>
                    </div>
                  </div>
                  <h5>destination details</h5>
                  <div className="individual-details">
                    <div className="para pt-2">
                      <p>destination country: {info.destination}</p>
                    </div>
                    <div className="para">
                      <p>address line: {info.address}</p>
                    </div>
                    <div className="para">
                      <p>Zip/Postcode: {info.zipCode}</p>
                      <p className="p4">
                        destination no: {info.destinationNumber}
                      </p>
                      <p className="p5">city: {info.city}</p>
                    </div>
                  </div>
                  <div className="comment-section">
                    <div className="field">
                      <label htmlFor="message">comments</label>
                      <textarea
                        name="message"
                        type="text"
                        className="message"
                      />
                    </div>
                    <div className="select">
                    <Select
                          style={{ height: "40px" }}
                          showSearch
                          placeholder="Select status"
                          onChange={handleTranscriptStatus}
                        >
                          <Option value="processing">processing</Option>
                          <Option value="completed">completed</Option>
                        </Select>
                      <button
                        onClick={handleUpdateTranscript}
                        className="finish"
                      >
                        {loading ? "updating" : "submit"}{" "}
                        <FontAwesomeIcon
                          icon={faLongArrowAltRight}
                          style={{
                            marginLeft: "10px",
                            fontSize: "20px",
                            paddingTop: "0.3rem",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {display === "empty" && (
                <div className="details-info">
                  <p>
                    Please select an order to <br /> view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </RequestWrapper>
    </AdminLayout>
  );
};
const RequestWrapper = styled.div`
  background: var(--mainWhite);
  width: 100%;
  margin-top: -1.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 400px) {
    padding: 3rem 0;
  }
  @media (max-width: 500px) {
    padding: 3rem 0;
  }
  .select {
    .option {
      width: 12rem;
      height: 2rem;
      font-size: 1.2rem;
      color: #0092e0;
      outline: none;
      cursor: pointer;
    }
    input {
      padding: 0.2rem;
      outline: none;
    }
  }
  .list {
    list-style: none;
    border-bottom: 1px solid var(--lighterDark);
    justify-content: space-between;
    padding-left: 0px;
    padding-bottom: -4px;
    font-family: MontserratBold;
    letter-spacing: 0.44px;
    color: #173049;
    font-family: segoebold;
    opacity: 1;
    li {
      margin-right: 3rem;
      cursor: pointer;
      &.activeTab {
        border-bottom: 2px solid #0092e0;
        letter-spacing: 0.44px;
        color: #0092e0;
        padding-bottom: 1rem;
        opacity: 1;
        text-transform: capitalize;
      }
    }
  }
  .request-container {
    @media (max-width: 400px) {
      display: none;
    }
    @media (max-width: 500px) {
      display: none;
    }
  }
  .box {
    margin: -3rem 3rem;
    @media (max-width: 400px) {
      padding: 0;
      margin: 0;
    }
    @media (max-width: 500px) {
      margin: 0;
      padding: 0;
    }
  }
  .cards {
    display: flex;
    justify-content: space-around;
    margin-left: -3rem;
    margin-right: 2rem;
    cursor: pointer;
    margin-top: -1rem;
    @media (max-width: 400px) {
      display: block;
      padding: 2rem 0;
      margin-left: 0;
      margin-right: 0;
    }
    @media (max-width: 500px) {
      display: block;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      padding: 2rem 0;
    }
    .card1 {
      background: #e6e6e6;
      padding: 0.5rem;
      width: 12rem;
      height: 5rem;
      margin-right: 0.8rem;
      border-radius: 0.2rem;
      /* margin-left: -6rem; */
      cursor: pointer;
      @media (max-width: 400px) {
        margin-right: 0;
        width: 15rem;
        height: 5rem;
      }
      @media (max-width: 500px) {
        margin-left: 0.8rem;
        width: 15rem;
        height: 5rem;
      }
      h6 {
        font-weight: bolder;
        text-transform: capitalize;
        font-family: MontserratBold;
        color: #707070;
        letter-spacing: 0px;
        opacity: 1;
        font-size: 16px;
      }
      p {
        font-weight: lighter;
        font-size: 0.8rem;
        color: #707070;
        letter-spacing: 0.32px;
      }
    }
    .card2 {
      background: #e6e6e6;
      padding: 0.5rem;
      width: 12rem;
      height: 5rem;
      margin-left: 0.7rem;
      border-radius: 0.2rem;
      cursor: pointer;
      @media (max-width: 400px) {
        margin-left: 0;
        width: 15rem;
        height: 5rem;
      }
      @media (max-width: 500px) {
        margin-top: 2rem;
        width: 15rem;
        height: 5rem;
        margin-left: 0.8rem;
      }
      h6 {
        font-weight: bolder;
        text-transform: capitalize;
        font-family: MontserratBold;
        letter-spacing: 0.32px;
        color: #707070;
        opacity: 1;
        font-size: 16px;
      }
      p {
        font-weight: lighter;
        font-size: 0.8rem;
        letter-spacing: 0.32px;
        color: #707070;
      }
    }
    .para-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -0.3rem;
      .icon-box {
        background: var(--lightTransparent);
        padding: 0.4rem;
        border-radius: 30px;
        width: 2rem;
        height: 2rem;
      }
      .icon {
        color: #ffffff;
        margin-left: 0.3rem;
      }
    }
  }
  .activeCard1 {
    padding: 0.5rem;
    width: 12rem;
    height: 5rem;
    margin-right: 0.8rem;
    border-radius: 0.2rem;
    cursor: pointer;
    color: #ffffff;
    background-image: linear-gradient(
      to right,
      var(--lightBlue),
      var(--mainBlue)
    );
    @media (max-width: 400px) {
      margin-left: 0.8rem;
      width: 15rem;
      height: 5rem;
      margin-right: 2;
    }
    @media (max-width: 500px) {
      margin-left: 0.8rem;
      width: 15rem;
      height: 5rem;
      margin-right: 0;
    }
    h6 {
      font-weight: bolder;
      text-transform: capitalize;
      font-family: MontserratSemibold;
      letter-spacing: 0px;
      opacity: 1;
      font-size: 16px;
      color: #ffffff;
    }
    p {
      font-weight: lighter;
      letter-spacing: 0.32px;
      font-size: 0.8rem;
    }
  }
  .activeCard2 {
    padding: 0.5rem;
    width: 12rem;
    height: 5rem;
    margin-left: 0.7rem;
    border-radius: 0.2rem;
    cursor: pointer;
    color: #ffffff;
    background: red;
    @media (max-width: 400px) {
      margin-left: 0.8rem;
      width: 15rem;
      height: 5rem;
      margin-top: 2rem;
    }
    @media (max-width: 500px) {
      width: 15rem;
      height: 5rem;
      margin-left: 0.8rem;
      margin-top: 2rem;
    }
    h6 {
      font-weight: bolder;
      text-transform: capitalize;
      font-family: MontserratSemibold;
      letter-spacing: 0px;
      opacity: 1;
      color: #ffffff;
      font-size: 16px;
    }
    p {
      font-weight: lighter;
      letter-spacing: 0.32px;
      font-size: 0.8rem;
    }
  }

  .transcript-order {
    margin-top: -1rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
    letter-spacing: 0.44px;
    color: #173049;
    font-family: MontserratBold;
    opacity: 1;
    @media (max-width: 400px) {
      margin-left: 1rem;
    }
    @media (max-width: 500px) {
      margin-left: 1rem;
    }
  }
  .details-info {
    background: white;
    display: grid;
    place-items: center;
    min-height: 385px;
    padding: 1rem;
    border-radius: 10px;
    margin-right: 3rem;
    margin-bottom: 2rem;
    p {
      text-align: center;
      font-family: MontserratRegular;
      font-weight: normal;
      letter-spacing: 0.28px;
      color: #707070;
      opacity: 0.2;
    }
  }
  .new-table {
    position: relative;
    background: white;
    text-align: center;
    border-radius: 10px;
    min-height: 300px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-right: 3rem;
    min-width: 385px;
    @media (max-width: 400px) {
      margin-right: 0;
      width: 100%;
    }
    @media (max-width: 500px) {
      padding-left: 0.5rem;
      width: 100%;
    }
    .table-headers {
      font-family: MontserratBold;
      letter-spacing: 0.32px;
      color: #707070;
      font-weight: normal;
      opacity: 1;
    }
    tr {
      &.activeOrder {
        background: var(--mainWhite);
      }
    }
    th {
      padding: 0.5rem 3.3rem;
    }
    td {
      font-family: MontserratRegular;
      font-size: 12px;
      border-top: 0.2rem solid var(--mainWhite);
      cursor: pointer;
      font-weight: normal;
      letter-spacing: 0.28px;
      color: #707070;
      opacity: 0.8;
      padding: 10px;
    }
    .excel-sheet {
    margin-top:20px;
      padding: 0.3rem;
      border: none;
      color: #ffffff;
      background: #173049;
    }
    .no-order {
      position: absolute;
      left: 30%;
      top: 30%;
      p {
        text-align: center;
        font-family: MontserratRegular;
        font-weight: normal;
        letter-spacing: 0.28px;
        color: #707070;
        opacity: 0.2;
      }
    }
  }
  .details {
    margin-left: -1rem;
    min-width: 470px;
    margin-bottom: 2rem;
    h6 {
      text-transform: capitalize;
      letter-spacing: 0.44px;
      color: #173049;
      font-family: MontserratBold;
      margin-bottom: 1rem;
      opacity: 1;
      @media (max-width: 400px) {
        margin-left: 1rem;
      }
      @media (max-width: 500px) {
        margin-left: 1rem;
      }
    }
    @media (max-width: 400px) {
      margin-left: 0;
      margin-top: 2rem;
    }
    @media (max-width: 500px) {
      margin-left: 0;
      margin-top: 2rem;
    }
    .container {
      display: block;
      background: white;
      /* min-height: 400px; */
      text-align: left;
      border-radius: 10px;
      h5 {
        font-family: MontserratBold;
        letter-spacing: 0.32px;
        color: #707070;
        opacity: 1;
        text-transform: capitalize;
        font-weight: normal;
      }
      .individual-details {
        margin-top: 1rem;
        border-top: 2px solid var(--lighterDark);
      }
      .para {
        display: flex;
        font-family: MontserratRegular;
        font-weight: normal;
        letter-spacing: 0.28px;
        color: #707070;
        opacity: 0.8;
        justify-content: left;
        font-size: 12px;
        text-transform: capitalize;
        .p1 {
          padding-left: 3rem;
        }
        .p2 {
          padding-left: 1.8rem;
        }
        .p3 {
          padding-left: 5rem;
        }
        .p4 {
          padding-left: 1rem;
        }
        .p5 {
          padding-left: 1rem;
        }
      }
      .comment-section {
        display: flex;
        align-items: center;
        .ant-select-arrow {
          margin-top: -10px !important;
        }
      }
      .field {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        label {
          font-family: MontserratRegular;
          font-weight: normal;
          letter-spacing: 0.28px;
          color: #707070;
          opacity: 0.8;
        }
        textarea {
          width: 220px;
          height: 80px;
          font-family: MontserratRegular;
          font-weight: normal;
          letter-spacing: 0.28px;
          color: #707070;
          opacity: 1;
          margin-bottom: 0.5rem;
          border-radius: 10px;
          outline: none;
          padding: 0.5rem;
          font-size: 12px;
        }
      }
      .select {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
      }
      .options {
        width: 13rem;
        margin-top: 2rem;
        outline: none;
        cursor: pointer;
        padding: 0.5rem;
        color: #707070;
        text-transform: capitalize;
        .option {
          color: #707070;
          padding-bottom: 1rem;
        }
        input {
          padding: 1rem;
          font-size: 0.5rem;
        }
        @media (max-width: 400px) {
          width: 90px;
        }
      }
      .finish {
        background: #0092e0;
        margin-top: 1rem;
        width: 7.5rem;
        height: 35px;
        text-transform: capitalize;
        border: none;
        border-radius: 20px;
        color: #ffffff;
        outline: none;
      }
    }

    .details-info {
      background: white;
      display: grid;
      place-items: center;
      min-height: 400px;
      padding: 1rem;
      border-radius: 10px;
      p {
        text-align: center;
        font-family: MontserratRegular;
        font-weight: normal;
        letter-spacing: 0.28px;
        color: #707070;
        opacity: 0.2;
      }
    }
  }
`;

export default Requests;
