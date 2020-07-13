import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import channelReducer from "./channel/channel-reducer";
import messageReducer from "./message/messag-reducers";
import userReducer from "./user/user-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
  message: messageReducer,
  user: userReducer
});

export default rootReducer;