// import React, { useState, useEffect } from 'react';
// import AdminLayout from "./AdminLayout";
// import styled from 'styled-components';
// import Avatar from "../../asset/Avatar.png";
// import qualifications from "../../asset/qualification.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLongArrowAltRight, faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";

// import { useDispatch, useSelector } from "react-redux";
// import { getPendingVerification } from "../../state/actions/verifications";

// const Requests = ({ history }) => {

//   const [activeTab, setActiveTab] = useState("pending");
//   const [activeCard, setActiveCard] = useState("new");
//   const [display, setDisplay] = useState("empty");
//   const [background, setBackground] = useState("");
//   const [pay, setPay] = useState(false);

//   const dispatch = useDispatch();
//   const { pending_verifications } = useSelector((state) => state.verifications)

//   useEffect(() => {
//     if(activeTab === "pending"){

//       dispatch(getPendingVerification('pending'))
//     }
//     else if(activeTab === "processing"){
//       dispatch(getPendingVerification('processing'))
//     }
//     else if(activeTab === "completed"){
//       dispatch(getPendingVerification('completed'))
//     }
//   }, [dispatch])

//   const handleBackground = background =>  {
//       setBackground( background  );
//   };
//   return (
//     <AdminLayout history={history}>
//       <RequestWrapper>
//         <div className="">
//           <div className="request-container p-5">
//             <ul className=" list d-flex">
//               <li
//                 onClick={() => {
//                   setActiveTab("pending");
//                   setPay(false);
//                 }}
//                 className={
//                   activeTab === "pending" ? "activeTab" : ""
//                 }
//               >
//                 <img className="active" src={qualifications} alt="details" />
//                 &nbsp; Pending Order
//               </li>
//               <li
//                 onClick={() => {
//                   setActiveTab("processing");
//                   setPay(false);
//                 }}
//                 className={activeTab === "processing" ? "activeTab" : ""}
//               >
//                 <img src={qualifications} alt="details" />
//                 &nbsp;  Processing Order
//               </li>
//               <li
//                 onClick={() => {
//                   setActiveTab("completed");
//                   setPay(false);
//                 }}
//                 className={activeTab === "completed" ? "activeTab" : ""}
//               >
//                 <img src={qualifications} alt="details" />
//                 &nbsp;  Completed Order
//               </li>

//             </ul>
//           </div>
//             <div className="box d-block d-lg-flex py-1">
//               <div>
//                 <div className="cards px-5 py-5">
//                   <div
//                     onClick={() => {
//                       setActiveCard("new")

