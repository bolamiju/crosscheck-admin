import * as types from "../actionTypes/verifications";

const initialState = {
  pending_verifications: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_VERIFICATIONS:
      return {
        ...state,
        pending_verifications: action.payload,
      };

    default:
      return state;
  }
}
