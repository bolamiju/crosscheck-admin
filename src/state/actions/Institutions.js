import * as types from "../actionTypes/verifications";
import axios from "axios";
import { BASE_URL } from "../constant/constants";

const getInstitutes = (payload) => {
  return {
    type: types.GET_INSTITUTIONS,
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
      dispatch(getInstitutes(data.institution));
    })
    .catch((err) => {
      return err;
    });
};

export const addAllInstitutions = () => (dispatch) => {
  axios
    .post(`${BASE_URL}/api/v1/institutions/add`)
    .then(({ data }) => {
      dispatch(addInstitutes(data.institution));
    })
    .catch((err) => {
      return err;
    });
};
