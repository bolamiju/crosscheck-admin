import React, { useState, useEffect, useCallback } from 'react';
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import { CountryDropdown } from "react-country-region-selector";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { getInstitutes, addAllInstitutions, setPageInfo  } from "../state/actions/Institutions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { search } from "../components/admin/utils";



const Institution = ({ initialValues, updateFormValues }) => {

  const dispatch = useDispatch();
  const { institutions, addInstitutions, pageInfo } = useSelector((state) => state.institutions);
  const { selectedInstitution } = useSelector((state) => state.verifications);

  const [selectedInst, setSelectedInst] = useState(
    selectedInstitution.name ? selectedInstitution : {}
  );

  const [input, setInput] = useState("");
  const [schCard, setSchCard] = useState(true);
  const [hideTable, setHideTable] = useState(false);
  const [offset, setOffset] = useState(0);
  const [details, setDetails] = useState(true);
  const [byCountryOffset, setByCountryOffset] = useState(0);
  const [byCountryandNameoffset, setByCountryandNameOffset] = useState(0);
  const [country, setCountry] = useState("");


   const formik = useFormik({
    initialValues: {
      country: "",
    },
    validationSchema: Yup.object().shape({
      country: Yup.string().required("First Name is required"),
    }),
  });
 

  const request = useCallback(
    async (offset, limit) => {
      return await search(
        `https://croscheck.herokuapp.com/api/v1/institutions/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, input]
  );

  useEffect(() => {
    console.log("clean up");
    dispatch(getInstitutes([]));
    dispatch(setPageInfo({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const institutionByCountry = useCallback(
    async (country, offset, limit) => {
      const { data } = await Axios.get(
        `https://croscheck.herokuapp.com/api/v1/institutions/country/${country}/${offset}/${limit}`
      );
      // console.log("res", data.institution);
      const {
        totalDocs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        page,
      } = data.institution;
      dispatch(getInstitutes(data.institution.docs));
      dispatch(
        setPageInfo({ totalDocs, totalPages, hasPrevPage, hasNextPage, page })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, country]
  );
  const countryAndName = useCallback(
    async (country, offset, limit, input) => {
      await search(
        `https://croscheck.herokuapp.com/api/v1/institutions/countryandName/${country}/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country, offset, input]
  );

  useEffect(() => {
    if (country !== "" && input.length === 0) {
      institutionByCountry(country, byCountryOffset, 15);
    }
    if (country !== "" && input.length > 0) {
      countryAndName(country, byCountryandNameoffset, 15, input);
    }
    if (input.length > 0 && country.length === 0) {
      request(offset, 15);
    }
  }, [
    dispatch,
    institutionByCountry,
    byCountryandNameoffset,
    input,
    request,
    offset,
    byCountryOffset,
    country,
    countryAndName,
  ]);
  const pagesCount = pageInfo?.totalPages;

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setHideTable(false);
  };


  const handleSelected = (institute) => {
    setSelectedInst(institute);
    formik.setFieldValue("institution", institute.name);
    setHideTable(true);
    setInput(institute.name);
    setSchCard(true);
  };

  const institutionNavs = (data) => {
    console.log("data", data);
    if (country !== "" && input.length === 0) {
      setByCountryOffset((prev) => Math.ceil(data.selected * 15));
    } else if (country !== "" && input.length > 0) {
      setByCountryandNameOffset((prev) => Math.ceil(data.selected * 15));
    } else if (input.length > 0 && country.length === 0) {
      setOffset((prev) => Math.ceil(data.selected * 15));
    }
  };

  
  return (
    <div className="col-6 col-lg-12 mx-auto">
      {formik?.values?.institution?.length > 0 && schCard ? (
          <EditWrapper className="mx-auto" style={{ display: !details ? "none" : "" }}>
          <p className="institution-details">Institution Details</p>
          <div className="inst-name">
            <span>Institution name</span>
            <span>
              {formik.values.institution}{" "}
              <span className="change" onClick={() => setSchCard(false)}>
                <small>change</small>
              </span>
            </span>
          </div>
          <div className="sch-country">
            <span>Country</span>
            <span>{selectedInst.country}</span>
          </div>
        </EditWrapper>
      ) : (
        <SelectSch>
        <div className="selects mx-auto text-center">
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
          <div className="select-country">
                <label style={{ paddingLeft: "5px" }}>SELECT COUNTRY</label>
                <CountryDropdown
                  style={{
                    height: "34px",
                    border: "2px solid #e2e2e2",
                    outline: "none",
                    borderRadius: "14px",
                    fontSize: "14px",
                    fontFamily: "MontserratItalic",
                  }}
                  name="country"
                  id="country"
                  className="country"
                  valueType="full"
                  value={formik.values.country}
                  onChange={(_, e) => {
                    formik.handleChange(e);
                    console.log(e.target.value);
                    setCountry(e.target.value.toLowerCase());
                  }}
                  onBlur={formik.handleBlur}
                  ReactFlagsSelect
                />
              </div>
        </div>
        {(input.length > 0 || country.length > 0) && institutions.length > 0 && (
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
                {institutions.map((ite) => (
                    <tr onClick={() => handleSelected(ite)} key={ite.name}>
                      <th className="mobile-header">Number</th>
                      <td>{ite.name}</td>
                      <th className="mobile-header">Market rate</th>
                      <td>{ite.country}</td>
                      <th className="mobile-header">Weight</th>
                      <td>{ite["our_charge"] || "-"}</td>
                      <th className="mobile-header">Value</th>
                      <td>{ite["institute_charge"] || "-"}</td>
                    </tr>
                    // <tr className="space"></tr>
                  ))}
              </tbody>
            </table>
            {!hideTable && (
              <div className="pagination-line">
                 <p>
                      Showing {institutions.length} of {pageInfo.totalDocs} of
                    entries
                  </p>

                    <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={pagesCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(e) => institutionNavs(e)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                    />
              </div>
            )}
          </div>
        )}
       
      </SelectSch>
      )}
      <FormStyle>
      <Formik
          initialValues={{ name: "", country: "", category: "", amount: "",state:'' }}
          onSubmit={( values, {resetForm}) => {
            console.log("submitting", values)  
            addAllInstitutions({ values });
            resetForm({values: ""})
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required("Required !"),
              state: Yup.string()
              .required("Required !"),
            country: Yup.string()
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
                handleSubmit, 
                resetForm,
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
                    <label htmlFor="state">state</label>
                    <input
                      name="state"
                      type="text"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.state && touched.state && "error"}
                    />

                  </div>
                  {errors.name && touched.state && (
                    <div className="input-feedback">{errors.state}</div>
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
                  <button>Add Institution</button>

                </form>
              )
            }
          }
        </Formik>
      </FormStyle>
    </div>
  )
};


const EditWrapper = styled.div`
  margin-top: 2rem;
  width: 600px;
  min-height: 150px;
  background: #ffffff;
  box-shadow: 0px 0px 10px #00000029;
  text-align: left;
  .institution-details {
    margin-left: 30px;
    border-bottom: 1px solid gray;
    width: 90%;
    font-family: segoebold;
    font-size: 15px;
    color: #173049;
    p {
      padding-bottom: 10px;
    }
  }
  .sch-country {
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 40px;
    span {
      &:nth-child(1) {
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratBold;
        letter-spacing: 0.32px;
        color: #707070;
      }
      &:nth-child(2) {
        padding-left: 105px;
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratRegular;
        letter-spacing: 0.32px;
        color: #707070;
      }
    }
  }
  .inst-name {
    padding-left: 30px;
    padding-top: 10px;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 20px;
    }
    span {
      &:nth-child(1) {
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratBold;
        letter-spacing: 0.32px;
        color: #707070;
      }
      &:nth-child(2) {
        padding-left: 40px;
        font-weight: normal;
        font-size: 14px;
        font-family: MontserratRegular;
        letter-spacing: 0.32px;
        color: #707070;
        @media (max-width: 500px) {
          padding-left: 0px;
        }
      }
    }
    .change {
      margin-left: 7px;
      background: #ff0000 0% 0% no-repeat padding-box;
      border-radius: 3px;
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
      opacity: 0.6;
      small {
        font: normal normal bold 12px/14px Montserrat;
        letter-spacing: 0.24px;
        color: black;
        opacity: 1;
      }
    }
  }
`
const SelectSch = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  padding-bottom: 25px;
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

    .showing {
      font-family: MontserratRegular;
      letter-spacing: 0.44px;
      color: #707070;
      opacity: 1;
      margin-left: 50px;
    }
    .pagination-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: 0 auto;
    p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    list-style-type: none;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
.pagination .disabled {
    cursor: not-allowed;
    border: 1px solid grey !important;
}
.pagination .active {
    background: #0092e0;
    color: white;
}
.pagination li {
    color: #0092e0;
    border: 1px solid #0092e0;
    padding: 3px 10px 3px 10px;
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
  }
}
  
  
`;

const FormStyle = styled.div`
.form {
  margin-top: 2rem;
  width: 350px;
  min-height: 460px;
  box-shadow: 0px 0px 10px #00000029;


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
  text-transform: capitalize
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
  button {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    background: #0091DF;
    color: white;
    border: none;
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
    font-size: 1rem;
  }
}
`

export default Institution
