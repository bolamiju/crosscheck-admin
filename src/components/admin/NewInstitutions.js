import React, { useState } from "react";
import axios from "axios";
import InstitutionForm from "./InstitutionForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

const request = (data) => {
  console.log(data);
  return axios({
    data,
    method: "post",
    url: `https://croscheck.herokuapp.com/api/v1/institutions/add`,
    headers: { "Content-Type": "application/json" },
  });
};

const NewInstitution = () => {
  const formData = {
    name: "",
    country: "",
    our_charge: 0,
    institute_charge: 0,
    transcript_fee: 0,
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const date = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const [formValues, setFormValues] = useState([{ ...formData,id:date }]);

  const addNewForm = () => {
    setFormValues((values) => [
      ...values,
      { ...formData, id: Date.now()},
    ]);
  };
  const updateFormValues = (id) => (data) => {
    setFormValues((formValues) =>
      formValues.map((value, index) => (index === id ? data : value))
    );
  };

  const deleteOneVerification = (id) => {
    let vals = formValues.filter((v) => v.id !== id);
    setFormValues(vals);
  };
  const addSchool = async () => {
    const res = await Promise.allSettled(
      formValues.map((value) => request(value))
    );
    res.map((response) => {
      if (response.status === "rejected") {
        toast.error(response?.reason?.response?.data?.message);
      } else if (response.status === "fulfilled") {
        toast.success("school uploaded");
      }
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "20px" }}
      />
      <div
        className="new-table open"
        style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingRight: "0",
          paddingLeft: "0",
        }}
      >
        <table
          cellSpacing="0"
          cellPadding="0"
          border="0"
          //   className={hideTable ? "hide-table" : ""}
        >
          <thead className="table-headers">
            <tr>
              <th style={{ width: "300px" }}>Name</th>
              <th>Country</th>
              <th>Institute charge</th>
              <th>Our charge</th>
              <th>Transcript fee</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formValues.map((values, id) => (
              <InstitutionForm
              key={values.id}
                initialValues={values}
                updateFormValues={updateFormValues(id)}
                id={values.id}
                deleteOneVerification={deleteOneVerification}
              />
            ))}
          </tbody>
        </table>
        <button onClick={addNewForm} type="button" className="add-new-btn">
          Add New School <FontAwesomeIcon icon={faPlus} />
        </button>

        <button onClick={addSchool} type="button" className="add-new-btn">
          Submit
        </button>
      </div>
    </>
  );
};

export default NewInstitution;
