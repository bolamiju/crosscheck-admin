import * as types from "../actionTypes/verifications";

const initialState = {
  pendingVerifications: [],
  completedVerifications: [],
  processingVerifications: [],
  messages: [],
  userVerifications: [],
  newTranscript: [],
  selectedInstitution: {},
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
      case types.SELECT_SCHOOL:
      return {
        ...state,
        selectedInstitution: action.payload,
      };
      case types.GET_MESSAGES: 
      return {
        ...state,
        messages: [...action.payload]
      }
      case types.USER_VERIFICATIONS: 
      return {
        ...state,
        userVerifications: [...action.payload]
      }
      case types.GET_TRANSCRIPT: 
      return {
        ...state,
        newTranscript: [...action.payload]
      }
    default:
      return state;
  }

}
