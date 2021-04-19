import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
const Login = (props) => {
    const [visibility, setVisibility] = useState(false);
  const [loading,setLoading] = useState(false)
  const [loginError,setLoginError] = useState('')

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(`http://localhost:5000/api/v1/admin/login`,values,{
            headers:{
                "content-type":"application/json"
            }
        });
        if (res.status === 200) {
            setLoading(false)
          localStorage.setItem("user", JSON.stringify(res.data.user));
          formik.resetForm();
          props.history.push(`/dashboard`);
        }
      }
       catch (err) {
        if (
          err.response.data.message &&
          err.response.data.message === "invalid email or password"
        ) {
        setLoginError("invalid email or password");
        }
        setLoading(false);
      }
    },
    validationSchema: Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
}),
  });

    return (
         <div className="login-page-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="form-section">
        <div className="form-wrapper login-wrapper">
          <form className="form-surround">
            <div className="info-container">
              <h3 className="great">Great to See you again</h3>
              <p
                style={{
                  fontSize: "14px",
                  fontFamily: "MontserratRegular",
                  color: "#707070",
                }}
              >
                Sign in to your account
              </p>
              {loginError.length > 0 && (
                <p style={{ color: "red" }}>{loginError}</p>
              )}
            </div>

            <div className="email-input fields">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="input logininput"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>

            <div
              className="password-input fields"
              style={{ position: "relative" }}
            >
              <label>Enter password</label>

              <input
                type={!visibility ? "password" : "text"}
                name="password"
                id="password"
                className="input passwordinput"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!visibility ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="visible-icon"
                  onClick={() => setVisibility(!visibility)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="visible-icon"
                  onClick={() => setVisibility(!visibility)}
                />
              )}
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="register-button loginbtn"
            >
              {loading ? "Signing in..." : "LOGIN"}
            </button>
            <div className="terms">
              <div className="accept">
                <input
                  type="checkbox"
                  name="check"
                  className="check"
                  style={{ marginRight: "10px" }}
                />
                <span>Remember me</span>
              </div>
              <Link to="/forgotpassword">Forgot password</Link>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="signup-with">Login with</p>

             
              <p className="paragraph">
                Don't have an account?
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "#0092e0",
                  }}
                >
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="image-section"></div>
    </div>
    )
}

export default Login
