import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { CountryDropdown } from "react-country-region-selector";
import AdminLayout from "./AdminLayout";
import {
  fetchInstitutes,
  setPageInfo,
  setLoading,
  noInstitute,
} from "../../state/actions/Institutions";
import { search } from "./utils";
import Institution from "./Institution";
import NewInstitution from "./NewInstitutions";
import ipapi from "ipapi.co";

const Institutions = () => {
  const [input, setInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [hideTable, setHideTable] = useState(false);
  const [byCountryOffset, setByCountryOffset] = useState(0);
  const [byCountryandNameoffset, setByCountryandNameOffset] = useState(0);
  const [country, setCountry] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [activeTab, setActiveTab] = useState("manage");
  const dispatch = useDispatch();
  useEffect(() => {
    ipapi.location((loca) => setUserCountry(loca), "", "", "country");
  }, []);

  const { institutions, pageInfo } = useSelector((state) => state.institutions);

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
        `https://crosschek.herokuapp.com/api/v1/institutions/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offset, input]
  );

  const institutionByCountry = useCallback(
    async (country, offset, limit) => {
      dispatch(setLoading(true));
      const { data } = await Axios.get(
        `https://crosschek.herokuapp.com/api/v1/institutions/country/${country}/${offset}/${limit}`
      );
      const {
        totalDocs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        page,
      } = data.institution;
      if (data.institution.docs > 1) {
        dispatch(noInstitute(false));
      }
      dispatch(setLoading(false));
      dispatch(fetchInstitutes(data.institution.docs));
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
        `https://crosschek.herokuapp.com/api/v1/institutions/countryandName/${country}/${input}/${offset}/${limit}`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [country, offset, input]
  );

  useEffect(() => {
    dispatch(fetchInstitutes([]));
    dispatch(setPageInfo({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function handleInputChange(e) {
    setInput(e.target.value);
  }
  const pagesCount = pageInfo?.totalPages;

  const handleNext = (data) => {
    if (country !== "" && input.length === 0) {
      setByCountryOffset((prev) => Math.ceil(data.selected * 15));
    } else if (country !== "" && input.length > 0) {
      setByCountryandNameOffset((prev) => Math.ceil(data.selected * 15));
    } else if (input.length > 0 && country.length === 0) {
      setOffset((prev) => Math.ceil(data.selected * 15));
    }
  };

  return (
    <AdminLayout>
      <DashboardBody>
        <div className="tabs">
          <ul>
            <li
              onClick={() => {
                setActiveTab("manage");
              }}
              className={activeTab === "manage" ? "activeTab" : ""}
            >
              Manage Institutions
            </li>
            <li
              onClick={(e) => setActiveTab("add")}
              className={activeTab === "add" ? "activeTab" : ""}
            >
              Add institutions
            </li>
            <li
            // onClick={handleDocumentTab}
            // className={activeTab === "documents" ? "activeTab" : ""}
            >
              {" "}
              Anything
            </li>
          </ul>
        </div>
        {activeTab === "manage" ? (
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
                  style={{height:"35px"}}
                />
              </div>
              <div className="country-select">
                <label style={{ paddingLeft: "5px" }}>Country</label>
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
                    setCountry(e.target.value.toLowerCase());
                      setByCountryOffset(0)
                      setByCountryandNameOffset(0)
                      setOffset(0)
                  }}
                  onBlur={formik.handleBlur}
                  ReactFlagsSelect
                />
              </div>
            </div>
            {(input.length > 0 || country.length > 0) &&
              institutions.length > 0 && (
                <div className="new-table open">
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
                        <th>Institute charge</th>
                        <th>Our charge</th>
                        <th>Transcript fee</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {institutions.length > 0 &&
                        institutions.map((ite) => (
                          <Institution institute={ite} key={ite.name} />
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
                        previousLabel={
                          <FontAwesomeIcon
                            className="icon"
                            icon={faAngleDoubleLeft}
                            style={{ fontSize: "15px" }}
                          />
                        }
                        nextLabel={
                          <FontAwesomeIcon
                            className="icon"
                            icon={faAngleDoubleRight}
                            style={{ fontSize: "15px" }}
                          />
                        }
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pagesCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={(e) => handleNext(e)}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        initialPage={0}
                      />
                    </div>
                  )}
                </div>
              )}
          </SelectSch>
        ) : activeTab === "add" ? (
          <NewInstitution />
        ) : (
          ""
        )}
      </DashboardBody>
    </AdminLayout>
  );
};

export default Institutions;

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
`;

// const Table = styled.div`

// `;

const DashboardBody = styled.div`
  height: 100%;
  padding-left: 30px;
  overflow-y: scroll;
  padding-right: 30px;
  background: #fafafb;
  font-family: "Rubik", sans-serif;
  ::-webkit-scrollbar {
    display: none;
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
