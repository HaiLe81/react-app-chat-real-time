import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import channelReducer from "./channel/channel-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer
});

export default rootReducer;