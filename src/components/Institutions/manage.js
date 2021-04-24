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
import AdminLayout from "../admin/AdminLayout";
import {
  fetchInstitutes,
  setPageInfo,
  setLoading,
  noInstitute,
} from "../../state/actions/Institutions";
import { search } from "../utils";
import Institution from "./Institution";
import NewInstitution from "./NewInstitutions";
import ipapi from "ipapi.co";
import { SelectSch, DashboardBody} from '../Styles'

const ManageInstitutions = () => {
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

export default ManageInstitutions;

