import * as types from "../actionTypes/verifications";
import axios from "axios";


export const getPendingVerifications = (payload) => {
    return {
      type: types.PENDING_VERIFICATIONS,
      payload,
    };
  };


export const getPendingVerification = (status) => async (dispatch) => {
    await axios
        .get(`https://croscheck.herokuapp.com/api/v1/verifications/status/${status}`)
        .then(({ data }) => {
            console.log("pending data", data);
            dispatch(getPendingVerifications(data.verifications));
        })
        .catch((err) => {
            console.log("error", err);
          });
};