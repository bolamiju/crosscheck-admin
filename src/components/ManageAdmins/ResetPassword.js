import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import DashboardLayout from "../admin/AdminLayout";
import { BASE_URL } from "../../state/constant/constants";
function ResetPassword(props) {
  const [passwordToken, setPasswordToken] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouteMatch();
  const {
    params: { token },
  } = route;

  useEffect(() => {
    setPasswordToken(token);
  }, [token]);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.put(
          `${BASE_URL}/api/v1/admin/resetpassword/${passwordToken}`,
          values
        );
        if (res.status === 200) {
          setLoading(false);
          formik.resetForm();
          return toast.success("Password reset successful");
        }
      } catch (err) {
        setLoading(false);
        if (
          err?.response?.data.message ===
          "Password reset token is invalid or has expired."
        ) {
          return toast.error("Password reset token is invalid or has expired");
        } else {
          toast.error("An error occured");
        }
      }
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Enter password"),
      confirmPassword: Yup.string()
        .required("Re-enter password")
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.newPassword === value;
        }),
    }),
  });
  return (
    <DashboardLayout>
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
      <form>
        <Div>
          <h3 style={{ textAlign: "center" }}>Create a New Password</h3>
          <div className="section">
            <label htmlFor="email">New Password</label>
            <input
              type="text"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div>Enter password</div>
            ) : null}
          </div>
          <div className="section">
            <label htmlFor="email">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button
            className="reset-btn"
            type="button"
            onClick={formik.handleSubmit}
          >
            {loading ? "Requesting..." : "RESET PASSWORD"}
          </button>
        </Div>
      </form>
    </DashboardLayout>
  );
}

export default ResetPassword;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    input {
      width: 300px;
      border: 1px solid gray;
      border-radius: 3px;
      height: 40px;
    }
    label {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .reset-btn {
    width: 300px;
    outline: none;
    color: white;
    background: #0092e0;
    border: 1px solid #0092e0;
    border-radius: 3px;
    height: 50px;
    font-weight: bold;
  }
`;
