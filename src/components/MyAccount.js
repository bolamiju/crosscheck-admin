import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "./admin/AdminLayout";
import { DashboardBody } from "./Styles.js";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../state/constant/constants";

const MyAccount = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const requestPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/admin/forgotpassword`,
        { email },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response?.status === 200) {
        toast.success("A password reset link has been sent to your email");
      }
    } catch (error) {
      toast.error("An error occured");
    }
  };
  return (
    <DashboardLayout>
      <DashboardBody>
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ marginTop: "20px" }}
        />
        <div style={{ width: "550px", margin: "0 auto" }}>
          <h5 style={{ textAlign: "center", marginLeft: "-30px" }}>
            Enter email to Reset your password
          </h5>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            className="input"
          />
          <button
            onClick={requestPasswordReset}
            className="create-button"
            style={{ marginLeft: "10px" }}
          >
            Submit
          </button>
        </div>
      </DashboardBody>
    </DashboardLayout>
  );
};

export default MyAccount;
