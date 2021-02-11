import * as types from "../actionTypes/verifications";

const initialState = {
  institutions: [],
  addInstitutions: {},
  pageInfo: {},
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
      };
      case types.GET_PAGE_DETAILS:
        return {
          ...state,
          pageInfo: action.payload,
        };
        case types.LOADING:
          return {
            ...state,
            loading: action.payload,
          };
      case types.ADD_INSTITUTIONS:
        return {
          ...state,
          addInstitutions: action.payload,
        };
        case types.DELETE_INSTITUTE:
          return {
            ...state,
            institutions: state.institutions.filter(sch=>sch._id !== action.payload),
          };

    default:
      return state;
  }
}
