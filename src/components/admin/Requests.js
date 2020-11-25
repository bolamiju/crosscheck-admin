import React, { useState } from 'react';
import AdminLayout from "./AdminLayout";
import styled from 'styled-components';
import Avatar from "../../asset/Avatar.png";
import qualifications from "../../asset/qualification.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";



const Requests = ({ history }) => {

  const [activeTab, setActiveTab] = useState("order-transcripts");
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
              <div className="container">
            <div className="request-container ">
            <ul className=" list d-flex">
              <li
                onClick={() => {
                  setActiveTab("order-transcripts");
                  setPay(false);
                }}
                className={
                  activeTab === "order-transcripts" ? "activeTab" : ""
                }
              >
                <img className="active" src={qualifications} alt="details" />
                &nbsp; Transcript Order
              </li>
              <li
                      onClick={() => {
                        setActiveTab("education-verification");
                        setPay(false);
                      }}
                className={activeTab === "education-verification" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp;  Education Verification
              </li>
              <li
                      onClick={() => {
                        setActiveTab("identity-verification");
                        setPay(false);
                      }}
                className={activeTab === "identity-verification" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp;  Identity Verification
              </li>
              <li
                      onClick={() => {
                        setActiveTab("credit-check");
                        setPay(false);
                      }}
                className={activeTab === "credit-check" ? "activeTab" : ""}
              >
                <img src={qualifications} alt="details" />
                &nbsp; Credit Check
              </li>
            </ul>
            </div>
            {activeTab === "order-transcripts" && (
              <div className="d-block d-lg-flex">
                <OrderWrapper className="py-3">
              <div className=" title d-flex justify-content-between">
                <h6>new transcript orders</h6>
              </div>
              <div className="card px-4 pt-3 pb-4">
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
                  <ItemWrapper>
                  <div className="row align-items-center">
                <div className="d-flex justify-content-between">
                  <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                  <p className="pt-3">{Requests.name}</p>
                </div>
                <p className="pt-3">{Requests.type}</p>
                <p className="pt-3">{Requests.date}</p>
              </div>
              <div className="row">
                <div className="d-flex justify-content-between">
                 <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                 <p className="pt-3">{Requests.name}</p>
                </div>
                <p className="pt-3">{Requests.type}</p>
                <p className="pt-3">{Requests.date}</p>
              </div>
              <div className="row">
                <div className="d-flex justify-content-between align-items-center">
                 <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                  <p className="pt-3">{Requests.name}</p>
                </div>
                <p className="pt-3">{Requests.type}</p>
                <p className="pt-3">{Requests.date}</p>
              </div>
              <div className="row">
                <div className="d-flex justify-content-between">
                <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                <p className="pt-3">{Requests.name}</p>
              </div>
              <p className="pt-3">{Requests.type}</p>
              <p className="pt-3">{Requests.date}</p>
                </div>
                <div className="row">
                <div className="d-flex justify-content-between">
                <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                <p className="pt-3">{Requests.name}</p>
              </div>
              <p className="pt-3">{Requests.type}</p>
              <p className="pt-3">{Requests.date}</p>
                  </div>
                  <div className="row">
                <div className="d-flex justify-content-between">
                <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                <p className="pt-3">{Requests.name}</p>
              </div>
              <p className="pt-3">{Requests.type}</p>
              <p className="pt-3">{Requests.date}</p>
                  </div>
                  <div className="row">
                <div className="d-flex justify-content-between">
                <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                <p className="pt-3">{Requests.name}</p>
              </div>
              <p className="pt-3">{Requests.type}</p>
              <p className="pt-3">{Requests.date}</p>
                  </div>
                  <div className="row">
                <div className="d-flex justify-content-between">
                <img src={Requests.img} alt="request" className="image mr-2 mt-1" />
                <p className="pt-3">{Requests.name}</p>
              </div>
              <p className="pt-3">{Requests.type}</p>
              <p className="pt-3">{Requests.date}</p>
                </div>
              </ItemWrapper>
                </div>
                </OrderWrapper>
                <DetailsWrapper className="py-3">
                  <div className=" title d-flex justify-content-between">
                  <h6>details</h6>
                 </div>
                  <div className="card px-4 pt-3 pb-4">
                    <h6>transcript order for</h6>
                    <div className="comment">
                    <form>
                      <label>comments</label>
                      <br/>
                      <input />
                    </form>
                    <div className="select">
                    <select name="todos" className="options">
                    <option value="action">Action</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                    </select>
                      </div>
                      <button
                        className="btn"
                        type="submmit"
                        onClick={() => {
                        setActiveTab("education-verification");
                        setPay(true);
                        }}
                      >
                        Finish
                        <FontAwesomeIcon icon={faLongArrowAltRight} style={{marginLeft: "10px", fontSize: "20px"}} />
                      </button>
                
                
                
                
                   </div>
                </div>
                </DetailsWrapper>
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
  .container {
    padding: 3rem 3rem;
    display: block;
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
    opacity: 1;
    
    li {
    margin-right: 3rem;
    cursor: pointer;
    &.activeTab {
      .active {
        color: #0092E0;
      }
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
`
const OrderWrapper = styled.div`
width: 50%;
margin-right: 2rem;
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
    .heading {
    font-family: MontserratBold;
    letter-spacing: 0.32px;
    color: #707070;
    opacity: 1;
  }
  }
`
const ItemWrapper = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 2rem;
  font-size: 0.8rem;
  align-items: center;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 0.2rem solid var(--mainWhite);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    p {
      font-family: MontserratRegular;
      letter-spacing: 0.28px;
      color: #707070;
      opacity: 1;
    }
    @media (max-width: 400px) {
    }
  }
  .image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #e2e2ea;
    opacity: 1;
  }
`
const DetailsWrapper = styled.div`
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
    .heading {
    font-family: MontserratBold;
    letter-spacing: 0.32px;
    color: #707070;
    opacity: 1;
  }
  }
  .card {
    height: 70%;
    .container {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .comment {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    margin-bottom: 20px;
    font-family: MontserratRegular;
      letter-spacing: 0.28px;
      color: #707070;
      opacity: 1;
    input {
      width: 250px;
      height: 90px;
      border: 0.1px solid #707070;
      border-radius: 10px;
      outline: none;
      color: #707070;
      padding: 5px;
    }
    .select {
      margin-left: 1rem;
      margin-top: 2rem;
    }
    .options {
      font-family: MontserratRegular;
      letter-spacing: 0.44px;
      color: #0092E0;
      opacity: 1;
      width: 100px;
      height: 35px;
      outline: none;
      border-radius: 5px;
      padding: 0.4rem;
    }
    .btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    margin-top: 5rem;
    margin-left: -6rem;
    padding: 1.3rem;
    background: #0092e0;
    border-radius: 25px;
    opacity: 1;
    height: 30px;
    outline: none;
    border-color: #0092e0;
    }
  }
  
`

export default Requests;
