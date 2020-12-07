import * as types from "../actionTypes/verifications";

const initialState = {
  pendingTranscripts: [],
  completedTranscripts: [],
  processingTranscripts: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.PENDING_TRANSCRIPT:
      return {
        ...state,
        pendingTranscripts: action.payload,
      };
    case types.COMPLETED_TRANSCRIPT:
      return {
        ...state,
        completedTranscripts: action.payload,
      };
    case types.PROCESSING_TRANSCRIPT:
      return {
        ...state,
        processingTranscripts: action.payload,
      };

    default:
      return state;
  }
}
