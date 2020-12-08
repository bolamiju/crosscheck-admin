import * as types from "../actionTypes/verifications";

const initialState = {
  institutions: [],
  addInstitutions: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
      };
      case types.ADD_INSTITUTIONS:
        return {
          ...state,
          addInstitutions: action.payload,
        };

    default:
      return state;
  }
}
