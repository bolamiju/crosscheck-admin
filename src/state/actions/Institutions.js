import * as types from "../actionTypes/verifications";
import axios from "axios";
import { BASE_URL } from "../constant/constants";
import {GET_PAGE_DETAILS } from "../actionTypes/verifications";


export const fetchInstitutes = (payload) => {
  return {
    type: types.FETCH_INSTITUTIONS,
    payload,
  };
};

export const setPageInfo = (payload) => {
  return {
    type: types.GET_PAGE_DETAILS,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: types.LOADING,
    payload,
  };
};

export const deleteInstitution = (payload) => {
  return {
    type: types.DELETE_INSTITUTE,
    payload,
  };
};

export const noInstitute = (payload) => {
  return {
    type: types.NO_INSTITUTES,
    payload,
  };
};

export const removeInstitution =  (id)=>{
  return axios.delete(`${BASE_URL}/api/v1/institutions/${id}`, {
    headers: { "Content-Type": "application/json" },
  })
};

export const getAllInstitutions = () => (dispatch) => {
  axios
    .get(`${BASE_URL}/api/v1/institutions`)
    .then(({ data }) => {
      dispatch(fetchInstitutes(data.institution));
    })
    .catch((err) => {
      return err;
    });
};

export const addAllInstitutions = (institution) =>
{
  axios
    .post(`${BASE_URL}/api/v1/institutions/add`, institution)
    .then(({ data }) => {
      console.log(data)
    })
    .catch((err) => {
      return err;
    });
}
