import * as types from "../actionTypes/verifications";
import axios from "axios";
import { BASE_URL } from "../constant/constants";
import {GET_PAGE_DETAILS } from "../actionTypes/verifications";


export const getInstitutes = (payload) => {
  return {
    type: types.GET_INSTITUTIONS,
    payload,
  };
};
export const setPageInfo = (payload) => {
  return {
    type: types.GET_PAGE_DETAILS,
    payload,
  };
};
const addInstitutes =  (payload) =>{
  return{
    type: types.ADD_INSTITUTIONS,
    payload,
  }
}
export const getAllInstitutions = () => (dispatch) => {
  axios
    .get(`${BASE_URL}/api/v1/institutions`)
    .then(({ data }) => {
      console.log("data", data)
      dispatch(getInstitutes(data.institution));
    })
    .catch((err) => {
      return err;
    });
};

export const addAllInstitutions = (institution) =>
{
  console.log('instty',institution)
  axios
    .post(`${BASE_URL}/api/v1/institutions/add`, institution)
    .then(({ data }) => {
      console.log(data)
    })
    .catch((err) => {
      return err;
    });
}
