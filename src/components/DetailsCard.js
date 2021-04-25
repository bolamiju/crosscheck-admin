import React,{useState} from 'react'
import { toast } from "react-toastify";
import { BASE_URL } from "../state/constant/constants";
import axios from 'axios'
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";
const { Option } = Select;

const DetailsCard = ({info,activeTab, setInfo}) => {
     const [verificationStatus, setVerificationStatus] = useState("");
      const [proof, setProof] = useState("");
      const [loading, setLoading] = useState(false);

      const user = JSON.parse(localStorage.getItem("admin"));

     const handleVerificationStatus = (value) => {
    setVerificationStatus(value);
  };

  const handleDocument = (e) => {
    setProof(e.currentTarget.files[0]);
  };
  let values = {verificationStatus}
    const handleUpdateVerification = async () => {
    if (!verificationStatus) {
      return toast.error("select an option");
    }
    if(verificationStatus === "completed"){
      if(!proof){
        return toast.error('upload proof of completion')
      }
       values={verificationStatus,proof,updated_by: `${user?.firstName} ${user?.lastName}`}
    }
    setLoading(true);
     const formData = new FormData();
  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });
    const response = await axios.put(`https://crosschek.herokuapp.com/api/v1/verifications/${info.id}/${info.email}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
    
    if (response.data.message === "verification updated") {
      setLoading(false);
      toast.success("update sucessful !!");
      setVerificationStatus("");
        setInfo({})
      setTimeout(()=>{
         window.location.href = "/education"
      },2000)
    } else {
      setLoading(false);
      toast.error("update Unsucessful. Try again !");
    }
  };
    return (
         <div className="container p-3">
                  <h5>individual details</h5>
                  <div className="individual-details">
                    <div className="para pt-2">
                      <p>first name: {info.firstName}</p>
                      <p className="p1">last name: {info.lastName}</p>
                    </div>
                    <div className="para">
                      <p>matric number: {info.studentId}</p>
                      <p className="p2">course: {info.course}</p>
                    </div>
                    <div className="para">
                      <p>grad year: {info.graduationYear}</p>
                    </div>
                    <button style={{border:"1px solid grey"}}>
                      <a href={`${info.certImage}`} target="_blank" rel="noopener noreferrer" style={{color:'black'}}>
                        {" "}
                        view document
                      </a>
                    </button>
                  </div>
                  <div className="comment-section">
                    {/* <div className="field">
                      <label htmlFor="message">comments</label>
                      <textarea
                        name="message"
                        type="text"
                        className="message"
                      />
                    </div> */}
                    {(activeTab === "pending" ||
                      activeTab === "processing") && (
                      <div className="select">
                        <Select
                          style={{ height: "40px",width:"200px",marginTop:"20px" }}
                          showSearch
                          placeholder="choose status"
                          onChange={handleVerificationStatus}
                        >
                        <Option disabled>Select</Option>
                         {activeTab ==="pending" && <Option value="processing">processing</Option>}
                          <Option value="completed">completed</Option>
                        </Select>
                        {verificationStatus === "completed" ? (
                          <input
                            type="file"
                            name="proof"
                            onChange={handleDocument}
                          />
                        ) : null}
                        <button
                          onClick={handleUpdateVerification}
                          className="finish"
                        >
                          {loading ? "updating.." : "submit"}{" "}
                          <FontAwesomeIcon
                            icon={faLongArrowAltRight}
                            style={{
                              marginLeft: "5px",
                              fontSize: "20px",
                              paddingTop: "0.3rem",
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
    )
}

export default DetailsCard
