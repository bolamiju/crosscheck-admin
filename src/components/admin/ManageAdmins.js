import React,{useState} from 'react'
import axios from 'axios'
import AdminLayout from "./AdminLayout";
import { DashboardBody } from './ManageInstitutions'
import * as Yup from "yup";
import { useFormik } from "formik";
import {Select} from 'antd'
import { toast, ToastContainer } from "react-toastify";
const {Option} = Select
const ManageAdmin = () => {
    const [activeTab, setActiveTab] = useState("manage");
    const user = JSON.parse(localStorage.getItem('user'))
    const handleSelect =(val)=>{
    }
    const initialValues = {
        email:"",
        password:"",
        userType: "",
        firstName:"",
        lastName:""
    }

    const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
        try{
       const response = await axios.post(`http://localhost:5000/api/v1/admin/register`,values,{
           headers:{
               "Content-type":"application/json",
               authorization: user?.token
           }
       })
       if(response.status === 200){
           toast.success('Admin user created')
           formik.resetForm()
       }
        }
        catch(error){
            if(error?.response?.status === 409){
                return toast.error('Admin user already exist')
            }
            else{
                 toast.error('An error occured')
            }
        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().test('len', 'Name must be at least 3 characters', val => val?.length >= 3).required("First Name is required"),
        lastName: Yup.string().test('len', 'Country must be at least 3 characters', val => val?.length >= 3).required("Country is required"),
        userType: Yup.string().required("userType is required"),
        email: Yup.string().required("email is required"),
        password: Yup.string().required("Password is required")
      }),
    });
    return (
        <AdminLayout>
            <DashboardBody>
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
            <div className="tabs">
          <ul>
            <li
              onClick={() => {
                setActiveTab("manage");
              }}
              className={activeTab === "manage" ? "activeTab" : ""}
            >
              Add Users
            </li>
            <li
              onClick={(e) => setActiveTab("add")}
              className={activeTab === "add" ? "activeTab" : ""}
            >
              User list
            </li>
          </ul>
        </div>
        <form style={{marginTop:"30px"}}>
        <div style={{marginBottom:"20px"}}>
        <label style={{marginRight:"30px"}}>FirstName</label>
        <input 
        className="input"
        type="text"
        name="firstName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}/>
        </div>
        <div style={{marginBottom:"10px"}}>
        <label style={{marginRight:"30px"}}>LastName</label>
        <input 
        className="input"
        type="text"
        name="lastName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}/>
        </div>
         <div style={{marginBottom:"10px"}}>
        <label style={{marginRight:"59px"}}>Email</label>
        <input 
        className="input"
        type="text"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}/>
        </div>
          <div style={{marginBottom:"10px"}}>
        <label style={{marginRight:"33px"}}>Password</label>
        <input 
        className="input"
        type="text"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}/>
        </div>
        <div style={{marginBottom:"10px"}}>
        <label style={{marginRight:"30px"}}>User Type</label>
       <Select
       style={{width:"300px",height:"35px"}}
       onChange={(val)=>{
           formik.setFieldValue('userType',val)
       }}
       >
       <Option value="admin">Admin</Option>
       <Option value="super_admin">Super Admin</Option>
       </Select>
        </div>
        <button className="create-button" onClick={formik.handleSubmit}>Create User</button>
        </form>
            </DashboardBody>
        </AdminLayout>
    )
}

export default ManageAdmin
