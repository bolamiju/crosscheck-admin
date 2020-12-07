import * as types from "../actionTypes/verifications";
import axios from "axios";


export const getVerifications = (payload) => {
    return {
      type: types.VERIFICATIONSBY_STATUS,
      payload,
    };
};
export const getTranscripts = (payload) => {
  return {
    type: types.TRANSCRIPTSBY_STATUS,
    payload,
  };
};

export const getVerificationsByStatus = (status) => async (dispatch) => {
    await axios
        .get(`https://croscheck.herokuapp.com/api/v1/verifications/status/${status}`)
        .then(({ data }) => {
            console.log("pending data", data);
            dispatch(getVerifications(data.verifications));
        })
        .catch((err) => {
            console.log("error", err);
          });
};

export const getTranscriptsByStatus = (status) => async (dispatch) => {
  await axios
      .get(`https://croscheck.herokuapp.com/api/v1/transcript/status/${status}`)
      .then(({ data }) => {
          console.log("pending data", data);
          dispatch(getTranscripts(data.transcripts));
      })
      .catch((err) => {
          console.log("error", err);
        });
};

export const updateVerificatonRequest = async (id, data) => {
  console.log('dataaa',id,data)
  axios.put(`https://croscheck.herokuapp.com/api/v1/verifications/${id}`, data, {
    headers: {
      "content-type":"application/json"
    }
      })
      .then(({ data }) => {
          console.log("pending data", data);
      })
      .catch((err) => {
          console.log("error", err);
        });
};

export const updateTranscriptRequest = async (id, data) => {
  console.log('dataaa',id,data)
  axios.put(`https://croscheck.herokuapp.com/api/v1/transcript/${id}`, data, {
    headers: {
      "content-type":"application/json"
    }
      })
      .then(({ data }) => {
          console.log("pending data", data);
      })
      .catch((err) => {
          console.log("error", err);
        });
};