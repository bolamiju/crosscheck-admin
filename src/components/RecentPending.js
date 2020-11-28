import React from "react";
import styled from "styled-components";
import Avatar from "../asset/Avatar.png";


const RecentPending = () => {
    
    const Request = {
      id: 1,
      img: Avatar,
      name: "Nuzhat Yesmin",
      type: "Identification Verification",
      date: "10 Nov 2020",
    };

  return (
    <PendingWrapper>
      <div className=" title d-flex justify-content-between mr-4">
        <h6>recent pending</h6>
        <p>
          total <span>10</span>
        </p>
      </div>
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
              <td><img src={Request.img} alt=""/></td>
              <td>{Request.name}</td>
              </div>
              <td>{Request.type}</td>
              <td>{Request.date}</td>
            </tr>
            <tr>
              <div>
              <td><img src={Request.img} alt=""/></td>
              <td>{Request.name}</td>
              </div>
              <td>{Request.type}</td>
              <td>{Request.date}</td>
            </tr>
            <tr>
              <div>
              <td><img src={Request.img} alt=""/></td>
              <td>{Request.name}</td>
              </div>
              <td>{Request.type}</td>
              <td>{Request.date}</td>
            </tr>
            <tr>
              <div>
              <td><img src={Request.img} alt=""/></td>
              <td>{Request.name}</td>
              </div>
              <td>{Request.type}</td>
              <td>{Request.date}</td>
            </tr>
          </tbody>
          
          </table>
      </div>
    </PendingWrapper>
  );
};

const PendingWrapper = styled.div`
  width: 500px;
  text-transform: capitalize;
  /* margin-right: 1rem; */
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (max-width: 1300px) {
    margin-right: 1rem;
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
    /* padding: 1rem; */
    text-align: center;

    td,
      th {
        padding: 10px;
      }
      td {
        border-top: 0.2rem solid var(--mainWhite);
      }
  }
`
export default RecentPending;
