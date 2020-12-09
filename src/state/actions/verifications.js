import * as types from "../actionTypes/verifications";
import axios from "axios";

export const pendingVerifications = (payload) => {
  return {
    type: types.PENDING_VERIFICATION,
    payload,
  };
};
export const processingVerifications = (payload) => {
  return {
    type: types.PROCESSING_VERIFICATION,
    payload,
  };
};

export const completedVerifications = (payload) => {
  return {
    type: types.COMPLETED_VERIFICATION,
    payload,
  };
};

export const pendingTranscripts = (payload) => {
  return {
    type: types.PENDING_TRANSCRIPT,
    payload,
  };
};
export const processingTranscripts = (payload) => {
  return {
    type: types.PROCESSING_TRANSCRIPT,
    payload,
  };
};

export const completedTranscripts = (payload) => {
  return {
    type: types.COMPLETED_TRANSCRIPT,
    payload,
  };
};

export const getVerificationsByStatus = (status) => async (dispatch) => {
  await axios
    .get(
      `https://croscheck.herokuapp.com/api/v1/verifications/status/${status}`
    )
    .then(({ data }) => {
      console.log("pending data", data);
      if (status === "pending") {
        dispatch(pendingVerifications(data.verifications));
      } else if (status === "processing") {
        dispatch(processingVerifications(data.verifications));
      } else if (status === "completed") {
        dispatch(completedVerifications(data.verifications));
      }
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
      if (status === "pending") {
        dispatch(pendingTranscripts(data.transcripts));
      } else if (status === "processing") {
        dispatch(processingTranscripts(data.transcripts));
      } else if (status === "completed") {
        dispatch(completedTranscripts(data.transcripts));
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const updateVerificatonRequest = async (id, data) => {
  console.log("dataaa", id, data);
  axios
    .put(`https://croscheck.herokuapp.com/api/v1/verifications/${id}`, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(({ data }) => {
      console.log("pending data", data);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const updateTranscriptRequest = async (id, data) => {
  axios
    .put(`https://croscheck.herokuapp.com/api/v1/transcript/${id}`, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(({ data }) => {
      console.log("pending data", data);
    })
    .catch((err) => {
      console.log("error", err);
    });
};
