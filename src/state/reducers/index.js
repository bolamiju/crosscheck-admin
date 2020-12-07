import { combineReducers } from "redux";
import verifications from "./verifications";
import transcripts from "./transcripts";

const rootReducer = combineReducers({
  transcripts,
  verifications,
});

export default rootReducer;
