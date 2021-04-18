import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { DatePicker, Space, Select } from "antd";
import ReactToExcel from "react-html-table-to-excel";
import qualifications from "../../asset/qualification.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  getVerificationsByStatus,
} from "../../state/actions/verifications";
import DetailsCard from "./DetailsCard"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {RequestWrapper} from './RequestStyles.js'


const Requests = ({ history }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [activeCard, setActiveCard] = useState("new");
  const [display, setDisplay] = useState("empty");
  const [background, setBackground] = useState("");
 
  const [info, setInfo] = useState({});
  const [searchParameter, setSearchParameter] = useState("name");
  const [nameInput, setNameInput] = useState("");
  const [id,setId] = useState('')
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
 
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();
  const {
    pendingVerifications,
    processingVerifications,
    completedVerifications,
  } = useSelector((state) => state.verifications);

  useEffect(() => {
    if (activeTab === "pending") {
      dispatch(getVerificationsByStatus("pending"));
    } else if (activeTab === "processing") {
      dispatch(getVerificationsByStatus("processing"));
    } else if (activeTab === "completed") {
      dispatch(getVerificationsByStatus("completed"));
    }
  }, [dispatch, activeTab]);

  const handleBackground = (background) => {
    setBackground(background);
  };

  const handleDateRange = (value, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const pendingFilterOrder = pendingVerifications.filter((verification) =>
    verification[searchParameter].toLowerCase().includes(nameInput.toLowerCase())
  );
  const pendingIdFilterOrder = pendingVerifications.filter((verification) =>
    verification[searchParameter].includes(id)
  );

  const min = Date.parse(startDate);
  const max = Date.parse(endDate);

  const pendingDateFilter = pendingVerifications.filter((verification) => {
    if (
      Date.parse(verification[searchParameter]) >= min &&
      Date.parse(verification[searchParameter]) <= max
    ) {
      return verification;
    }
  });

  const processingFilterOrder = processingVerifications.filter((verification) =>
    verification[searchParameter].toLowerCase().includes(nameInput.toLowerCase())
  );
  const processingIdFilterOrder = processingVerifications.filter((verification) =>
    verification[searchParameter].includes(id)
  );

  const processingDateFilter = processingVerifications.filter(
    (verification) => {
      if (
        Date.parse(verification[searchParameter]) >= min &&
        Date.parse(verification[searchParameter]) <= max
      ) {
        return verification;
      }
    }
  );

  const completedFilterOrder = completedVerifications.filter((verification) =>
    verification[searchParameter].toLowerCase().includes(nameInput.toLowerCase())
  );

const completedIdFilterOrder = completedVerifications.filter((verification) =>
    verification[searchParameter].includes(id)
  );
  const completedDateFilter = completedVerifications.filter((verification) => {
    if (
      Date.parse(verification[searchParameter]) >= min &&
      Date.parse(verification[searchParameter]) <= max
    ) {
      return verification;
    }
  });
console.log('sea',searchParameter)
  const handleSelectChange = (e) => {
    e.preventDefault();
    setSearchParameter(e.target.value);
    setNameInput("");
  };
  const handleChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleId = (e) =>{
    setId(e.target.value)
  }

 
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
            onChange={handleSelectChange}
          >
            {/* <option value="no-value" disabled>
              Filter by
            </option> */}
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="id">Id</option>
          </select>
          {searchParameter === "name" && (
            <input
              type="text"
              name="nameInput"
              value={nameInput}
              onChange={handleChange}
            />
          )}
          {searchParameter === "id" && (
            <input
              type="text"
              name="id"
              value={id}
              onChange={handleId}
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
                   if(activeTab !== "pending"){
                    setDisplay("empty")}
                  setActiveTab("pending");
                   setNameInput("")
                   setId("")
                  
                }}
                className={activeTab === "pending" ? "activeTab" : ""}
              >
                <img className="active" src={qualifications} alt="details" />
                &nbsp; Pending Order
              </li>
              <li
                onClick={() => {
                   if(activeTab !== "processing"){
                    setDisplay("empty")}
                  setActiveTab("processing");
                   setNameInput("")
                   setId("")
                    setInfo({})
                }}
                className={activeTab === "processing" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp; Processing Order
              </li>
              <li
                onClick={() => {
                   if(activeTab !== "completed"){
                    setDisplay("empty")}
                  setActiveTab("completed");
                    setNameInput("")
                    setId("")
                    setInfo({})
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
                      View new education <br /> orders
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
                
              </div>
              <div>
                {activeCard === "new" ? (
                  <h6 className="transcript-order">new education order</h6>
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
                        {(searchParameter === "name" 
                          ? pendingFilterOrder : searchParameter === "id" ? pendingIdFilterOrder
                          :  pendingDateFilter
                        ).length > 0 ? (
                          (searchParameter === "name" 
                            ? pendingFilterOrder : searchParameter === "id" ? pendingIdFilterOrder
                            : pendingDateFilter
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
                          <td></td> <ReactToExcel
                      className="excel-sheet"
                      table="table-to-xls"
                      filename="excelFile"
                      sheet="sheet 1"
                      buttonText="EXPORT"
                    /></tr>
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
                      {(searchParameter === "name"
                        ? processingFilterOrder : searchParameter === "id" ? processingIdFilterOrder
                        : processingDateFilter
                      ).length > 0 ? (
                        (searchParameter === "name"
                          ? processingFilterOrder : searchParameter === "id" ? processingIdFilterOrder
                          : processingDateFilter
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
                          <p>No verifications is being processed</p>
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
                      {(searchParameter === "name"
                        ? completedFilterOrder : searchParameter === "id" ? completedIdFilterOrder
                        : completedDateFilter
                      ).length > 0 ? (
                        (searchParameter === "name"
                          ? completedFilterOrder : searchParameter === "id" ? completedIdFilterOrder
                        : completedDateFilter
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
               <DetailsCard activeTab={activeTab} info={info}/>
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
          {/* )} */}
        </div>
      </RequestWrapper>
    </AdminLayout>
  );
};

export default Requests;
