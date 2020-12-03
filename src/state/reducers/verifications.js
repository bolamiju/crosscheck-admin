import * as types from "../actionTypes/verifications";

const initialState = {
  verificationsby_status: [],
  transcriptsby_status: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.VERIFICATIONSBY_STATUS:
      return {
        ...state,
        verificationsby_status: action.payload,
      };
      case types.TRANSCRIPTSBY_STATUS:
        return {
          ...state,
          transcriptsby_status: action.payload,
        };

    default:
      return state;
  }
}