//                     }}
//                     className={activeCard === "new" ? "activeCard1" : "card1"}>
//                     <h6>new</h6>
//                     <div className="para-icon">
//                       <p>
//                         View new Credit <br /> orders
//                     </p>
//                       <div className="icon-box">
//                         <FontAwesomeIcon className="icon" icon={faLongArrowAltDown} style={{ fontSize: "20px" }} />
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     onClick={() => {
//                       setActiveCard("pendings")
//                     }}
//                     className={activeCard === "pendings" ? "activeCard2" : "card2"}>
//                     <h6>pendings</h6>
//                     <div className="para-icon">
//                       <p>
//                         Take actions on <br /> pending activities
//                     </p>
//                       <div className="icon-box">
//                         <FontAwesomeIcon className="icon" icon={faLongArrowAltDown} style={{ fontSize: "20px" }} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   {activeCard === "new" ? <h6 className="transcript-order">new Credit Check order</h6> : <h6 className="transcript-order"> pending order</h6>}
//                   {activeCard === "new" ? (
//                     <div className="new-table">
//                     <table
//                       cellSpacing="0"
//                       cellPadding="0"
//                       border="0"
//                       className="ideTable"
//                     >
//                       <thead className="table-headers">
//                         <tr>
//                           <th>Requester</th>
//                           <th>Type</th>
//                           <th>Date</th>
//                         </tr>
//                       </thead>
//                       <tbody >
//                         {pending_verifications.map(verification => (
//                           <tr
//                             key={verification._id}
//                             onClick={() => {
//                             setDisplay("populated")
//                             handleBackground(verification._id)
//                           }}
                            
//                             className={background === verification._id ? "activeOrder" : ""}
//                           >
//                             <td>{verification.firstName}    {verification.lastName}</td>
//                             <td>{verification.type}</td>
//                             <td>{verification.date}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   ) : <div className="details-info"> <p>No pending order</p></div>}
                  
//                 </div>
//               </div>
//               <div className="details">
//                 <h6>Details</h6>
//                 {display === "populated" && (
//                   <div className="container p-3">
//                     <h5>individual details</h5>
//                     <div className="individual-details">
//                       <div className="para pt-2">
//                         <p>first name: ayobami</p>
//                         <p className="p1">last name: tayo</p>
//                       </div>
//                       <div className="para">
//                         <p>matric number: 121629</p>
//                         <p className="p2">course: Food Engineering</p>
//                       </div>
//                       <div className="para">
//                         <p>grad year: 2018</p>
//                         <p className="p3">reference id: IDF33245</p>
//                       </div>
//                     </div>
//                     <h5>destination details</h5>
//                     <div className="individual-details">
//                       <div className="para pt-2">
//                         <p>destination country: ghana</p>
//                       </div>
//                       <div className="para">
//                         <p>address line: kwame nkrumah crescent, dowe road</p>
//                       </div>
//                       <div className="para">
//                         <p>Zip/Postcode: 100012</p>
//                         <p className="p4">destination no: +2345667</p>
//                         <p className="p5">city: +2345667</p>
//                       </div>
//                     </div>
//                     <div className="comment-section">
//                     <div className="field">
//                       <label htmlFor="message">comments</label>
//                       <textarea
//                         name="message"
//                         type="text"
//                         className="message"
//                       />
//                     </div>
//                     <div className="select">
//                       <select name="todos" className="options">
//                         <option value="action">Actions</option>
//                         <option value="pending">Mark as Pending</option>
//                         <option value="completed">Cancel Enquiry</option>
//                         </select>
//                          <button className="finish">finish <FontAwesomeIcon icon={faLongArrowAltRight} style={{marginLeft: '10px', fontSize: "20px" }} /></button>
//                     </div>
//                    </div>
//                   </div>

//                 )
//                 }
//                 {display === "empty" && (<div className="details-info">
//                   <p>Please select an order to <br/> view details</p>
//                 </div>)}

//               </div>
//             </div>
//         </div>
//       </RequestWrapper>
//     </AdminLayout>
//   )
// };
// const RequestWrapper = styled.div`
//  background: var(--mainWhite);
//   width: 100%;
//   margin-top: -1.25rem;
//   overflow-y: scroll;
//   overflow-x: hidden;
//   height: 100%;
//   @media (max-width: 400px) {
//     padding: 3rem 0;
//   }
//   @media (max-width: 500px) {
//     padding: 3rem 0;
//   }
//   .list {
//     list-style: none;
//     border-bottom: 1px solid var(--lighterDark);
//     justify-content: space-between;
//     padding-left: 0px;
//     padding-bottom: -4px;
//     font-family: MontserratBold;
//     letter-spacing: 0.44px;
//     color: #173049;
//     font-family: segoebold;
//     opacity: 1;
    
//     li {
//     margin-right: 3rem;
//     cursor: pointer;
//     &.activeTab {
//           border-bottom: 2px solid #0092e0;
//           letter-spacing: 0.44px;
//           color: #0092E0;
//           padding-bottom: 1rem;
//           opacity: 1;
//           text-transform: capitalize;
//         }
//     }
//   }
//   .request-container {
//     @media (max-width: 400px) {
//       display:none;
//     }
//     @media (max-width: 500px) {
//       display:none;
//     }
//   }
//   .box {
//     margin: -3rem 3rem;
//     @media (max-width: 400px) {
//     padding: 0;
//     margin: 0;
//     }
//     @media (max-width: 500px) {
//     margin: 0;
//     padding: 0;
//     }
//   }
//   .cards {
//     display: flex;
//     justify-content: space-around;
//     margin-left: -3rem;
//     cursor: pointer;
//     margin-top: -1rem;
//     @media (max-width: 400px) {
//       display: block;
//       padding: 2rem 0;
//     margin-left: 0;
//     margin-right: 0;

//     }
//     @media (max-width: 500px) {
//       display: block;
//     margin-left: 1.5rem;
//     margin-right: 1.5rem;
//       padding: 2rem 0;
//     }
//     .card1 {
//     background: #E6E6E6;
//     padding: 0.5rem;
//     width: 12rem;
//     height: 5rem;
//     margin-right: 0.8rem;
//     border-radius: 0.2rem;
//     cursor: pointer;
//     @media (max-width: 400px) {
//     margin-right: 0;
//     width: 15rem;
//     height: 5rem;
//   }
//     @media (max-width: 500px) {
//       margin-left: 0.8rem;
//       width: 15rem;
//     height: 5rem;
//     }
//     h6 {
//       font-weight: bolder;
//       text-transform: capitalize;
//       font-family: MontserratBold;
//       color: #707070;
//       letter-spacing: 0px;
//       opacity: 1;
//       font-size: 16px;
//     }
//     p {
//       font-weight: lighter;
//       font-size: 0.8rem;
//       color: #707070;
//       letter-spacing: 0.32px;
//     }
//   }
//   .card2 {
//     background: #E6E6E6;
//     padding: 0.5rem;
//     width: 12rem;
//     height: 5rem;
//     margin-left: 0.7rem;
//     border-radius: 0.2rem;
//     cursor: pointer;
//   @media (max-width: 400px) {
//     margin-left: 0;
//     width: 15rem;
//     height: 5rem;
//   }
//     @media (max-width: 500px) {
//       margin-top: 2rem;
//       width: 15rem;
//     height: 5rem;
//       margin-left: 0.8rem;
//     }
//     h6 {
//       font-weight: bolder;
//       text-transform: capitalize;
//       font-family: MontserratBold;
//       letter-spacing: 0.32px;
//       color: #707070;
//       opacity: 1;
//       font-size: 16px;
//     }
//     p {
//       font-weight: lighter;
//       font-size: 0.8rem;
//       letter-spacing: 0.32px;
//       color: #707070;
      
//     }
//   }
//   .para-icon {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-top: -0.3rem;
//     .icon-box {
//       background: var(--lightTransparent);
//       padding: 0.4rem;
//       border-radius: 30px;
//       width: 2rem;
//       height: 2rem;
//     }
//     .icon {
//       color: #ffffff;
//       margin-left: 0.3rem;
//     }
//   }
//   }
//   .activeCard1 {
//     padding: 0.5rem;
//     width: 12rem;
//     height: 5rem;
//     margin-right: 0.8rem;
//     border-radius: 0.2rem;
//     cursor: pointer;
//     color: #ffffff;
//       background-image: linear-gradient(
//       to right,
//       var(--lightBlue),
//       var(--mainBlue)
//     );
//     @media (max-width: 400px) {
//       margin-left: 0.8rem;
//       width: 15rem;
//       height: 5rem;
//       margin-right: 2;
//     }
//     @media (max-width: 500px) {
//     margin-left: 0.8rem;
//     width: 15rem;
//     height: 5rem;
//     margin-right: 0;

//     }
//     h6 {
//       font-weight: bolder;
//       text-transform: capitalize;
//       font-family: MontserratSemibold;
//       letter-spacing: 0px;
//       opacity: 1;
//       font-size: 16px;
//     }
//     p {
//       font-weight: lighter;
//       letter-spacing: 0.32px;
//       font-size: 0.8rem;
//     }
//   }
//   .activeCard2 {
//     padding: 0.5rem;
//     width: 12rem;
//     height: 5rem;
//     margin-left: 0.7rem;
//     border-radius: 0.2rem;
//     cursor: pointer;
//     color: #ffffff;
//     background: red;
//     @media (max-width: 400px) {
//       margin-left: 0.8rem;
//       width: 15rem;
//       height: 5rem;
//       margin-top: 2rem;
//     }
//     @media (max-width: 500px) {
//       width: 15rem;
//     height: 5rem;
//       margin-left: 0.8rem;
//       margin-top: 2rem;
//     }
//     h6 {
//       font-weight: bolder;
//       text-transform: capitalize;
//       font-family: MontserratSemibold;
//       letter-spacing: 0px;
//       opacity: 1;
//       font-size: 16px;
//     }
//     p {
//       font-weight: lighter;
//       letter-spacing: 0.32px;
//       font-size: 0.8rem;
//     }
//     }
   
//   .transcript-order {
//     margin-top: -1rem;
//     text-transform: capitalize;
//     margin-bottom: 1rem;
//     letter-spacing: 0.44px;
//     color: #173049;
//     font-family: MontserratBold;
//     opacity: 1;
//     @media (max-width: 400px) {
//       margin-left: 1rem;
//     }
//     @media (max-width: 500px) {
//       margin-left: 1rem;
//     }
//   }
//   .details-info {
//       background: white;
//       display: grid;
//       place-items: center;
//       min-height: 385px;
//       padding: 1rem;
//       border-radius: 10px;
//       margin-right: 3rem;
//       margin-bottom: 2rem;
//       p {
//         text-align: center;
//         font-family: MontserratRegular;
//         font-weight: normal;
//         letter-spacing: 0.28px;
//         color: #707070;
//         opacity: 0.2;
//       }
//     }
//   .new-table {
//     display: flex;
//     background: white;
//     text-align: center;
//     border-radius: 10px;
//     justify-content: center;
//     padding-bottom: 1rem;
//     margin-right: 3rem;
//     /* width: 100%; */
//     min-width: 385px;
//     min-height: 250px;
//     margin-bottom: 2rem;
//     @media (max-width: 400px) {
//     margin-right: 0;
//       width: 100%;
//     }
//     @media (max-width: 500px) {
//     padding-left: 0.5rem;
//       width: 100%;
//     }
//     .table-headers {
//       font-family: MontserratBold;
//       letter-spacing: 0.32px;
//       color: #707070;
//       font-weight: normal;
//       opacity: 1;
//     }
//     tr{
//       &.activeOrder {
//           background: var(--mainWhite);
//         }
//     }
//     td,
//       th {
//         padding: 15px;
//       }
//       td {
//         font-family: MontserratRegular;
//         font-size: 12px;
//         border-top: 0.2rem solid var(--mainWhite);
//         cursor: pointer;
//         font-weight: normal;
//         letter-spacing: 0.28px;
//         color: #707070;
//         opacity: 0.8;
        
//       }
//   }
//   .details {
//     margin-left: -1rem;
//     min-width: 470px;
//     margin-bottom: 2rem;
//     h6 {
//       text-transform: capitalize;
//     letter-spacing: 0.44px;
//     color: #173049;
//     font-family: MontserratBold;
//     margin-bottom: 1rem;
//     opacity: 1;
//     @media (max-width: 400px) {
//     margin-left: 1rem;
//     }
//     @media (max-width: 500px) {
//     margin-left: 1rem;
//     }
//     }
//     @media (max-width: 400px) {
//     margin-left: 0;
//       margin-top: 2rem;
//     }
//     @media (max-width: 500px) {
//     margin-left: 0;
//       margin-top: 2rem;
//     }
//     .container {
//       display: block;
//       background: white;
//       min-height: 400px;
//       text-align: left;
//       border-radius: 10px;
//       h5 {
//           font-family: MontserratBold;
//           letter-spacing: 0.32px;
//           color: #707070;
//           opacity: 1;
//           text-transform : capitalize;
//           font-weight: normal;
//         }
//       .individual-details {
//         margin-top: 1rem;
//         border-top: 2px solid var(--lighterDark);
//       }
//       .para {
//         display: flex;
//         font-family: MontserratRegular;
//         font-weight: normal;
//         letter-spacing: 0.28px;
//         color: #707070;
//         opacity: 0.8;
//         justify-content: left;
//         font-size: 12px;
//         text-transform: capitalize;
//         .p1 {
//           padding-left: 3rem;
//         }
//         .p2 {
//           padding-left: 1.8rem;
//         }
//         .p3 {
//           padding-left: 5rem;
//         }
//         .p4 {
//           padding-left: 1rem;
//         }
//         .p5 {
//           padding-left: 1rem;
//         }
//       }
//       .comment-section {
//         display: flex;
//         align-items: center;
//       }
//       .field {
//         margin-top: 0.5rem;
//         display: flex;
//         flex-direction: column;
//         label {
//             font-family: MontserratRegular;
//             font-weight: normal;
//             letter-spacing: 0.28px;
//             color: #707070;
//             opacity: 0.8;
//         }
//         textarea {
//             width: 220px;
//             height: 80px;
//             font-family: MontserratRegular;
//             font-weight: normal;
//             letter-spacing: 0.28px;
//             color: #707070;
//             opacity: 1;
//             margin-bottom: 0.5rem;
//             border-radius: 10px;
//             outline: none;
//             padding: 0.5rem;
//             font-size: 12px;
//         }
//       }
//       .select {
//         margin-left: 1rem;
//         display: flex;
//         flex-direction: column;
//       }
//       .options {
//         padding: 0.2rem;
//         margin-top: 2rem;
//         font-size: 12px;
//         color: #0092E0;
//         outline: none;
//         cursor: pointer;
//         width: 80px;
//         @media (max-width: 400px)  {
//           width: 90px;
//         }
//       }
//       .finish {
//         background: #0092E0;
//         margin-top: 1rem;
//         width: 100px;
//         height: 35px;
//         text-transform: capitalize;
//         border: none;
//         border-radius: 20px;
//         /* padding: 0.3rem; */
//         color: #ffffff;
//         outline: none;
//       }
//     }
//     .details-info {
//       background: white;
//       display: grid;
//       place-items: center;
//       min-height: 400px;
//       padding: 1rem;
//       border-radius: 10px;
//       p {
//         text-align: center;
//         font-family: MontserratRegular;
//         font-weight: normal;
//         letter-spacing: 0.28px;
//         color: #707070;
//         opacity: 0.2;
//       }
//     }
//   }
// `

// export default Requests;
