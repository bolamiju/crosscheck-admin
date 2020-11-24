// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
// import styled from 'styled-components';
// import qualifications from "../../asset/qualification.svg";



// const Requests = ({ history }) => {

//   const [activeTab, setActiveTab] = useState("order-transcripts");
//   const [pay, setPay] = useState(false);


//     return (
//             <AdminLayout history={history}>
//               <RequestWrapper>
//               <div className="container">
//             <div className="request-container ">
//             <ul className=" list d-flex">
//                 <Link to="/requests">
//                 <li
//                 onClick={() => {
//                   setActiveTab("order-transcripts");
//                   setPay(false);
//                 }}
//                 className={
//                   activeTab === "order-transcripts" ? "activeTab" : ""
//                 }
//               >
//                 <img src={qualifications} alt="details" />
//                 &nbsp; Order Transcript
//               </li>
//              </Link>
//                 <Link to="/requests">
//                 <li
//                       onClick={() => {
//                         setActiveTab("education-verification");
//                         setPay(false);
//                       }}
//                 className={activeTab === "education-verification" ? "activeTab" : ""}
//               >
//                 <img src={qualifications} alt="details" />
//                 &nbsp;  Education Verification
//               </li>
//              </Link>
//              .<Link to="/requests">
//              <li
//                       onClick={() => {
//                         setActiveTab("identity-verification");
//                         setPay(false);
//                       }}
//                 className={activeTab === "identity-verification" ? "activeTab" : ""}
//               >
//                 <img src={qualifications} alt="details" />
//                 &nbsp;  Identity Verification
//               </li>
//              </Link>
//                 <Link to="requests">
//                 <li
//                       onClick={() => {
//                         setActiveTab("credit-check");
//                         setPay(false);
//                       }}
//                 className={activeTab === "credit-check" ? "activeTab" : ""}
//               >
//                 <img src={qualifications} alt="details" />
//                 &nbsp; Credit Check
//               </li>
//              </Link>
//             </ul>
//             </div>
//           </div>
//               </RequestWrapper>
//             </AdminLayout>
//     )
// };
// const RequestWrapper = styled.div`
//  background: var(--mainWhite);
//   width: 100%;
//   margin-top: -1.25rem;
//   overflow-y: scroll;
//   height: 100%;
//   .container {
//     padding: 3rem 3rem;
//     display: block;
//   }
  
//   .list {
//     list-style: none;
//     border-bottom: 1px solid var(--lighterDark);
//     justify-content: space-between;
//     padding-left: 0px;
//     padding-bottom: -4px;

//     Link {
//       text-decoration: none;
//       &:hover {
//       text-decoration: none;
//     }
//     }
    
//     li {
//     margin-right: 3rem;
//     cursor: pointer;
//     text-decoration: none;
//     color: black;
//     &:hover {
//       text-decoration: none;
//     }
//     &.activeTab {
//           /* border-bottom: 2px solid #0092e0; */
//           letter-spacing: 0.44px;
//           padding-bottom: 1rem;
//           opacity: 1;
//           text-transform: capitalize;
//         }
//     }
//   }
// `
// export default Requests;
