import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../state/constant/constants";
import { toast, ToastContainer } from "react-toastify";
import {deleteInstitution,removeInstitution} from '../../state/actions/Institutions'

const Institution = ({ institute }) => {
  const initialState = {
    name: institute.name,
    country: institute.country,
    our_charge: institute["our_charge"],
    transcript_fee: institute["transcript_fee"],
    institute_charge: institute["institute_charge"],
  };
  const [school, setSchool] = useState(initialState);
  const [disable, setDisable] = useState(true);
  const [schoolName, setSchoolName] = useState("");
  const dispatch = useDispatch()

  const editInstitution = async (name, data) => {
    await Axios.put(`${BASE_URL}/api/v1/institutions/name/${name}`, data, {
      headers: { "Content-Type": "application/json" },
    })
      .then(({ data }) => {
        setDisable(!disable);
        toast.success("school updated!");
      })
      .catch((err) => {
        toast.error("an error occured");
      });
  };

  const deleteInstitute =async(id)=>{
    const res = await removeInstitution(id)
    if(res?.status === 200){
      dispatch(deleteInstitution(id))
      return toast.success('school deleted')
    }
    else{
      toast.error('something went wrong')
    }
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool((prevState) => ({ ...prevState, [name]: value }));
  };
  const truncateString = (str) => {
    if (str.length <= 24) {
      return str;
    }
    return str.slice(0, 32) + "...";
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
      <tr>
        <th className="mobile-header">Number</th>
        <td>
          <input
            name="name"
            value={disable ? truncateString(school.name) : school.name}
            onChange={handleChange}
            disabled={disable}
            style={{ width: "250px" }}
          />
        </td>
        <th className="mobile-header">Market rate</th>
        <td>
          <input
            name="country"
            value={disable ? truncateString(school.country) : school.country}
            onChange={handleChange}
            disabled={disable}
          />
        </td>
        <th className="mobile-header">Value</th>
        <td>
          &#8358;
          <input
            name="institute_charge"
            value={school.institute_charge}
            onChange={handleChange}
            disabled={disable}
            type="number"
            min={0}
          />
        </td>
        <th className="mobile-header">Weight</th>
        <td>
          &#8358;
          <input
            name="our_charge"
            value={school.our_charge}
            onChange={handleChange}
            disabled={disable}
            type="number"
            min={0}
          />
        </td>
        <th className="mobile-header">Weight</th>
        <td>
          &#8358;
          <input
            name="transcript_fee"
            value={school.transcript_fee}
            onChange={handleChange}
            disabled={disable}
            type="number"
            min={0}
          />
        </td>
        <td>
          {disable ? (
            <FontAwesomeIcon
              onClick={() => {
                setSchoolName(school.name);
                setDisable(!disable);
              }}
              className="icon"
              icon={faEdit}
              style={{ fontSize: "15px" }}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => {
                editInstitution(schoolName, school);
              }}
              className="icon"
              icon={faCheck}
              style={{ fontSize: "15px" }}
            />
          )}{" "}
          &nbsp; &nbsp; &nbsp;
          <FontAwesomeIcon
            onClick={() => {
              deleteInstitute(institute._id);
            }}
            className="icon"
            icon={faTrashAlt}
            style={{ fontSize: "15px",color:'red' }}
          />
        </td>
      </tr>
    </>
  );
};
export default Institution;
