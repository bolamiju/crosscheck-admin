import React from 'react'
import styled from 'styled-components'

export const RequestWrapper = styled.div`
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
      /* margin-right: 0.8rem; */
      border-radius: 0.2rem;
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
    margin-left: 11.2px;
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
    /* width: 100%; */
    min-width: 385px;
    min-height: 250px;
    margin-bottom: 2rem;
    .excel-sheet {
     margin-top:20px;
      padding: 0.3rem;
      border: none;
      color: #ffffff;
      background: #173049;
    }
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
      padding: 10px;
      color: #707070;
      opacity: 0.8;
     
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