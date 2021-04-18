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
    .get(`${BASE_URL}/api/v1/verifications/status/${status}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    .get(`${BASE_URL}/api/v1/transcript/status/${status}`)
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

export const updateVerificatonRequest = (id, email, data) =>{
  console.log(data)
 const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return  axios({
    data: formData,
    method: "put",
    url: `http://localhost:5000/api/v1/verifications/${id}/${email}`,
    headers: { "Content-Type": "multipart/form-data" },
  });
//  return axios.put(`http://localhost:5000/api/v1/verifications/${id}/${email}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
}

export const updateTranscriptRequest = (id,email, data) =>
  axios.put(`${BASE_URL}/api/v1/transcript/${id}/${email}`, data, {
    headers: {
      "content-type": "application/json",
    },
  });

export const getMessages = () => async (dispatch) => {
  const res = axios
    .get(`${BASE_URL}/api/v1/message`)
    .then(({ data }) => {
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
