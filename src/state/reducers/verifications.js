import * as types from "../actionTypes/verifications";

const initialState = {
  pendingVerifications: [],
  completedVerifications: [],
  processingVerifications: [],
  getMessage: [],
  deleteMessage: [],
  userVerifications: [],
  newTranscript: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.PENDING_VERIFICATION:
      return {
        ...state,
        pendingVerifications: action.payload,
      };
    case types.COMPLETED_VERIFICATION:
      return {
        ...state,
        completedVerifications: action.payload,
      };
    case types.PROCESSING_VERIFICATION:
      return {
        ...state,
        processingVerifications: action.payload,
      };
      case types.GET_MESSAGES: 
      return {
        ...state,
        getMessage: [...action.payload]
      }
      case types.DELETE_MESSAGES: 
      return {
        ...state,
        deleteMessage: [...action.payload]
      }
    default:
      return state;
  }

}
