import { combineReducers } from "redux";
import verifications from "./verifications";
import institutions from "./Institution";

const rootReducer = combineReducers({
  verifications,
  institutions,
});

export default rootReducer;
