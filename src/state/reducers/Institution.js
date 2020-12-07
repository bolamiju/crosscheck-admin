import * as types from "../actionTypes/verifications";

const initialState = {
  institutions: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
      };

    default:
      return state;
  }
}
