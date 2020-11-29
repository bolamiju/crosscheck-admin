import { combineReducers } from "redux";
import user from "./users";
import verifications from "./verifications";

const rootReducer = combineReducers({
  verifications,
});

export default rootReducer;
