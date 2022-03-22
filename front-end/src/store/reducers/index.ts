import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import voteReducer from "./vote-reducer"
const rootReducer = combineReducers({
  auth: authReducer,
  vote: voteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
