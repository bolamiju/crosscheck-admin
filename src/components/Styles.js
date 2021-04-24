import styled from 'styled-components'

export const SelectSch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  padding-bottom: 25px;
  box-shadow: 0px 0px 10px #00000029;
  margin-top: 20px;
  .selects {
    display: flex;
    margin-top: 25px;
    width: 100%;
    .sch-select {
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      padding-left: 20px;
      width: 46%;
      label {
        font-family: MontserratRegular;
        font-size: 12px;
        text-transform: uppercase;
        color: #707070;
      }
      .schl-input {
        height: 28px;
        border: 2px solid #e2e2e2;
        outline: none;
        font-family: MontserratItalic;
        border-radius: 14px;
        padding-left: 5px;
        padding-left: 15px;
        @media screen and (max-width: 500px) {
          font-size: 16px;
          width: 250px;
        }
        @media (max-width: 500px) {
          width: 100%;
        }
      }
      @media (max-width: 500px) {
        width: 80%;
        padding-right: 0px;
      }
    }
    .country-select {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      width: 46%;
      label {
        font-family: MontserratRegular;
        font-size: 12px;
        text-transform: uppercase;
        color: #707070;
      }
      @media (max-width: 500px) {
        width: 87%;
        margin-bottom: 15px;
        margin-top: 15px;
      }
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }
  .req-trans {
    display: flex;
    width: 35%;
    padding-left: 20px;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;
    @media (max-width: 500px) {
      width: 100%;
      padding-left: 10px;
    }
    .paragraph {
      p {
        &:nth-child(1) {
          font-family: segoebold;
          font-size: 15px;
          letter-spacing: 0.44px;
          color: #173049;
          text-transform: capitalize;
        }
        &:nth-child(2) {
          font-family: MontserratRegular;
          font-size: 14px;
          letter-spacing: 0.44px;
          color: #707070;
          margin: 0;
        }
      }
      @media (max-width: 500px) {
        padding-right: 20px;
      }
    }

    p {
      &:nth-child(1) {
        font-weight: bold;
        margin-bottom: 3px;
      }
      &:nth-child(2) {
        font-size: 14px;
        font: normal normal medium 15px/19px Montserrat;
        letter-spacing: 0.3px;
        color: #707070;
        margin: 0;
      }
    }
  }
`;


export const DashboardBody = styled.div`
  height: 100%;
  padding-left: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  font-family: "Rubik", sans-serif;
  ::-webkit-scrollbar {
    display: none;
  }


  .input{
    width:300px;
    outline:none;
    border:1px solid grey;
    height:35px
  }
  .create-button{
    width:200px;
    height:35px;
    margin-left:140px;
      outline:none;
      color:white;
      border-radius:10px;
      background:#0092e0;
      border: 1px solid #0092e0;
  }
  .add-new-btn{
      margin:20px;
      outline:none;
      color:white;
      border-radius:10px;
      background:#0092e0;
      border: 1px solid #0092e0;
  }
  .tabs {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    /* margin: 0 auto; */
    @media (max-width: 500px) {
      display: none;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 0px !important;
      margin-bottom: 0px !important;
      li {
        list-style-type: none;
        margin-right: 45px;
        cursor: pointer;

        &.activeTab {
          border-bottom: 2px solid #0092e0;
          letter-spacing: 0.44px;
          color: #0092e0;
          opacity: 1;
          text-transform: capitalize;
        }
      }
    }
  }
  .new-table {
    margin-top: 10px;
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    box-shadow: 0px 0px 10px #00000029;

    /* height: 90%; */
    overflow-x: hidden;
    margin-bottom: 10px;
    padding-bottom: 20px;
    @media (max-width: 400px) {
      overflow-x: scroll;
    }
    @media (max-width: 500px) {
      overflow-x: scroll;
    }
    .hide-table {
      display: none;
    }
    table {
      margin: 0 auto;
      width: 95%;
      border-collapse: collapse;
      overflow: hidden;
      font-size: 14px;
      text-align: left;
      .mobile-header {
        display: none;
      }
      input{
          border:none;
      }
      td,
      th {
        padding: 10px;
        @media (max-width: 500px) {
          padding: 9px !important;
        }
      }

      th {
        background-color: #1e2a36;
        color: white;
      }

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
    @media (max-width: 400px) {
      text-align: center;
    }
    @media (max-width: 500px) {
      text-align: center;
    }
    .showing-search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 4rem;
      @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }
      @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }

      .showing {
        font-family: MontserratRegular;
        letter-spacing: 0.44px;
        color: #707070;
        opacity: 1;
        margin-left: 50px;
        @media (max-width: 400px) {
          margin-left: 0;
        }
        @media (max-width: 500px) {
          margin-left: 0;
        }
      }
      .search-input {
        position: relative;
        padding: 0.5rem;

        input {
          height: 1rem;
          padding: 0.2rem;
          outline: none;
        }
        @media (max-width: 400px) {
          margin-bottom: 1rem;
          margin-left: 0;
        }
        @media (max-width: 500px) {
          margin-bottom: 1rem;
          margin-left: 0;
        }
        .icon {
          position: absolute;
          top: 30%;
          right: 5%;
          opacity: 0.7;
          color: #2c3e50;
        }
      }
    }
  }

  .spacer {
    margin-top: 4rem;
  
  }

`;