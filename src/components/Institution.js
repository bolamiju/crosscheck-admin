import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstitutions, addAllInstitutions } from "../state/actions/Institutions";
import { Formik } from 'formik';
import * as Yup from 'yup';


const Institution = () => {

    const dispatch = useDispatch();
    const { institutions } = useSelector((state) => state.institutions);
    // const { addInstitutions } = useSelector((state) => state.addInstitutions);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [input, setInput] = useState("");
    const [hideTable, setHideTable] = useState(false);

    useEffect(() => {
        dispatch(getAllInstitutions());
    }, [dispatch]);

    const  handleInputChange = (e) =>{
        setInput(e.target.value);
      }
    
      const filteredItems = institutions.filter((item) =>
        item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      );
    
      const pageSize = 10;
      const pagesCount = Math.ceil(filteredItems.length / pageSize);
    
    // const verificationsCount = Math.ceil(allHistory.length / pageSize);
    
    const handleNavigation = (e, index) => {
        e.preventDefault();
        if (index < 0 || index >= pagesCount) {
          return;
        } else {
          setCurrentPage(index);
        }
    };
    
    const handleSelected = (institute) => {
        // dispatch(selectSchool(institute));
        setHideTable(true);
        setInput(institute.name);
        // history.push("/new");
      };
    

    return (
        <div className=" col-12 mx-auto text-center">
            <SelectSch>
                <div className="selects">
                    <div className="sch-select">
                        <label style={{ paddingLeft: "5px" }}>Select Institution</label>
                        <input
                            type="text"
                            className="schl-input"
                            onChange={handleInputChange}
                            value={input}
                            name="input"
                            placeholder="Search for a school"
                        />
                    </div>
                </div>
                {filteredItems.length > 0 && input.length > 0 && (
                    <div className="new-table">
                        <table
                            cellSpacing="0"
                            cellPadding="0"
                            border="0"
                            className={hideTable ? "hide-table" : ""}
                        >
                            <thead className="table-headers">
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>category rate</th>
                                    <th>amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems
                                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                                    .map((ite) => (
                                        <tr onClick={() => handleSelected(ite)} key={ite.name}>
                                            <th className="mobile-header">Number</th>
                                            <td>{ite.name}</td>
                                            <th className="mobile-header">Market rate</th>
                                            <td>{ite.country}</td>
                                            <th className="mobile-header">Weight</th>
                                            <td>{ite.category}</td>
                                            <th className="mobile-header">Value</th>
                                            <td>{ite.amount}</td>
                                        </tr>
                                        // <tr className="space"></tr>
                                    ))}
                            </tbody>
                        </table>
                        {!hideTable && (
                            <div className="pagination-line">
                                <p>
                                    Showing{" "}
                                    {
                                        filteredItems.slice(
                                            currentPage * pageSize,
                                            (currentPage + 1) * pageSize
                                        ).length
                                    }{" "}
                    of {pagesCount} of entries
                  </p>
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem
                                        disabled={currentPage <= 0}
                                        className="prev"
                                        onClick={(e) => handleNavigation(e, currentPage - 1)}
                                    >
                                        <PaginationLink previous href={() => false} />
                                    </PaginationItem>

                                    {[...Array(pagesCount)].map((page, i) => (
                                        <PaginationItem
                                            active={i === currentPage}
                                            key={i}
                                            onClick={(e) => handleNavigation(e, i)}
                                        >
                                            <PaginationLink href={() => false}>
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem
                                        disabled={currentPage >= pagesCount - 1}
                                        onClick={(e) => handleNavigation(e, currentPage + 1)}
                                    >
                                        <PaginationLink
                                            next
                                            href={() => false}
                                            className="next"
                                        />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        )}
                    </div>
          )}
          <Formik
                    initialValues={{ name: "", country: "", category: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("submitting", values)
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required("Required !"),
                        country: Yup.string()
                            .email()
                            .required("Required !"),
                        category: Yup.string()
                            .required("Required !")
                    })}
                >
                    {
                        props => {
                            const {
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            } = props;
                            return (
                                <form className="form" onSubmit={handleSubmit}>
                                    <p>add an institution</p>
                                    <div className="field">
                                        <label htmlFor="name">name of institution</label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.name && touched.name && "error"}
                                        />

                                    </div>
                                    {errors.name && touched.name && (
                                        <div className="input-feedback">{errors.name}</div>
                                    )}
                                    <div className="field">
                                        <label htmlFor="country">country</label>
                                        <input
                                            name="country"
                                            type="country"
                                            value={values.country}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.country && touched.country && "error"}
                                        />
                                    </div>
                                    {errors.country && touched.country && (
                                        <div className="input-feedback">{errors.country}</div>
                                    )}
                                    <div className="field">
                                        <label htmlFor="amount">amount</label>
                                        <input
                                            name="amount"
                                            type="text"
                                            value={values.amount}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="category">category</label>
                                        <input
                                            name="category"
                                            type="text"
                                            value={values.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.category && touched.category && "error"}
                                        />
                                    </div>
                                    {errors.category && touched.category && (
                                        <div className="input-feedback">{errors.category}</div>
                                    )}
                                   
                                </form>
                            )
                        }
                    }
                </Formik>
        </SelectSch>
        </div>
    )
};

const SelectSch = styled.div`
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

    .showing {
      font-family: MontserratRegular;
      letter-spacing: 0.44px;
      color: #707070;
      opacity: 1;
      margin-left: 50px;
    }
  }
  .form {
    margin-top: 2rem;
    width: 350px;
    min-height: 460px;

    p {
    margin-top: 0 !important;
    margin-bottom: 10px !important;
    padding: 0.3rem 0 0.5rem 0;
    font-family: MontserratRegular;
    font-size: 20px;
    text-align: center !important;
    font-weight: normal;
    background: #0091DF;
    letter-spacing: 0.6px;
    color: #FFFFFF;
    opacity: 1;
    }
    .field {
        display: block;
       
        input, label {
            display: block;
            margin-left: 1rem;
        }
        label {
          font-family: MontserratRegular;
          letter-spacing: 0.32px;
          color: #707070;
          text-transform: capitalize;
          opacity: 1;
          padding-top: 0.5rem;
        }
        input {
            width: 85%;
            height: 30px;
            color: #707070;
            border-radius: 10px;
            opacity: 0.8;
            outline: none;
            border: 0.5px solid #707070;
            padding-left: 0.5rem;
           
        } 
    }
    .input-feedback {
        color: red;
        margin-left: 1rem;
        font-size: 1rem;
    }
}
`;

export default Institution
