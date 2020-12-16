import * as types from "../actionTypes/verifications";
import { BASE_URL } from "../constant/constants";
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

export const messages = (payload) => {
  return {
    type: types.GET_MESSAGES,
    payload,
  };
};

export const getOneUserVerifications = (payload) => {
  return {
    type: types.USER_VERIFICATIONS,
    payload,
  };
};

export const getOneUserTranscript = (payload) => {
  return {
    type: types.GET_TRANSCRIPT,
    payload,
  };
};

export const delMessages = (payload) => {
  return {
    type: types.DELETE_MESSAGES,
    payload,
  };
};
export const updateRequest = (payload) => {
  return {
    type: types.UPDATE_REQUEST,
    payload,
  };
};
export const updateTranscript = (payload) => {
  return {
    type: types.UPDATE_TRANSCRIPT,
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

export const updateVerificatonRequest = (id, data) =>
  axios.put(`https://localhost:5000/api/v1/verifications/${id}`, data, {
    headers: {
      "content-type": "application/json",
    },
  });

export const updateTranscriptRequest = (id, data) => async (dispatch) => {
  console.log("dataaa", id, data);
  axios
    .put(`https://croscheck.herokuapp.com/api/v1/transcript/${id}`, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then(({ data }) => {
      console.log("pending data", data);
      dispatch(updateTranscript(data.message));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const getMessages = (value) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/message`, value)
    .then(({ data }) => {
      console.log("messages", data);
      dispatch(messages(data.message));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const deleteMessages = (id) => async (dispatch) => {
  await axios
    .delete(`${BASE_URL}/api/v1/message/${id}`)
    .then(({ data }) => {
      console.log("deleted", data);
      dispatch(delMessages(data.message));
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const getUserVerification = (email) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/verifications/byemail/${email}`)
    .then(({ data }) => {
      console.log("verifications data", data);
      dispatch(getOneUserVerifications(data.verifications));
    })
    .catch((err) => {
      console.log("error", err);
    });
};
export const getUserTranscript = (email) => async (dispatch) => {
  await axios
    .get(`${BASE_URL}/api/v1/transcript/byemail/${email}`)
    .then(({ data }) => {
      console.log("transcript data", data);
      dispatch(getOneUserTranscript(data.transcripts));
    })
    .catch((err) => {
      console.log("error", err);
    });
};
