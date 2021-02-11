import React,{useState} from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { CountryDropdown } from "react-country-region-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const InstitutionForm =({
    initialValues,
  updateFormValues,
  deleteOneVerification,
  id,
})=>{
    
  const formik = useFormik({
    initialValues,

    onSubmit: async (values) => {
        updateFormValues(values)
    },
    // validationSchema: Yup.object().shape({
    //     name: Yup.string().test('len', 'Name must be at least 3 characters', val => val?.length >= 3).required("First Name is required"),
    //     coountry: Yup.string().test('len', 'Country must be at least 3 characters', val => val?.length >= 3).required("Country is required"),
    //     institute_charge: Yup.number().required("Institute charge is required"),
    //     our_charge: Yup.number().required("our charge is required"),
    //     transcript_fee: Yup.number().required("Transcript fee is required")
    //   }),
    });
    return(
        <tr>
        <td> <input name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{width:"320px",height:'33px'}}/></td>
        <td> <CountryDropdown
                style={{
                  height: "34px",
                  width:'200px',
                  border: "2px solid #e2e2e2",
                  outline: "none",
                  fontSize: "14px",
                  fontFamily: "MontserratItalic",
                }}
                name="country"
                id="country"
                valueType="full"
                value={formik.values.country}
                onChange={(_, e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                ReactFlagsSelect
              /></td>
        <td> <input name="institute_charge" value={formik.values.institute_charge} onChange={formik.handleChange} onBlur={formik.handleBlur}  style={{width:'80px',height:'33px'}}/></td>
        <td> <input name="our_charge" value={formik.values.our_charge} onChange={formik.handleChange} onBlur={formik.handleBlur}  style={{width:'80px',height:'33px'}}/></td>
        <td> <input name="transcript_fee" value={formik.values.transcript_fee} onChange={formik.handleChange}
        onBlur={formik.handleBlur} style={{width:'80px',height:'33px'}}/></td>
        <td><button style={{margin:"20px",
        width:'80px',
      outline:"none",
      color:"white",
      borderRadius:"10px",
      background:"#0092e0",
      border: "1px solid #0092e0"}} onClick={(e)=>{
          e.preventDefault()
          formik.handleSubmit()
      }}>save</button> &nbsp; &nbsp; <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteOneVerification(id)}/></td>
       </tr>
    )
}

export default InstitutionForm