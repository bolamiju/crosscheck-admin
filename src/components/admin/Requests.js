import React, { useState } from 'react';
import AdminLayout from "./AdminLayout";
import styled from 'styled-components';
import Avatar from "../../asset/Avatar.png";
import qualifications from "../../asset/qualification.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight, faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";



const Requests = ({ history }) => {

  const [activeTab, setActiveTab] = useState("pending");
  const [activeCard, setActiveCard] = useState("new");
  const [pay, setPay] = useState(false);

  const Requests = {
    id: 1,
    img: Avatar,
    name: "Nuzhat Yesmin",
    type: "Identification Verification",
    date: "10 Nov 2020",
  };

  return (
    <AdminLayout history={history}>
      <RequestWrapper>
        <div className="">
          <div className="request-container p-5">
            <ul className=" list d-flex">
              <li
                onClick={() => {
                  setActiveTab("pending");
                  setPay(false);
                }}
                className={
                  activeTab === "pending" ? "activeTab" : ""
                }
              >
                <img className="active" src={qualifications} alt="details" />
                &nbsp; Pending Order
              </li>
              <li
                onClick={() => {
                  setActiveTab("processing");
                  setPay(false);
                }}
                className={activeTab === "processing" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp;  Processing Order
              </li>
              <li
                onClick={() => {
                  setActiveTab("completed");
                  setPay(false);
                }}
                className={activeTab === "completed" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp;  Completed Order
              </li>

            </ul>
          </div>
          {activeTab === "pending" && (
            <div className="box d-block d-lg-flex py-1">
              <div>
                <div className="cards px-5 py-5">
                  <div
                    onClick={() => {
                      setActiveCard("new")

                    }}
                    className={activeCard === "new" ? "activeCard1" : "card1"}>
                    <h6>new</h6>
                    <div className="para-icon">
                      <p>
                        view new transcript <br /> orders
                    </p>
                      <div className="icon-box">
                      <FontAwesomeIcon className="icon" icon={faLongArrowAltDown} style={{ fontSize: "20px" }} />
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setActiveCard("pendings")
                    }}
                    className={activeCard === "pendings" ? "activeCard2" : "card2"}>
                    <h6>pendings</h6>
                    <div className="para-icon">
                      <p>
                        take actions on <br /> pending activities
                    </p>
                      <div className="icon-box">
                      <FontAwesomeIcon className="icon" icon={faLongArrowAltDown} style={{ fontSize: "20px" }} />
                     </div>
                    </div>
                  </div>
                </div>
                <div>
                  {activeCard === "new" ? <h6 className="transcript order">new transcript order</h6> : <h6 className="transcript-order"> pending order</h6>}
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
                          <th>Type</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="details">
                <p>Details</p>
                <div className="details-info">
                  <p>Please select an order to view details</p>
                </div>
              </div>
            </div>
          )}
           {activeTab === "pending" && (
            <div className="box d-block d-lg-flex py-1">
              <div>
                <div>
                  <h6 className="transcript-order">pending transcript order</h6>
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
                          <th>Type</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                        <tr>
                          <div>
                            <td><img src={Requests.img} alt="" /></td>
                            <td>{Requests.name}</td>
                          </div>
                          <td>{Requests.type}</td>
                          <td>{Requests.date}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="details">
                <p>Details</p>
                <div className="details-info">
                  <p>Please select an order to view details</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </RequestWrapper>
    </AdminLayout>
  )
};
const RequestWrapper = styled.div`
 background: var(--mainWhite);
  width: 100%;
  margin-top: -1.25rem;
  overflow-y: scroll;
  height: 100%;
  @media (max-width: 400px) {
    padding: 3rem 0;
  }
  @media (max-width: 500px) {
    padding: 3rem 0;
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
          color: #0092E0;
          padding-bottom: 1rem;
          opacity: 1;
          text-transform: capitalize;
        }
    }
  }
  .request-container {
    @media (max-width: 400px) {
      display:none;
    }
    @media (max-width: 500px) {
      display:none;
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
    margin-left: -3rem;
    cursor: pointer;
    @media (max-width: 400px) {
      display: block;
      padding: 2rem 0;
    margin-left: 1.5rem;
    margin-right: 1.5rem;

    }
    @media (max-width: 500px) {
      display: block;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
      padding: 2rem 0;
    }
  }
  
  .card1 {
    background: #E6E6E6;
    padding: 1rem;
    margin-left: 2rem;
    width: 15rem;
    height: 6rem;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
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
      text-transform: capitalize;
      font-weight: lighter;
      color: #707070;
      font-size: 16px;
      letter-spacing: 0.32px;
      font-family: MontserratRegular;
    }
  }
  .card2 {
    background: #E6E6E6;
    padding: 1rem;
    width: 15rem;
    height: 6rem;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
      margin-top: 2rem;
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
      text-transform: capitalize;
      font-weight: lighter;
      letter-spacing: 0.32px;
      font-size: 0.8rem;
      color: #707070;
      font-family: MontserratRegular;
    }
  }
  .para-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  
  .activeCard1 {
    padding: 1rem;
    width: 15rem;
    height: 6rem;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
    color: #ffffff;
      background-image: linear-gradient(
      to right,
      var(--lightBlue),
      var(--mainBlue)
    );
    
    h6 {
      font-weight: bolder;
      text-transform: capitalize;
      font-family: MontserratSemibold;
      letter-spacing: 0px;
      opacity: 1;
      font-size: 16px;
    }
    p {
      text-transform: capitalize;
      font-weight: lighter;
      font-size: 0.8rem;
    }
    }
    .activeCard2 {
    padding: 1rem;
    width: 15rem;
    height: 6rem;
    margin-right: 1.5rem;
    border-radius: 0.2rem;
    cursor: pointer;
    color: #ffffff;
    background: red;
    @media (max-width: 400px) {
      margin-top: 3rem;
    }
    @media (max-width: 500px) {
      margin-top: 3rem;
    }
    h6 {
      font-weight: bolder;
      text-transform: capitalize;
      font-family: MontserratSemibold;
      letter-spacing: 0px;
      opacity: 1;
      font-size: 16px;
    }
    p {
      text-transform: capitalize;
      font-weight: lighter;
      font-size: 0.8rem;
    }
    }
  .transcript-order {
    text-transform: capitalize;
    margin-bottom: 1rem;
    letter-spacing: 0.44px;
   color: #173049;
   font-family: MontserratBold;
   opacity: 1;
  }
  .new-table {
    background: white;
    text-align: center;
    margin-right: 1.5rem;
    align-items: center;
    padding-left: 1.5rem;
    border-radius: 10px;
    width: 90%;
    @media (max-width: 400px) {
      width: 100%;
    }

    td,
      th {
        padding: 10px;
      }
      td {
        font-size: 0.8rem;
        border-top: 0.2rem solid var(--mainWhite);
      }
  }
  .details {
    margin-left: 1rem;
    width: 70%;
    @media (max-width: 400px) {
      margin-top: 2rem;
    }
    @media (max-width: 500px) {
      margin-top: 2rem;
    }
    .details-info {
      background: white;
      display: grid;
      place-items: center;
      height: 400px;
      padding: 1rem;
      border-radius: 10px;
      p {
        text-align: center;
      }
    }
  }
`

export default Requests;
