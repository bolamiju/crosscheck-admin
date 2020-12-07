import { combineReducers } from "redux";
import verifications from "./verifications";
import institutions from "./Institution";
import transcripts from "./transcripts";

const rootReducer = combineReducers({
  transcripts,
  verifications,
  institutions,
});

export default rootReducer;
